export function getContrastColor(hexColor: string): string {
  // Convert hex to RGB
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#000000' : '#ffffff';
}

export function getColorName(hex: string): string {
  const colorNames: { [key: string]: string } = {
    '#ffffff': 'White',
    '#000000': 'Black',
    '#ff0000': 'Red',
    '#00ff00': 'Green',
    '#0000ff': 'Blue',
    '#ffff00': 'Yellow',
    '#ff00ff': 'Magenta',
    '#00ffff': 'Cyan',
    '#ff6600': 'Orange',
    '#ff0099': 'Pink',
    '#00ff99': 'Mint',
    '#9900ff': 'Purple',
    '#ff9900': 'Light Orange',
    '#99ff00': 'Lime',
    '#0099ff': 'Sky Blue',
    '#ff0066': 'Hot Pink',
  };

  return colorNames[hex.toLowerCase()] || hex;
}
