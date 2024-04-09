import {
  Icon,
  Box,
  Image,
  useColorModeValue,
  Skeleton,
  StyleProps,
} from "@chakra-ui/react";
import React from "react";

import { route } from "nextjs-routes";

import config from "configs/app";
import iconPlaceholder from "icons/edexaSocial/bigLogo.svg";

interface Props {
  isCollapsed?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  imageProps?: StyleProps;
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
  const field = isSmall ? "icon" : "logo";
  const logoColor = useColorModeValue("blue.600", "white");

  const display = isSmall
    ? {
        base: "none",
        lg: isCollapsed === false ? "none" : "block",
        xl: isCollapsed ? "block" : "none",
      }
    : {
        base: "block",
        lg: isCollapsed === false ? "block" : "none",
        xl: isCollapsed ? "none" : "block",
      };

  if (config.UI.sidebar[field].default) {
    return <Skeleton w="100%" borderRadius="sm" display={display} />;
  }

  return (
    <Icon
      as={
        isSmall
          ? "https://edexa-general.s3.ap-south-1.amazonaws.com/XLogo.png"
          : iconPlaceholder
      }
      width="auto"
      height="100%"
      color={logoColor}
      display={display}
      {...imageProps}
    />
  );
};

const NetworkLogo = ({ isCollapsed, onClick, imageProps }: Props) => {
  const logoSrc = useColorModeValue(
    config.UI.sidebar.logo.default,
    config.UI.sidebar.logo.dark || config.UI.sidebar.logo.default
  );
  const iconSrc = useColorModeValue(
    config.UI.sidebar.icon.default,
    config.UI.sidebar.icon.dark || config.UI.sidebar.icon.default
  );
  const darkModeFilter = { filter: "brightness(0) invert(1)" };
  const logoStyle = useColorModeValue(
    {},
    !config.UI.sidebar.logo.dark ? darkModeFilter : {}
  );
  const iconStyle = useColorModeValue(
    {},
    !config.UI.sidebar.icon.dark ? darkModeFilter : {}
  );

  return (
    <Box
      as="a"
      href={route({ pathname: "/" })}
      width={{
        base: "auto",
        lg: isCollapsed === false ? "120px" : "30px",
        xl: isCollapsed ? "30px" : "120px",
      }}
      height={{
        base: "24px",
        lg: isCollapsed === false ? "24px" : "30px",
        xl: isCollapsed ? "30px" : "35px",
      }}
      display="inline-flex"
      overflow="hidden"
      onClick={onClick}
      flexShrink={0}
      aria-label="Link to main page"
    >
      {/* big logo */}
      {/* Added big logo src from edexa */}
      <Image
        w="auto"
        h="100%"
        // src={ logoSrc }
        src="https://edexa-general.s3.ap-south-1.amazonaws.com/logo.svg"
        alt={`${config.chain.name} network logo`}
        fallback={
          <LogoFallback isCollapsed={isCollapsed} imageProps={imageProps} />
        }
        display={{
          base: "block",
          lg: isCollapsed === false ? "block" : "none",
          xl: isCollapsed ? "none" : "block",
        }}
        style={logoStyle}
        {...imageProps}
      />
      {/* small logo */}
      {/* Added small  src logo from edexa */}
      <Image
        w="auto"
        h="100%"
        // src={iconSrc}

        src="https://edexa-general.s3.ap-south-1.amazonaws.com/XLogo.png"
        alt={`${config.chain.name} network logo`}
        fallback={
          <LogoFallback
            isCollapsed={isCollapsed}
            imageProps={imageProps}
            isSmall
          />
        }
        display={{
          base: "none",
          lg: isCollapsed === false ? "none" : "block",
          xl: isCollapsed ? "block" : "none",
        }}
        style={iconStyle}
        {...imageProps}
      />
    </Box>
  );
};

export default React.memo(NetworkLogo);
