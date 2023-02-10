import {Suspense} from 'react';
import dynamic from 'next/dynamic';

import {getCurLang} from '@libs/i18n/server';

import UIModal from '@ui/modal';
// import Web3Provider from '@web3/providers';

import './global.scss';

// 钱包
const Web3Provider = dynamic(() => import('@web3/providers'));

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const lng = getCurLang();

  return (
    <html lang={lng}>
      <head>
        <script src="/flexible.js" defer />
      </head>
      <body>
        <Suspense>
          <Web3Provider>
            {children}
            <UIModal />
          </Web3Provider>
        </Suspense>
      </body>
    </html>
  );
}
