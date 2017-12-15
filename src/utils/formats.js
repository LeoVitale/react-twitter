export const dateDiff = function(datepart, fromdate, todate) {
  datepart = datepart.toLowerCase();
  let diff = todate - fromdate;
  let divideBy = { w:604800000,
                   d:86400000,
                   h:3600000,
                   m:60000,
                   s:1000 };

  let result = Math.floor( diff/divideBy[datepart]);
  let text = '';


  if(datepart === 's' && result >= 60) {
    return result = dateDiff('m', fromdate, todate);
  } else if(datepart === 'm' && result >= 60) {
    return result = dateDiff('h', fromdate, todate);
  } else if(datepart === 'h' && result >= 24) {
    return result = dateDiff('d', fromdate, todate);
  } else if(datepart === 'd' && result  >= 30) {
    return result = 'Long time ago';
  }

  return `${result}${datepart}`;
}
