function shadeColor(color: string, percent: number): string {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = parseInt(String((R * (100 + percent)) / 100));
  G = parseInt(String((G * (100 + percent)) / 100));
  B = parseInt(String((B * (100 + percent)) / 100));

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  const RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  const GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  const BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}

function lightenDarkenColor(hex: string, percent: number) {
  hex = hex.slice(1);

  const num = parseInt(hex, 16);

  let r = (num >> 16) + percent;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + percent;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + percent;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return "#" + (g | (b << 8) | (r << 16)).toString(16);
}

function getCorrectTextColor(hex: string) {
  /*
    From this W3C document: http://www.webmasterworld.com/r.cgi?f=88&d=9769&url=http://www.w3.org/TR/AERT#color-contrast
    
    Color brightness is determined by the following formula:
    ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000
    */

  const threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */

  const hRed = hexToR(hex);
  const hGreen = hexToG(hex);
  const hBlue = hexToB(hex);

  function hexToR(h: string) {
    return parseInt(cutHex(h).substring(0, 2), 16);
  }

  function hexToG(h: string) {
    return parseInt(cutHex(h).substring(2, 4), 16);
  }

  function hexToB(h: string) {
    return parseInt(cutHex(h).substring(4, 6), 16);
  }

  function cutHex(h: string) {
    return h.charAt(0) == "#" ? h.substring(1, 7) : h;
  }

  const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
  if (cBrightness > threshold) {
    return "#000000";
  } else {
    return "#ffffff";
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export { shadeColor, lightenDarkenColor, getCorrectTextColor, getRandomColor };
