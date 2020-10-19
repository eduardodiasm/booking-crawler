module.exports = (string) => {
  const dottedString = string.replace(',', '.')
  const decimal = parseFloat(dottedString)
  return decimal
}