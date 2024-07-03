/* eslint-disable no-console */
import { Center, Link, Skeleton } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

import type { IconName } from 'ui/shared/IconSvg';

type Props = {
  icon?: IconName;
  iconSize?: string;
  text: string;
  url: string;
  isLoading?: boolean;
}

const FooterLinkItem = ({ icon, text, url, isLoading }: Props) => {
  if (isLoading) {
    return <Skeleton my="3px">{ text }</Skeleton>;
  }
  console.log('icon in FooterLinkItem', icon);

  return (
    <Link href={ url } display="flex" alignItems="center" h="30px" variant="secondary" target="_blank" fontSize="xs">
      { icon && (
        <Center minW={ 6 } mr={ 2 }>
          <Image src={ icon } alt={ icon }/>
        </Center>
      ) }
      { text }
    </Link>
  );
};

export default FooterLinkItem;
