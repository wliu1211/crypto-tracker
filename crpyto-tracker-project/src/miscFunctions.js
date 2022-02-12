export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const formatNumber = (num) => {
  if (num > 1) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return num;
  }
}