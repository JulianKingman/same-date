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
  let answer = false;
  const numForDate = {
    hour: local ? 'getHours' : 'getUTCHours',
    day: local ? 'getDate' : 'getUTCDate',
    month: local ? 'getMonth' : 'getUTCMonth',
    year: local ? 'getFullYear' : 'getUTCFullYear',
  };
  answer = d1[numForDate[unit]]() === d2[numForDate[unit]]();
  if (answer && sections > 1) {
    const prevNumForDate = {
      hour: 'getUTCMinutes',
      day: 'getUTCHours',
      month: 'getUTCDate',
      year: 'getUTCMonth',
    };
    const unitsPerSection = {
      hour: Math.floor(60 / sections),
      day: Math.floor(24 / sections),
      month: Math.floor(
        new Date(d1.getUTCFullYear(), d1.getUTCMonth() + 1, 0).getUTCDate() /
          sections
      ),
      year: Math.floor(12 / sections),
    };
    answer =
      Math.ceil(d1[prevNumForDate[unit]]() / unitsPerSection[unit]) ===
      Math.ceil(d2[prevNumForDate[unit]]() / unitsPerSection[unit]);
  }
  return answer;
}
