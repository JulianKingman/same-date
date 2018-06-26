# same-date
Minimal function that tells you whether dates are within the same year, month, day, or hour. Allows subdividing (e.g. 1/2 year).

## Why?
I love moment.js, but for some things (such as date comparison) it's regrettably slow. Until the time comes that it's quick to compare dates in momentjs, this library will come in handy. It's useful for averaging data out over a given time period (i.e. if it's in the same period, average it).

## Install
```
npm install same-date
```

## Usage
```javascript
import sameDate from 'same-date';

const date1 = new Date('2018-06-26');
const date2 = new Date('2018-06-14');
const date3 = new Date('2019-01-01');
const isSameYear = sameDate(date1, date2, 'year'); // true
const isSameYear2 = sameDate(date1, date3, 'year'); // false
const isSameMonth = sameDate(date1, date2, 'month'); // true
const isSameDay = sameDate(date1, date2, 'day'); // false
const isSameHour = sameDate(date1, date2, 'hour'); // false

// Using the section prop, to subdivide the time period for comparison.
const isSameHalfOfMonth = sameDate(date1, date2, 'month', 2); // false, different halves of the month
const isSameThirdOfMonth = sameDate(date1, date2, 'month', 3); // true, same third of the month