'use strict';
;(function (env, name, definition) {  // 检测上下文环境是否为AMD或CMD
  var hasDefine = typeof define === 'function';  // 检查上下文环境是否为Node
  var hasExports = typeof module !== 'undefined' && module.exports;

  if (hasDefine) define(name, definition);// AMD环境或CMD环境
  else if (hasExports) module.exports = definition();   // 定义为普通Node模块
  else env[name] = definition();   // 将模块的执行结果挂在window变量中，在浏览器中this指向window对象
})(this, 'formatTools', function () {
  /**
   * 获取变量的类型
   * @param {*} [args] - 需要获取类型的变量
   * @returns {string} 变量的类型字符串 string/object/number/date/null/undefined
   * */
  function getType(args) {
    var type = Object.prototype.toString.call(args);
    var result = type.replace(/\[object\s+(\w+)\]/gmi, "$1");
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
    var pattern = /\{([\w_]+)\}/gm;
    var arr = Array.prototype.slice.call(arguments, 1);
    var args = /\{(\d+)\}/.test(str) ? arr : arr[0];
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
    var datetime = formatDateTime(date, splitChar);
    return datetime.split(' ')[0];
  }

  /**
   * 格式化时间
   * @param {(date|number|string)} [date=new Date()] - 需要格式化的日期
   * @returns {string} 格式化好的时间字符串
   * */
  function formatTime(date) {
    var datetime = formatDateTime(date);
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

    var type = getType(date);
    if (type === "number") date = new Date(date);
    else if (type === 'string') date = new Date(parseInt(date));
    else if (type !== 'date') date = new Date();

    //var str = date.toString(); // Sun Apr 01 2018 21:57:48 GMT+0800 (CST)
    var year = date.getFullYear();
    var month = addZero(date.getMonth() + 1);
    var day = addZero(date.getDate());
    var hour = addZero(date.getHours());
    var minute = addZero(date.getMinutes());
    var second = addZero(date.getSeconds());
    var tpl = '{0}-{1}-{2} {3}:{4}:{5}';
    var res = format(tpl, year, month, day, hour, minute, second);
    if (splitChar && splitChar !== '-') res = res.replace(/-/gmi, splitChar);
    return res;

    function addZero(n) {
      return n < 10 ? '0' + n : n;
    }
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

  var formatTools = {getType:getType, format:format, formatDate:formatDate, formatTime:formatTime, formatDateTime:formatDateTime, split4:split4, formatByThousand:formatByThousand};
  return formatTools;
});
