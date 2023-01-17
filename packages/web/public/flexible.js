var setFontSize = function () {
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
