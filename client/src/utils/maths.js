export const scalePosition = (value, scale) => {
    const rescale = Math.sign(value) * Math.log10(1 + Math.abs(value)) * scale;
    console.log(rescale)
    return rescale
}
