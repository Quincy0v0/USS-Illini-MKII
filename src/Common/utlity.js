/**
 * @fileoverview
 * Storing constants and utility functions
 * @exports application_id
 * @exports server
 * @exports division
 * @exports divisionWhole
 * @exports time
 * @exports romanize
 */

// application_id to access wargaming api server
export const application_id = '0cd78ed96029eac1bcb73c22e7dd0456';

// backend server base url (heroku)
export const server = 'https://uss-illini-backend.herokuapp.com/api';

// local server url
// export const server = 'http://localhost:4000/api';

/**
 * return a/b that dealt with floating point percision and 0 as dinominator
 * @param {*} a numerator
 * @param {*} b denominator
 */
export function division(a, b) {
  if (b === 0) {
    return 0;
  } else {
    return Math.round(a / b * 100) / 100;
  }
}

/**
 * return a/b that dealt with 0 as dinominator
 * @param {*} a numerator
 * @param {*} b denominator
 */
export function divisionWhole(a, b) {
  if (b === 0) {
    return 0;
  } else {
    return Math.round(a / b);
  }
}

/**
 * parse incoming date data
 * @param {*} input 
 */
export function time(input) {
  const date = new Date(parseInt(input.toString() + '000'));
  return (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate()))
}

/**
 * return the roman number representation of a decimal number
 * @param {*} num decimal number to be converted
 */
export function romanize(num) {
  let lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 },
    roman = '', i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}
