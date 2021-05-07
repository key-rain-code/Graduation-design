export function renderTime(date) {
  var dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
}

export function dealObjectValue(obj){
  var param = {};
  if ( obj === null || obj === undefined || obj === "" ) return param;
  for ( var key in obj ){
      if( obj[key] !== null && obj[key] !== undefined && obj[key] !== ""  ){
          param[key] = obj[key];
      }
  }
  return param;
};