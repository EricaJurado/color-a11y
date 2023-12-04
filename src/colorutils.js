/**
 * Checks if the contrast between two colors is compliant with WCAG standards.
 * @param {string} bgColor - The background color
 * @param {string} txtColor - The text color
 * @returns {boolean} - Returns true if the contrast ratio is greater than or equal to 4.5 meaning it's WCAG compliant. Otherwise, returns false.
 */
const isContrastCompliant = (bgColor, txtColor) => {
  const contrastRatio = getContrastRatio(bgColor, txtColor);

  if (contrastRatio >= 4.5) {
    return true; // is WCAG compliant
  }

  return false;
};

/**
 * Calculates the contrast ratio between two colors.
 * https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
 *
 * @param {string} color1 - The first hex color
 * @param {string} color2 - The second hex color
 * @returns {number} The contrast ratio between the two colors
 */
const getContrastRatio = (color1, color2) => {
  const luminance1 = getRelativeLuminance(color1);
  const luminance2 = getRelativeLuminance(color2);

  const [l1, l2] =
    luminance1 > luminance2
      ? [luminance1, luminance2]
      : [luminance2, luminance1];

  return (l1 + 0.05) / (l2 + 0.05);
};

/**
 * Converts a hex color to RGB.
 *
 * @param {string} hex - The hexadecimal color to convert
 * @returns {number[]} An array containing RGB values [r, g, b]
 */
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
};

/**
 * Calculates the relative luminance of a given color.
 *
 * @param {string} color - The color in hex format.
 * @returns {number} The relative luminance value.
 */
const getRelativeLuminance = (color) => {
  const [r, g, b] = hexToRgb(color);

  const RsRGB = r / 255.0;
  const GsRGB = g / 255.0;
  const BsRGB = b / 255.0;

  // gamma correction
  const R =
    RsRGB <= 0.03928 ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
  const G =
    GsRGB <= 0.03928 ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
  const B =
    BsRGB <= 0.03928 ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4);

  // calc relative luminance
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

export {
  isContrastCompliant,
  getContrastRatio,
  hexToRgb,
  getRelativeLuminance,
};
