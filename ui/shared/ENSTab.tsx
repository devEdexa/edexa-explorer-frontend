/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-restricted-imports */
import { Box, HStack, Link, Text, Tooltip, useToast, VStack } from '@chakra-ui/react';
import React from 'react';

import { LIGHTNING_LABEL_CLASS_NAME } from 'ui/snippets/navigation/LightningLabel';

type Props = {
  isCollapsed?: boolean;
}

const ENSTab = ({ isCollapsed }: Props) => {
  const toast = useToast();

  const isExpanded = isCollapsed === false;

  const handleClick = () => {
    toast({
      position: 'top-right',
      title: 'Success',
      description: 'Coming Soon',
      status: 'success',
      variant: 'subtle',
      isClosable: true,
    });
  };

  return (
    <Box
      as="nav"
      borderTopWidth="1px"
      borderColor="divider"
      w="100%"
      mt={ 3 }
      pt={ 3 }
    >
      <VStack as="ul" spacing="1" alignItems="flex-start">
        <Link
          w={{ base: '100%', lg: isExpanded ? '100%' : '60px', xl: isCollapsed ? '60px' : '100%' }}
          display="flex"
          position="relative"
          whiteSpace="nowrap"
          onClick={ handleClick }
          _hover={{
            [`& *:not(.${ LIGHTNING_LABEL_CLASS_NAME }, .${ LIGHTNING_LABEL_CLASS_NAME } *)`]: {
              color: 'link_hovered',
            },
          }}
        >
          <Tooltip
            label="edeXa ENS"
            hasArrow={ false }
            placement="right"
            variant="nav"
            gutter={ 20 }
          >
            <HStack spacing={ 0 } overflow="hidden">
              <Text as="span" ml={ 3 }>
                <span>edeXa ENS</span>
              </Text>
            </HStack>
          </Tooltip>
        </Link>
      </VStack>
    </Box>
  );
};

export default React.memo(ENSTab);
