export const getImagePath = (path?: string) => {
  return path ? `/images/products${path}` : '/images/products/plug-img.png';
};
