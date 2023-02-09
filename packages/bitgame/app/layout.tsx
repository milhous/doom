import {getCurLang} from '@libs/i18n/server';

import UIModal from '@ui/modal';
import Web3Provider from '@web3/providers';

import './global.scss';

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
        <Web3Provider>
          {children}
          <UIModal />
        </Web3Provider>
      </body>
    </html>
  );
}
