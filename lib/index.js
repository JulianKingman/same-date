'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameDate;
/**
 *
 * @param {date} d1 First date to compare
 * @param {date} d2 Second date to compare
 * @param {string} unit Unit to compare by "day" (default) | "month" | "year" | "hour"
 * @param {number} sections Subsections of unit (e.g. compare 2 halves of day), default 1 (whole, not subdivided)
 */
function isSameDate(d1, d2) {
  var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
  var sections = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  var answer = false;
  var numForDate = {
    hour: 'getUTCHours',
    day: 'getUTCDate',
    month: 'getUTCMonth',
    year: 'getUTCFullYear'
  };
  answer = d1[numForDate[unit]]() === d2[numForDate[unit]]();
  if (answer && sections > 1) {
    var prevNumForDate = {
      hour: 'getUTCMinutes',
      day: 'getUTCHours',
      month: 'getUTCDate',
      year: 'getUTCMonth'
    };
    var unitsPerSection = {
      hour: Math.floor(60 / sections),
      day: Math.floor(24 / sections),
      month: Math.floor(new Date(d1.getUTCFullYear(), d1.getUTCMonth() + 1, 0).getUTCDate() / sections),
      year: Math.floor(12 / sections)
    };
    answer = Math.ceil(d1[prevNumForDate[unit]]() / unitsPerSection[unit]) === Math.ceil(d2[prevNumForDate[unit]]() / unitsPerSection[unit]);
  }
  return answer;
}