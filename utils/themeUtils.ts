export function getLuminance(hex: string): number {
    const rgb = parseHexToRgb(hex);
    const [r, g, b] = rgb.map(c => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function parseHexToRgb(hex: string): [number, number, number] {
    if (hex.startsWith('#')) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

export function contrastRatio(hex1: string, hex2: string): number {
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
}

export function getBestContrastColor(targetColor: string, colorList: string[]): string {
    let bestContrastColor = colorList[0];
    let maxContrastRatio = contrastRatio(targetColor, colorList[0]);

    for (const color of colorList) {
        const currentContrastRatio = contrastRatio(targetColor, color);
        if (currentContrastRatio > maxContrastRatio) {
            maxContrastRatio = currentContrastRatio;
            bestContrastColor = color;
        }
    }

    return bestContrastColor;
}