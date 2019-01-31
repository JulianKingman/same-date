/**
 *
 * @param {object} options
 * @param {Date} options.date First date to compare
 * @param {Date} options.compareDate Second date to compare
 * @param {String} options.unit Compare by (hour | day | month | year)
 * @param {Number} options.sections Subdivisions of time period (e.g. 3 = 3 compare thirds of [unit])
 * @param {Boolean} options.local Use local time instead of UTC time
 */
export default function isSameDate({
  date: d1,
  compareDate: d2,
  unit = 'day',
  sections = 1,
  local = false,
}) {
  const allowedUnits = ['hour', 'day', 'month', 'year'];
  if (allowedUnits.indexOf(unit) < 0)
    throw 'Unit must be one of hour | day | month | year';
  let answer = false;
  const config = [
    {
      key: 'minute',
      level: 1,
      function: local ? 'getMinutes' : 'getUTCMinutes',
      unitsPerSection: Math.ceil(60 / sections),
    },
    {
      key: 'hour',
      level: 1,
      function: local ? 'getHours' : 'getUTCHours',
      unitsPerSection: Math.ceil(60 / sections),
    },
    {
      key: 'day',
      level: 2,
      function: local ? 'getDate' : 'getUTCDate',
      unitsPerSection: Math.ceil(24 / sections),
    },
    {
      key: 'month',
      level: 3,
      function: local ? 'getMonth' : 'getUTCMonth',
      unitsPerSection: Math.ceil(
        new Date(d1.getUTCFullYear(), d1.getUTCMonth() + 1, 0).getUTCDate() /
          sections
      ),
    },
    {
      key: 'year',
      level: 4,
      function: local ? 'getFullYear' : 'getUTCFullYear',
      unitsPerSection: Math.ceil(12 / sections),
    },
  ];
  let level = config.findIndex(f => f.key === unit);
  let i = config.length - 1;
  for (; i >= level; i--) {
    // Otherwise just do the final check
    answer = d1[config[i].function]() === d2[config[i].function]();
    // Last iteration, if multiple sections, check
    if (answer && sections > 1 && i === level) {
      // It's the same so far, check if it falls in the same section
      answer =
        Math.ceil(d1[config[i - 1].function]() / config[i].unitsPerSection) ===
        Math.ceil(d2[config[i - 1].function]() / config[i].unitsPerSection);
      console.log(
        answer,
        `${config[i].key} ${d1[config[i - 1].function]()}`,
        `${config[i].key} ${d2[config[i - 1].function]()}`,
        config[i].unitsPerSection
      );
    }
  }
  return answer;
}
