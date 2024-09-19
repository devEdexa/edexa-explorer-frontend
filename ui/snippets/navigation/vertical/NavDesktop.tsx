/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-imports */
import {
  Box,
  VStack,
  HStack,
  Text,
  Link,
  useToast,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';

import useIsMobile from 'lib/hooks/useIsMobile';
import getDefaultTransitionProps from 'theme/utils/getDefaultTransitionProps';
import IconSvg from 'ui/shared/IconSvg';

import { LIGHTNING_LABEL_CLASS_NAME } from '../LightningLabel';
import useColors from '../useColors';

const NavDesktop = ({ name, isCollapsed, isExpanded, url }: any) => {
  const isMobile = useIsMobile();
  const colors = useColors();
  const isXLScreen = useBreakpointValue({ base: false, xl: true });
  const toast = useToast();

  const handleClick = () => {
    toast({
      position: 'bottom-left',
      title: 'Success',
      description: 'Coming Soon',
      status: 'success',
      variant: 'subtle',
      isClosable: true,
    });
  };

  const textStyle = {
    variant: 'inherit',
    fontSize: 'sm',
    lineHeight: '20px',
    opacity: {
      base: '1',
      lg: isExpanded ? '1' : '0',
      xl: isCollapsed ? '0' : '1',
    },
    transitionProperty: 'opacity',
    transitionDuration: 'normal',
    transitionTimingFunction: 'ease',
  };

  return (
    <Box as="nav" w="100%">
      <VStack as="ul" spacing="1" alignItems="flex-start">
        <Link
          href={ url }
          isExternal={ Boolean(url) }
          sx={{
            py: '9px',
            display: 'flex',
            borderRadius: 'base',
            color: colors.text.default,
            ...getDefaultTransitionProps({
              transitionProperty: 'width, padding',
            }),
          }}
          w={{
            base: '100%',
            lg: isExpanded ? '100%' : '60px',
            xl: isCollapsed ? '60px' : '100%',
          }}
          px={{
            base: 3,
            lg: isExpanded ? 3 : '15px',
            xl: isCollapsed ? '15px' : 3,
          }}
          display="flex"
          position="relative"
          whiteSpace="nowrap"
          onClick={ url ? undefined : handleClick }
          _hover={{
            [`& *:not(.${ LIGHTNING_LABEL_CLASS_NAME }, .${ LIGHTNING_LABEL_CLASS_NAME } *)`]:
              {
                color: 'link_hovered',
              },
          }}
        >
          <Tooltip
            label={ name }
            hasArrow={ false }
            isDisabled={
              isMobile ||
              isCollapsed === false ||
              (isCollapsed === undefined && isXLScreen)
            }
            placement="right"
            variant="nav"
            gutter={ 20 }
            color={ colors.text.active }
          >
            <HStack spacing={ 0 } overflow="hidden">
              <IconSvg name="token" boxSize="30px" flexShrink={ 0 }/>
              <Text { ...textStyle } as="span" ml={ 3 }>
                <span>{ name }</span>
              </Text>
            </HStack>
          </Tooltip>
        </Link>
      </VStack>
    </Box>
  );
};

export default NavDesktop;
