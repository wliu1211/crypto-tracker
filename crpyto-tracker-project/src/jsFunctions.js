export const sortObjRank = (a, b) => {
    if ( a.rank < b.rank ) return -1;
      if ( a.rank > b.rank ) return 1;
      return 0;
}
export const sortObjName = (a, b) => {
    if ( a.name < b.name ) return -1;
      if ( a.name > b.name ) return 1;
      return 0;
}
export const sortObjPrice = (a, b) => {
    if ( a.price < b.price ) return -1;
      if ( a.price > b.price ) return 1;
      return 0;
}
export const sortObjHour = (a, b) => {
    if ( a.hour < b.hour ) return -1;
      if ( a.hour > b.hour ) return 1;
      return 0;
}
export const sortObjDay = (a, b) => {
    if ( a.day < b.day ) return -1;
      if ( a.day > b.day ) return 1;
      return 0;
}
export const sortObjWeek = (a, b) => {
    if ( a.week < b.week ) return -1;
      if ( a.week > b.week ) return 1;
      return 0;
}
export const sortObjVolume = (a, b) => {
    if ( a.dailyVolume < b.dailyVolume ) return -1;
      if ( a.dailyVolume > b.dailyVolume ) return 1;
      return 0;
}
export const sortObjMarketCap = (a, b) => {
    if ( a.marketCap < b.marketCap ) return -1;
      if ( a.marketCap > b.marketCap ) return 1;
      return 0;
}