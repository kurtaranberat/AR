export const getRandomShape = (shapes) => {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    return randomShape;
  };
  