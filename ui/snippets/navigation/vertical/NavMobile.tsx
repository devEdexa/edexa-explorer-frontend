import {
  Box,
  VStack,
  HStack,
  Text,
  Link,
  useToast
} from '@chakra-ui/react'
import React from 'react'
import useColors from '../useColors'
import getDefaultTransitionProps from 'theme/utils/getDefaultTransitionProps'
import { LIGHTNING_LABEL_CLASS_NAME } from '../LightningLabel'
import IconSvg from 'ui/shared/IconSvg'

const NavMobile = ({ name, isCollapsed }: any) => {
  const colors = useColors()
  const toast = useToast()

  const handleClick = () => {
    toast({
      position: 'bottom-left',
      title: 'Success',
      description: 'Coming Soon',
      status: 'success',
      variant: 'subtle',
      isClosable: true
    })
  }

  const textStyle = {
    variant: 'inherit',
    fontSize: 'sm',
    lineHeight: '20px',
    opacity: {
      base: '1',
      lg: '0',
      xl: isCollapsed ? '0' : '1'
    },
    transitionProperty: 'opacity',
    transitionDuration: 'normal',
    transitionTimingFunction: 'ease'
  }

  return (
    <Box as="nav" w="100%">
      <VStack as="ul" spacing="1" alignItems="flex-start">
        <Link
          sx={{
            py: '9px',
            display: 'flex',
            borderRadius: 'base',
            color: colors.text.default,
            ...getDefaultTransitionProps({
              transitionProperty: 'width, padding'
            })
          }}
          w={{
            base: '100%',
            lg: '60px',
            xl: isCollapsed ? '60px' : '100%'
          }}
          px={{
            base: 3,
            lg: '15px',
            xl: isCollapsed ? '15px' : 3
          }}
          display="flex"
          position="relative"
          whiteSpace="nowrap"
          onClick={handleClick}
          _hover={{
            [`& *:not(.${LIGHTNING_LABEL_CLASS_NAME}, .${LIGHTNING_LABEL_CLASS_NAME} *)`]:
              {
                color: 'link_hovered'
              }
          }}
        >
          <HStack spacing={0} overflow="hidden">
            <IconSvg name="token" boxSize="30px" flexShrink={0} />
            <Text {...textStyle} as="span" ml={3}>
              <span>{name}</span>
            </Text>
          </HStack>
        </Link>
      </VStack>
    </Box>
  )
}

export default NavMobile
