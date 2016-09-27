/**
 * Created by txiaozhe on 27/09/2016.
 */
//
// (function (root, factory) {
//     if (typeof define === 'function' && define.amd)
//         define([], factory);
//     else
//         root.getLunarDate = factory();
// }(this, function () {
'use strict';

var madd = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var calendarData = [0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957,
    0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E,
    0x92E,
    0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D,
    0x2192B,
    0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B,
    0x8152A,
    0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95,
    0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5,
    0xB54,
    0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4,
    0x615B4,
    0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6,
    0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B,
    0x25D,
    0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B,
    0x60A57,
    0x52B, 0xA93, 0x40E95
];

function getBit(m, n) {
    return (m >> n) & 1;
}

function e2c(date) {
    var total, m, n, k, isEnd;
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    total = (year - 1921) * 365 + Math.floor((year - 1921) / 4) + madd[month] +
        day - 38;

    if (date.getYear() % 4 === 0 && month > 1) total++;

    for (m = 0, isEnd = false; ; m++) {
        k = (calendarData[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
            if (total <= 29 + getBit(calendarData[m], n)) {
                isEnd = true;
                break;
            }
            total = total - 29 - getBit(calendarData[m], n);
        }
        if (isEnd) break;
    }
    year = 1921 + m;
    month = k - n + 1;
    day = total;
    if (k === 12 && month == Math.floor(calendarData[m] / 0x10000) + 1)
        month = 1 - month;
    if (k === 12 && month > Math.floor(calendarData[m] / 0x10000) + 1)
        month--;
    return {
        year: year,
        month: month,
        day: day
    };
}

function getLunarDate(date) {
    //console.log("date======" + typeof (date));
    //var year = typeof(date) === Date ? date.getFullYear() : null;
    var year = date.getFullYear();
    var month;
    var day;
    if (year < 1921 || year > 2020) {
        return {};
    }

    date = e2c(date);
    year = date.year;
    month = date.month;
    day = date.day;

    var isLeapYear = month < 1;
    var lunarDay = '';
    if (day < 11) lunarDay += '初';
    else if (day < 20) lunarDay += '十';
    else if (day < 30) lunarDay += '廿';
    else lunarDay += '三十';
    if (day % 10 || day === 10) lunarDay += numString.charAt((day - 1) % 10);

    return {
        year: tgString.charAt((year - 4) % 10) + dzString.charAt((year - 4) % 12),
        zodiac: sx.charAt((year - 4) % 12),
        isLeapYear: isLeapYear,
        month: isLeapYear ? monString.charAt(-month - 1) : monString.charAt(month -
            1),
        day: lunarDay
    };
}
//
//     return getLunarDate;
// }));

module.exports = getLunarDate;