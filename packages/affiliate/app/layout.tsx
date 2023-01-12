import './global.scss';

import Script from 'next/script';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
  }) {
  
  return (
    <html lang="en">
      <body>
        {children}
        <Script id="flexible" strategy="beforeInteractive">
          {`
            var setFontSize = function() {
              var width = document.documentElement.clientWidth;
              width = width > 768 ? 768 : width;
              var fontSize = (width / 768) * 100;
              var html = document.querySelector('html');

              if (!!html) {
                html.style.fontSize = fontSize + 'px';
              }
            };

            setFontSize();

            window.addEventListener('resize', setFontSize);
          `}
        </Script>
      </body>
    </html>
  );
}