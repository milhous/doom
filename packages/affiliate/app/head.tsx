import Script from 'next/script';

export default function Head() {
  return (
    <>
      <title>My Page Title</title>
      <meta charSet="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no,email=no,address=no" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      <meta name="referrer" content="origin" />
      <Script>
        {`
          var setFontSize = function() {
            var width = document.documentElement.clientWidth;
            width = width > 768 ? 768 : width;
            var fontSize = (width / 768) * 100;
            document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px';
          };
          setFontSize();
          window.addEventListener('resize', setFontSize);
        `}
      </Script>
    </>
  )
}