/* eslint-disable no-console */
/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GridProps } from '@chakra-ui/react';
import {
  Box,
  Grid,
  Flex,
  Text,
  VStack,
  Skeleton,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import type { CustomLinksGroup } from 'types/footerLinks';

import config from 'configs/app';
import discordIcon from 'icons/edexaSocial/discord.svg';
import instagramIcon from 'icons/edexaSocial/instagram.svg';
import linkedInIcon from 'icons/edexaSocial/linkedln.svg';
import mediumIcon from 'icons/edexaSocial/medium.svg';
import spotifyIcon from 'icons/edexaSocial/spotify.svg';
import telegramIcon from 'icons/edexaSocial/telegram.svg';
import twitterIcon from 'icons/edexaSocial/twitter.svg';
import youtubeIcon from 'icons/edexaSocial/youtube.svg';
import type { ResourceError } from 'lib/api/resources';
import useFetch from 'lib/hooks/useFetch';
import NetworkAddToWallet from 'ui/shared/NetworkAddToWallet';

import FooterLinkItem from './FooterLinkItem';

const MAX_LINKS_COLUMNS = 4;

// const FRONT_VERSION_URL = `https://github.com/blockscout/frontend/tree/${config.UI.footer.frontendVersion}`;
// const FRONT_COMMIT_URL = `https://github.com/blockscout/frontend/commit/${config.UI.footer.frontendCommit}`;

const Footer = () => {
  // const { data: backendVersionData } = useApiQuery("config_backend_version", {
  //   queryOptions: {
  //     staleTime: Infinity,
  //   },
  // });
  // const apiVersionUrl = getApiVersionUrl(backendVersionData?.backend_version);
  // const issueUrl = useIssueUrl(backendVersionData?.backend_version);
  const darkModeFilter = { filter: 'brightness(0) invert(1)' };
  const logoStyle = useColorModeValue(
    {},
    !config.UI.navigation.logo.dark ? darkModeFilter : {},
  );

  const BLOCKSCOUT_LINKS: any = [
    {
      icon: linkedInIcon,
      iconSize: '20px',
      text: 'LinkedIn',
      url: 'https://www.linkedin.com/company/edexablockchain/',
    },
    {
      icon: discordIcon,
      iconSize: '20px',
      text: 'Discrord',
      url: 'https://discord.com/invite/TKBQS9tZJY',
    },
    {
      icon: mediumIcon,
      iconSize: '20px',
      text: 'Medium',
      url: 'https://medium.com/@edeXablockchain',
    },
    {
      icon: twitterIcon,
      iconSize: '20px',
      text: 'X',
      url: 'https://twitter.com/edexablockchain',
    },
    {
      icon: instagramIcon,
      iconSize: '20px',
      text: 'Instagram',
      url: 'https://www.instagram.com/edexa_blockchain/',
    },
    {
      icon: spotifyIcon,
      iconSize: '20px',
      text: 'Spotify',
      url: 'https://open.spotify.com/show/0zaRr0AAvszhWyDGx4ZVUO?si=7daf4877a7914b7e&nd=1&dlsi=e73ea03729614927',
    },
    {
      icon: telegramIcon,
      iconSize: '20px',
      text: 'Telegram',
      url: 'https://t.me/edeXa_official',
    },
    {
      icon: youtubeIcon,
      iconSize: '20px',
      text: 'Youtube',
      url: 'https://www.youtube.com/@edexa1326',
    },
  ];
  const fetch = useFetch();

  const { isPlaceholderData, data: linksData } = useQuery<
  unknown,
  ResourceError<unknown>,
  Array<CustomLinksGroup>
  >({
    queryKey: [ 'footer-links' ],
    queryFn: async() =>
      fetch(config.UI.footer.links || '', undefined, {
        resource: 'footer-links',
      }),
    enabled: Boolean(config.UI.footer.links),
    staleTime: Infinity,
    placeholderData: [],
  });

  const colNum = isPlaceholderData ?
    1 :
    Math.min(linksData?.length || Infinity, MAX_LINKS_COLUMNS) + 1;

  const renderNetworkInfo = React.useCallback(
    (gridArea?: GridProps['gridArea']) => {
      return (
        <Flex
          gridArea={ gridArea }
          flexWrap="wrap"
          columnGap={ 8 }
          rowGap={ 6 }
          mb={{ base: 5, lg: 10 }}
          _empty={{ display: 'none' }}
        >
          { /* {!config.UI.indexingAlert.intTxs.isHidden && <IntTxsIndexingStatus />} */ }
          <NetworkAddToWallet/>
        </Flex>
      );
    },
    [],
  );

  const renderProjectInfo = React.useCallback(
    (gridArea?: GridProps['gridArea']) => {
      return (
        <Box gridArea={ gridArea }>
          { /* <Link fontSize="xs" href="https://www.blockscout.com">
            blockscout.com
          </Link> */ }
          <Image
            w="25%"
            src="https://edexa-general.s3.ap-south-1.amazonaws.com/logo.svg"
            style={ logoStyle }
            alt={ `${ config.chain.name } network logo` }
          />
          <Text mt={ 3 } fontSize="xs">
            edeXa Business Blockchain, private and public ecosystem built to
            enable scalable and business- oriented dApps for the world.
          </Text>
        </Box>
      );
    },
    [ logoStyle ],
  );

  const containerProps: GridProps = {
    as: 'footer',
    px: { base: 4, lg: 12 },
    py: { base: 4, lg: 9 },
    borderTop: '1px solid',
    borderColor: 'divider',
    gridTemplateColumns: { base: '1fr', lg: 'minmax(auto, 470px) 1fr' },
    columnGap: { lg: '32px', xl: '100px' },
  };

  if (config.UI.footer.links) {
    return (
      <Grid { ...containerProps }>
        <>
          { renderNetworkInfo() }
          { renderProjectInfo() }
        </>

        <Grid
          gap={{
            base: 6,
            lg: colNum === MAX_LINKS_COLUMNS + 1 ? 2 : 8,
            xl: 12,
          }}
          gridTemplateColumns={{
            base: 'repeat(auto-fill, 160px)',
            lg: `repeat(${ colNum }, 135px)`,
            xl: `repeat(${ colNum }, 160px)`,
          }}
          justifyContent={{ lg: 'flex-end' }}
          mt={{ base: 8, lg: 0 }}
        >
          { [ { title: 'edeXa', links: BLOCKSCOUT_LINKS }, ...(linksData || []) ]
            .slice(0, colNum)
            .map((linkGroup) => (
              <Box key={ linkGroup.title }>
                <Skeleton
                  fontWeight={ 500 }
                  mb={ 3 }
                  display="inline-block"
                  isLoaded={ !isPlaceholderData }
                >
                  { linkGroup.title }
                </Skeleton>
                <VStack spacing={ 1 } alignItems="start">
                  { linkGroup.links.map((link: any) => (
                    <FooterLinkItem
                      { ...link }
                      key={ link.text }
                      isLoading={ isPlaceholderData }
                    />
                  )) }
                </VStack>
              </Box>
            )) }
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      { ...containerProps }
      gridTemplateAreas={{
        lg: `
          "network links-top"
          "info links-bottom"
        `,
      }}
    >
      { renderNetworkInfo({ lg: 'network' }) }
      { renderProjectInfo({ lg: 'info' }) }

      <Grid
        gridArea={{ lg: 'links-bottom' }}
        gap={ 1 }
        gridTemplateColumns={{
          base: 'repeat(auto-fill, 160px)',
          lg: 'repeat(3, 160px)',
          xl: 'repeat(4, 160px)',
        }}
        gridTemplateRows={{
          base: 'auto',
          lg: 'repeat(3, auto)',
          xl: 'repeat(2, auto)',
        }}
        gridAutoFlow={{ base: 'row', lg: 'column' }}
        alignContent="start"
        justifyContent={{ lg: 'flex-end' }}
        mt={{ base: 8, lg: 0 }}
      >
        { BLOCKSCOUT_LINKS.map((link: any) => (
          <FooterLinkItem { ...link } key={ link.text } icon={ link.icon }/>
        )) }
      </Grid>
    </Grid>
  );
};

export default React.memo(Footer);
