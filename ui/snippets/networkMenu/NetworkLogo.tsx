import type {
  StyleProps } from '@chakra-ui/react';
import {
  Box,
  Image,
  useColorModeValue,
  Skeleton,
  chakra,
} from '@chakra-ui/react';
import React from 'react';
import iconPlaceholder from "icons/edexaSocial/bigLogo.svg";
import { route } from 'nextjs-routes';

import config from 'configs/app';

interface Props {
  isCollapsed?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  className?: string;
}

const LogoFallback = ({
  isCollapsed,
  isSmall,
  imageProps,
}: {
  isCollapsed?: boolean;
  isSmall?: boolean;
  imageProps?: StyleProps;
}) => {
  const field = isSmall ? 'icon' : 'logo';
  const logoColor = useColorModeValue('blue.600', 'white');

  const display = isSmall ? {
    base: 'none',
    lg: isCollapsed === false ? 'none' : 'block',
    xl: isCollapsed ? 'block' : 'none',
  } :
    {
      base: 'block',
      lg: isCollapsed === false ? 'block' : 'none',
      xl: isCollapsed ? 'none' : 'block',
    };

  if (config.UI.sidebar[field].default) {
    return <Skeleton w="100%" borderRadius="sm" display={ display }/>;
  }

  return (
    <Icon
      as={
        isSmall ?
          'https://edexa-general.s3.ap-south-1.amazonaws.com/XLogo.png' :
          iconPlaceholder
      }
      width="auto"
      height="100%"
      color={ logoColor }
      display={ display }
      { ...imageProps }
    />
  );
};

const NetworkLogo = ({ isCollapsed, onClick, className }: Props) => {
  const logoSrc = useColorModeValue(
    config.UI.navigation.logo.default,
    config.UI.navigation.logo.dark || config.UI.navigation.logo.default,
  );
  const iconSrc = useColorModeValue(
    config.UI.navigation.icon.default,
    config.UI.navigation.icon.dark || config.UI.navigation.icon.default,
  );
  const darkModeFilter = { filter: 'brightness(0) invert(1)' };
  const logoStyle = useColorModeValue(
    {},
    !config.UI.navigation.logo.dark ? darkModeFilter : {},
  );
  const iconStyle = useColorModeValue(
    {},
    !config.UI.navigation.icon.dark ? darkModeFilter : {},
  );

  return (
    <Box
      className={ className }
      as="a"
      href={ route({ pathname: '/' }) }
      width={{
        base: '120px',
        lg: isCollapsed === false ? '120px' : '30px',
        xl: isCollapsed ? '30px' : '120px',
      }}
      height={{
        base: '24px',
        lg: isCollapsed === false ? '24px' : '30px',
        xl: isCollapsed ? '30px' : '24px',
      }}
      display="inline-flex"
      overflow="hidden"
      onClick={ onClick }
      flexShrink={ 0 }
      aria-label="Link to main page"
    >
      { /* big logo */ }
      <Image
        w="auto"
        h="100%"
        // src={ logoSrc }
        src="https://edexa-general.s3.ap-south-1.amazonaws.com/logo.svg"
        alt={ `${ config.chain.name } network logo` }
        fallback={
          <LogoFallback isCollapsed={ isCollapsed } imageProps={ imageProps }/>
        }
        display={{
          base: 'block',
          lg: isCollapsed === false ? 'block' : 'none',
          xl: isCollapsed ? 'none' : 'block',
        }}
        style={ logoStyle }
        { ...imageProps }
      />
      { /* small logo */ }
      <Image
        w="auto"
        h="100%"
        // src={iconSrc}

        src="https://edexa-general.s3.ap-south-1.amazonaws.com/XLogo.png"
        alt={ `${ config.chain.name } network logo` }
        fallback={ (
          <LogoFallback
            isCollapsed={ isCollapsed }
            imageProps={ imageProps }
            isSmall
          />
        ) }
        display={{
          base: 'none',
          lg: isCollapsed === false ? 'none' : 'block',
          xl: isCollapsed ? 'block' : 'none',
        }}
        style={ iconStyle }
        { ...imageProps }
      />
    </Box>
  );
};

export default React.memo(chakra(NetworkLogo));
