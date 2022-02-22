let _ = require("lodash");
let arrayMonth = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const result =  _.chunk(arrayMonth, 3);
console.log('chunk of munth: ',result)

module.exports.month = result;