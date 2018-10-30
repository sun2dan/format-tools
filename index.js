'use strict';

/**
 * 获取变量的类型
 * @param {*} [args] - 需要获取类型的变量
 * @returns {string} 变量的类型字符串 string/object/number/date/null/undefined
 * */
function getType(args) {
  let type = Object.prototype.toString.call(args);
  let result = type.replace(/\[object\s+(\w+)\]/gmi, "$1");
  return result.toLowerCase();
}

/**
 * 格式化字符串
 * @param {string} [str] - 需要格式化的字符串
 * @example
 * // returns '2018-10-12'
 * format('{0}-{1}-{2}', 2018, 10, 12);
 * @example
 * // returns '2018-10-13'
 * format('{year}-{month}-{day}', {year:2018, month:10, day: 13});
 * @returns {string} 格式化好的日期和时间字符串
 * */
function format(str) {
  let pattern = /\{([\w_]+)\}/gm;
  let arr = Array.prototype.slice.call(arguments, 1);
  let args = /\{(\d+)\}/.test(str) ? arr : arr[0];
  return str.replace(pattern, function () {
    return args[arguments[1]];
  });
}

/**
 * 格式化日期
 * @param {(date|number|string)} [date=new Date()] - 需要格式化的日期
 * @param {string} [splitChar='-'] - 日期（年月日）之间的分隔符
 * @returns {string} 格式化好的日期字符串
 * */
function formatDate(date, splitChar) {
  let datetime = formatDateTime(date, splitChar);
  return datetime.split(' ')[0];
}

/**
 * 格式化时间
 * @param {(date|number|string)} [date=new Date()] - 需要格式化的日期
 * @returns {string} 格式化好的时间字符串
 * */
function formatTime(date) {
  let datetime = formatDateTime(date);
  return datetime.split(' ')[1];
}

/**
 * 格式化日期时间
 * @param {(date|number|string)} [date=new Date()] - 需要格式化的日期
 * @param {string} [splitChar='-'] - 日期（年月日）之间的分隔符
 * @returns {string} 格式化好的日期和时间字符串
 * */
function formatDateTime(date, splitChar) {
  date = date || new Date();
  splitChar = splitChar || '-';

  let type = getType(date);
  if (type === "number") date = new Date(date);
  else if (type === 'string') date = new Date(parseInt(date));
  else if (type !== 'date') date = new Date();

  let str = date.toString(); // Sun Apr 01 2018 21:57:48 GMT+0800 (CST)

  // 正则匹配出所有需要的数据
  let res = str.replace(/\w+\s+(\w+)\s+(\d{2})\s+(\d{4})\s+(\d{2}):(\d{2}):(\d{2})[\s\S]+/gmi, '$3--$2 $4:$5:$6');  // 2018--04-01 12:04:05
  // 月份是英文缩写，所以直接用 getMonth 方法获取到，根据数字的位数判断是否要添加0
  let m = (date.getMonth() + 1).toString().replace(/^(\d)$/gmi, '0$1').replace(/^(\d+)$/gmi, '-$1-');
  res = res.replace(/--/gmi, m);
  if (splitChar && splitChar !== '-') res = res.replace(/-/gmi, splitChar);

  return res;
}

/**
 * 格式化数字
 * @param {(number|string)} [num] - 需要格式化数字
 * @returns {string} 格式化好的数字
 * */
function formatByThousand(num) {
  num = parseFloat(num);
  if (isNaN(num)) throw new Error('请传入有效的数字');
  return num.toLocaleString('en-US');
}

/**
 * 格式化字符串，四位加一个空格
 * @param {(number|string)} [str] - 需要格式化字符串
 * @returns {string} 格式化好的字符串
 * */
function split4(str) {
  return str.toString().replace(/\s+/gmi, "").replace(/(.{4})/gmi, "$1 ").replace(/\s+$/gmi, "");
}

let mod = {getType, format, formatDate, formatTime, formatDateTime, split4, formatByThousand};

export default mod;
