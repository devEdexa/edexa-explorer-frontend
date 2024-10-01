import { Box, Heading, Flex, LightMode } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import LatestZkEvmL2Batches from 'ui/home/latestBatches/LatestZkEvmL2Batches';
import LatestBlocks from 'ui/home/LatestBlocks';
import Stats from 'ui/home/Stats';
import Transactions from 'ui/home/Transactions';
// import AdBanner from 'ui/shared/ad/AdBanner';
import ConnectWalletButton from 'ui/shared/ConnectWalletButton';
import SearchBar from 'ui/snippets/searchBar/SearchBar';

const rollupFeature = config.features.rollup;

const Home = () => {
  return (
    <Box as="main">
      <Box
        w="100%"
        background={ config.UI.homepage.plate.background }
        borderRadius="24px"
        padding={{ base: '24px', lg: '48px' }}
        minW={{ base: 'unset', lg: '900px' }}
        data-label="hero plate"
      >
        <Flex
          mb={{ base: 6, lg: 8 }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading
            as="h1"
            size={{ base: 'md', lg: 'xl' }}
            lineHeight={{ base: '32px', lg: '50px' }}
            fontWeight={ 600 }
            color={ config.UI.homepage.plate.textColor }
          >
            Welcome to { config.chain.name } explorer
          </Heading>
          <Box display={{ base: 'none', lg: 'block' }}>
            { /* {config.features.account.isEnabled && <ProfileMenuDesktop />} */ }
            <ConnectWalletButton/>
          </Box>
        </Flex>
        <LightMode>
          <SearchBar isHomepage/>
        </LightMode>
      </Box>
      <Stats/>
      { /* <Heading
        as="h5"
        size="sm"
        mb={4}
        sx={{
          textAlign: "center",
          marginTop: "1rem",
          fontSize: "16px",
          color: "#dd6b20",
        }}
      >
        Note: We're indexing this chain right now. Some of the counts may be
        inaccurate.
      </Heading> */ }
      { /* <ChainIndicators /> */ }
      { /* <AdBanner
        mt={{ base: 6, lg: 8 }}
        mx="auto"
        display="flex"
        justifyContent="center"
      /> */ }

      { /* hiding for presale banner */ }
      <Flex
        mt={ 8 }
        direction={{ base: 'column', lg: 'row' }}
        columnGap={ 12 }
        rowGap={ 8 }
      >
        { rollupFeature.isEnabled && rollupFeature.type === 'zkEvm' ? (
          <LatestZkEvmL2Batches/>
        ) : (
          <LatestBlocks/>
        ) }
        <Box flexGrow={ 1 }>
          <Transactions/>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
