import Head from 'next/head';
import React from 'react';

import type { Route } from 'nextjs-routes';
import type { Props as PageProps } from 'nextjs/getServerSideProps';

import useAdblockDetect from 'lib/hooks/useAdblockDetect';
import useGetCsrfToken from 'lib/hooks/useGetCsrfToken';
import * as mixpanel from 'lib/mixpanel';
import { init as initSentry } from 'lib/sentry/config';

interface Props<Pathname extends Route['pathname']> {
  pathname: Pathname;
  children: React.ReactNode;
  query?: PageProps<Pathname>['query'];
  apiData?: PageProps<Pathname>['apiData'];
}

initSentry();

const PageNextJs = <Pathname extends Route['pathname']>(props: Props<Pathname>) => {

  useGetCsrfToken();
  useAdblockDetect();

  const isMixpanelInited = mixpanel.useInit();
  mixpanel.useLogPageView(isMixpanelInited);

  return (
    <>
      <Head>
        <title>edeXa Business Blockchain</title>
        <meta property="og:title" content="edeXa Business Blockchain"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://explorer.testnet.edexa.com/"/>
        <meta
          property="og:image"
          content="https://edexa.network/images/thumnail_edeXa.png"
        />
        <meta
          property="og:description"
          content="edeXa Business Blockchain, private and public ecosystem built to enable scalable and business- oriented dApps for the world."
        />
      </Head>
      { props.children }
    </>
  );
};

export default React.memo(PageNextJs);
