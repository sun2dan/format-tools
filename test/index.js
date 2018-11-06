'use strict';

//import formatTools from '../index'
var formatTools = require('../index');
var expect = require('chai').expect;

describe('formatTools.format', function () {
  it('1 参数为对象模式', function () {
    var str = formatTools.format('{year}-{month}-{day}', {year: 2018, month: '08', day: 10}); // => '2018-08-10'
    toEqual(str, '2018-08-10');
  });
  it('2 参数为单个模式', function () {
    var str = formatTools.format('{0}-{1}-{2}', 2018, '08', 10); // => '2018-08-10'
    toEqual(str, '2018-08-10');
  });
});

describe('formatTools.formatDate', function () {
  it('1 日期对象', function () {
    var str = formatTools.formatDate(new Date(2018, 9, 10, 12, 34, 56)); // => '2018-10-10'
    toEqual(str, '2018-10-10');
  });
  it('2 时间戳', function () {
    var str = formatTools.formatDate(1539146096000, '/'); // => '2018/10/10'
    toEqual(/\d{4}\/\d{2}\/\d{2}/gmi.test(str), true);
  });
  it('3 个位数年月、时分秒', function () {
    var str = formatTools.formatDate(new Date(2018, 8, 4, 1, 2, 3)); // => '2018/9/4'
    toEqual(str, '2018-09-04');
  });
});

describe('formatTools.formatTime', function () {
  it('1 日期对象', function () {
    var str = formatTools.formatTime(new Date(2018, 9, 10, 12, 34, 56)); // => '2018-10-10'
    toEqual(str, '12:34:56');
  });
  it('2 时间戳', function () {
    var str = formatTools.formatTime(1539146096000); // => '12:34:56'
    toEqual(/\d{2}\:\d{2}\:\d{2}/gmi.test(str), true);
  });
  it('3 个位数年月、时分秒', function () {
    var str = formatTools.formatTime(new Date(2018, 8, 4, 1, 2, 3)); // => '01:02:03'
    toEqual(str, '01:02:03');
  });
});

describe('formatTools.formatDateTime', function () {
  it('1 日期对象', function () {
    var str = formatTools.formatDateTime(new Date(2018, 8, 4, 1, 2, 3));
    toEqual(str, '2018-09-04 01:02:03');
  });
  it('2 时间戳', function () {
    var str = formatTools.formatDateTime(1539146096000, '/');        //'2018/10/10 12:34:56'
    toEqual(/\d{4}\/\d{2}\/\d{2}\s+\d{2}\:\d{2}\:\d{2}/gmi.test(str), true);
  });
});

describe('formatTools.formatByThousand', function () {
  it('1 数字', function () {
    var str = formatTools.formatByThousand(1234567);
    toEqual(str, '1,234,567');
  });
  it('2 数字字符串', function () {
    var str = formatTools.formatByThousand('1234.56');
    toEqual(str, '1,234.56');
  });
});

describe('formatTools.split4', function () {
  it('1 测试', function () {
    var str = formatTools.split4(6225880112345678);
    toEqual(str, '6225 8801 1234 5678');
  });
});

describe('formatTools.getType', function () {
  it('1 所有类型测试', function () {
    var res1 = formatTools.getType(new Date());
    var res2 = formatTools.getType(123);
    var res3 = formatTools.getType('test');
    var res4 = formatTools.getType({a: 1});
    var res5 = formatTools.getType(null);
    var res6 = formatTools.getType(undefined);

    toEqual(res1, 'date');
    toEqual(res2, 'number');
    toEqual(res3, 'string');
    toEqual(res4, 'object');
    toEqual(res5, 'null');
    toEqual(res6, 'undefined');
  });
});

function toEqual(orig, compare) {
  expect(orig).to.equal(compare);
}

function toDeepEqual(orig, compare) {
  expect(orig).to.deep.equal(compare);
}

function toBeA(orig, type) {
  expect(orig).to.be.a(type);
}

