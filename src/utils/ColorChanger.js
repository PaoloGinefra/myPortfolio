export function setHue(newHue) {
  document.documentElement.style.setProperty("--primary-hue", newHue);
}

const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

const sat = 84;
const light = 40;

export function getHueVariants(names, data) {
  let variants = {};

  names.forEach((name, index) => {
    const [r, g, b] = HSLToRGB(data[index].hue, sat, light);
    const [rd, gd, bd] = HSLToRGB((data[index].hue - 10) % 360, sat, light);

    variants[name] = {
      "--primary": `rgb(${r}, ${g}, ${b})`,
      "--primary-darkened": `rgb(${rd}, ${gd}, ${bd})`,
      transition: { duration: 0.8 },
    };
  });
  return variants;
}
