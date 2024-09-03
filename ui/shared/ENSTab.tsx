/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-restricted-imports */
import { useToast } from '@chakra-ui/react';
import React from 'react';

const ENSTab = () => {
  const toast = useToast();

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
    <button onClick={ () => handleClick() }>
      edeXa ENS
    </button>
  );
};

export default React.memo(ENSTab);
