export const dateDiff = function(datepart, fromdate, todate) {
  datepart = datepart.toLowerCase();
  let diff = todate - fromdate;
  let divideBy = { w:604800000,
                   d:86400000,
                   h:3600000,
                   m:60000,
                   s:1000 };

  return Math.floor( diff/divideBy[datepart]);
}
