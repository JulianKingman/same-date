/**
 *
 * @param {date} d1 First date to compare
 * @param {date} d2 Second date to compare
 * @param {string} unit Unit to compare by "day" (default) | "month" | "year" | "hour"
 * @param {number} sections Subsections of unit (e.g. compare 2 halves of day), default 1 (whole, not subdivided)
 */
export default function isSameDate(d1, d2, unit = 'day', sections = 1) {
  let answer = true;
  const numForDate = [
    {
      unit: 'year',
      dateFunction: 'getUTCFullYear',
      prevDateFunction: 'getUTCMonth',
      unitsPerSection: Math.floor(12 / sections),
    },
    {
      unit: 'month',
      dateFunction: 'getUTCMonth',
      prevDateFunction: 'getUTCDate',
      unitsPerSection: Math.floor(
        new Date(d1.getUTCFullYear(), d1.getUTCMonth() + 1, 0).getUTCDate() /
          sections
      ),
    },
    {
      unit: 'day',
      dateFunction: 'getUTCDate',
      prevDateFunction: 'getUTCHours',
      unitsPerSection: Math.floor(24 / sections),
    },
    {
      unit: 'hour',
      dateFunction: 'getUTCHours',
      prevDateFunction: 'getUTCMinutes',
      unitsPerSection: Math.floor(60 / sections),
    },
  ];
  const indexOfUnit = numForDate.findIndex(u => u.unit === unit);
  numForDate.forEach((unitInfo, index) => {
    if (index > indexOfUnit) return;
    answer = answer && d1[unitInfo.dateFunction]() === d2[unitInfo.dateFunction]();
  });
  if (answer && sections > 1) {
    answer =
      Math.ceil(d1[numForDate[indexOfUnit].prevDateFunction]() / numForDate[indexOfUnit].unitsPerSection) ===
      Math.ceil(d2[numForDate[indexOfUnit].prevDateFunction]() / numForDate[indexOfUnit].unitsPerSection);
  }
  return answer;
}
