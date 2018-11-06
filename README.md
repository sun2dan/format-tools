# format-tools
一个简单的格式化工具；包含格式化日期时间、数字、字符串的几个常用方法；

## 安装
```js   
$ npm install format-tools
```

## 用法
### 引用
```js
import formatTools from 'format-tools';
```

### format(str, args)
一个简单的字符串格式化工具，支持下标和属性两种方式，属性名称为数字、字母和下划线的组合；
- str：模板字符串
```js
  formatTools.format('{0}-{1}-{2}', 2018, '08', 10); // => '2018-08-10'
  formatTools.format('{year}-{month}-{day}', {year:2018, month:'08', day: 10}); // => '2018-08-10'
```

### formatDate(date, splitChar)
格式化日期，返回日期部分；有两个参数：
- date:date|number|string，支持日期对象、时间戳；
- splitChar: 可选，日期的分隔符号，默认为 '-'
```js
  formatTools.formatDate(new Date(2018, 9, 10, 12, 34, 56)); // => '2018-10-10'
  formatTools.formatDate(1539146096000, '/'); // => '2018/10/10'
```

### formatTime(date)
格式化日期，返回时间部分；一个参数：
- date:date|number|string，支持日期对象、时间戳；
```js
  formatTools.formatTime(new Date(2018, 9, 10, 12, 34, 56)); // => '12:34:56'
  formatTools.formatTime(1539146096000); // => '12:34:56'
```

### formatDateTime(date, splitChar)
格式化日期时间，返回日期+时间；有两个参数：
- date:date|number|string，支持日期对象、时间戳；
- splitChar: 可选，日期的分隔符号，默认为 '-'
```js
  formatTools.formatDateTime(new Date(2018, 9, 10, 12, 34, 56)); // => '2018-10-10 12:34:56'
  formatTools.formatDateTime(1539146096000, '/'); // => '2018/10/10 12:34:56'
```

### formatByThousand(num)
格式化数字，金额用到的时候较多，三位加一个千分位符号，参数：
- num: number|string，需要格式化的数字；
```js
  formatTools.formatByThousand(1234567); // => '1,234,567'
  formatTools.formatDateTime('1234.56'); // => '1,234.56'
  1234.56.toLocaleString('en-us'); // => '1,234.56'
```

### split4(str)
格式化字符串，四位加一个空格，银行卡号用到的较多；
- str: number|string，需要格式化的字符串；
```js
  formatTools.split4(6225880112345678); // => '6225 8801 1234 5678'
```

### getType(args)
获取参数类型字符串(小写)；
- args: String|Object|Number|Date|null|undefined，需要格式化的字符串；
```js            
    formatTools.getType(new Date()); // => 'date'
    formatTools.getType(123); // => 'number'
    formatTools.getType('test'); // => 'string'
    formatTools.getType({a: 1}); // => 'object'
    formatTools.getType(null);  // => 'null'
    formatTools.getType(undefined); // => 'undefined'
```
