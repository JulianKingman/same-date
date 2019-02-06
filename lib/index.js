'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameDate;
/**
 *
 * @param {object} options
 * @param {Date} options.date First date to compare
 * @param {Date} options.compareDate Second date to compare
 * @param {String} options.unit Compare by (hour | day | month | year)
 * @param {Number} options.sections Subdivisions of time period (e.g. 3 = 3 compare thirds of [unit])
 * @param {Boolean} options.local Use local time instead of UTC time
 */
function isSameDate(_ref) {
  var d1 = _ref.date,
      d2 = _ref.compareDate,
      _ref$unit = _ref.unit,
      unit = _ref$unit === undefined ? 'day' : _ref$unit,
      _ref$sections = _ref.sections,
      sections = _ref$sections === undefined ? 1 : _ref$sections,
      _ref$local = _ref.local,
      local = _ref$local === undefined ? false : _ref$local;

  var allowedUnits = ['hour', 'day', 'month', 'year'];
  if (allowedUnits.indexOf(unit) < 0) throw 'Unit must be one of hour | day | month | year';
  var answer = true;
  var config = [{
    key: 'minute',
    level: 1,
    function: local ? 'getMinutes' : 'getUTCMinutes',
    unitsPerSection: Math.ceil(60 / sections)
  }, {
    key: 'hour',
    level: 1,
    function: local ? 'getHours' : 'getUTCHours',
    unitsPerSection: Math.ceil(60 / sections)
  }, {
    key: 'day',
    level: 2,
    function: local ? 'getDate' : 'getUTCDate',
    unitsPerSection: Math.ceil(24 / sections)
  }, {
    key: 'month',
    level: 3,
    function: local ? 'getMonth' : 'getUTCMonth',
    unitsPerSection: Math.ceil(new Date(d1.getUTCFullYear(), d1.getUTCMonth() + 1, 0).getUTCDate() / sections)
  }, {
    key: 'year',
    level: 4,
    function: local ? 'getFullYear' : 'getUTCFullYear',
    unitsPerSection: Math.ceil(12 / sections)
  }];
  var level = config.findIndex(function (f) {
    return f.key === unit;
  });
  var i = config.length - 1;
  for (; i >= level; i--) {
    // Otherwise just do the final check
    answer = answer && d1[config[i].function]() === d2[config[i].function]();
    // Last iteration, if multiple sections, check
    if (i === level && sections > 1) {
      // It's the same so far, check if it falls in the same section
      answer = Math.ceil(d1[config[i - 1].function]() / config[i].unitsPerSection) === Math.ceil(d2[config[i - 1].function]() / config[i].unitsPerSection);
    }
  }
  return answer;
}