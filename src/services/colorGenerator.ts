const generatePastelColor = () => {
  let randomHueValue = Math.floor(Math.random() * 360);
  return ` hsla(${randomHueValue}, 70%, 70%, 0.6)`;
};

export default generatePastelColor;
