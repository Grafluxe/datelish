# Datelish

Originally written to help work with calendar data, this class helps parse, format, and transform dates. It supports both Node and browser use.

## Usage

### Node

`npm install datelish`

```
var Datelish = require("datelish");
```

Minified version:

```
var Datelish = require("datelish/dist/Datelish.min");
```

[Visit package on npm](https://www.npmjs.com/package/datelish)

[![npm](https://nodei.co/npm/datelish.png)](https://www.npmjs.com/package/datelish)

### Browser

```
import Datelish from "datelish";
```

Minified version:

```
import Datelish from "datelish/dist/Datelish.min";
```

Script tag:

```
<script src="node_modules/datelish/dist/Datelish.min.js"></script>
```

## Notes

- This project is lightweight and dependency free.
- The source code is written in ES6 and transpiled with Babel.
- If you need to create documentation for local use, run `npm run doc`. Otherwise, visit the online [docs](http://grafluxe.com/o/doc/datelish/Datelish.html).


## Samples

### Static Methods

#### Datelish.toLittleEndian(*date, divider = "/", prepend0 = true*);

```
Datelish.toLittleEndian(new Date(2016, 1, 1));
// 01/02/2016

Datelish.toLittleEndian(Datelish.today(), "-", false);
// 10-1-2016
```

-

#### Datelish.fromLittleEndian(*dateStr*);

```
Datelish.fromLittleEndian("1/2/2016");
// Mon Feb 01 2016 00:00:00 GMT-0500 (EST)
```

-

#### Datelish.toMiddleEndian(*date, divider = "/", prepend0 = true*);

```
Datelish.toMiddleEndian(new Date(2016, 1, 1));
// 02/01/2016

Datelish.toMiddleEndian(new Date(2016, 1, 1), ".");
// 02.01.2016
```

-

#### Datelish.fromMiddleEndian(*dateStr*);

```
Datelish.fromMiddleEndian("2/1/2016");
// Mon Feb 01 2016 00:00:00 GMT-0500 (EST)
```

-

#### Datelish.toBigEndian(*date, divider = "/", prepend0 = true*);

```
Datelish.toBigEndian(new Date(2016, 1, 1));
// 2016/02/01

Datelish.toBigEndian(new Date(2016, 1, 1), "", false);
// 20160201
```

-

#### Datelish.fromBigEndian(*dateStr*);

```
Datelish.fromBigEndian("2016/2/1");
// Mon Feb 01 2016 00:00:00 GMT-0500 (EST)

Datelish.fromBigEndian("2016.02.01");
// Mon Feb 01 2016 00:00:00 GMT-0500 (EST)
```

-

#### Datelish.toISO8601(*date*);

```
Datelish.toISO8601(new Date(2016, 1, 1));
// 2016-02-01T00:00:00-05:00
```

-

#### Datelish.daysTotal(*month, year*);

```
Datelish.daysTotal("february", 2015);
// 28

Datelish.daysTotal("feb", 2016);
// 29

Datelish.daysTotal(1, 2016);
// 29
```

-

#### Datelish.daysPerMonth(*month, year*);

```
Datelish.daysPerMonth("feb", 2016);
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29
```

-

#### Datelish.dayCount(*startDate, endDate*);

```
Datelish.dayCount(new Date(2016, 1, 1), new Date(2016, 1, 10));
// 9
```

-

#### Datelish.monthAsNames(*short = false*);

```
Datelish.monthAsNames();
// January, February, March, April, May, June, July, August, September, October, November, December

Datelish.monthAsNames(true);
// Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
```

-

#### Datelish.monthNameToIndex(*month*);

```
Datelish.monthNameToIndex("feb");
// 1

Datelish.monthNameToIndex("february");
// 1
```

-

#### Datelish.monthIndexToName(*index, short = false*);

```
Datelish.monthIndexToName(1);
// February

Datelish.monthIndexToName(1, true);
// Feb
```

-

#### Datelish.monthsFrom(*startDate, endDate*);

```
Datelish.monthsFrom(new Date(2016, 1, 1), new Date(2016, 3, 1));
// Tue Mar 01 2016 00:00:00 GMT-0500 (EST), Fri Apr 01 2016 00:00:00 GMT-0400 (EDT)
```

-

#### Datelish.dateIsBetween(*date, startDate, endDate, includeEndDate = false*);

```
Datelish.dateIsBetween(new Date(2016, 1, 1), new Date(2000, 10, 1), new Date(2020, 1, 1));
// true
```

-

#### Datelish.dateIsAfter(*date, isAfterDate*);

```
Datelish.dateIsAfter(new Date(2016, 1, 1), new Date(2016, 0, 1));
// true
```

-

#### Datelish.dateIsBefore(*date, isBeforeDate*);

```
Datelish.dateIsBefore(new Date(2016, 1, 1), new Date(2016, 0, 1));
// false
```

-

#### Datelish.todayIs(*date*);

```
Datelish.todayIs(new Date(2016, 1, 1));
// false
```

-

#### Datelish.years(*from, to*);

```
Datelish.years(2016, 2020);
// 2016, 2017, 2018, 2019, 2020

Datelish.years(2016, "4");
// 2016, 2017, 2018, 2019, 2020
```

-

#### Datelish.currYear();

```
Datelish.currYear();
// 2017
```

-

#### Datelish.prepend0(*val*);

```
Datelish.prepend0(1);
// 01

Datelish.prepend0("1");
// 01
```

-

#### Datelish.toMinutes(*sec, prepend0 = true*);

```
Datelish.toMinutes(90);
// 01:30

Datelish.toMinutes(90, false);
// 1:30
```

-

#### Datelish.daysFromDate(*date, n*);

```
Datelish.daysFromDate(new Date(2016, 1, 1), 5);
// Sat Feb 06 2016 00:00:00 GMT-0500 (EST)

Datelish.daysFromDate(Datelish.today(), -1);
// Mon Jan 09 2017 00:00:00 GMT-0500 (EST)
```

-

#### Datelish.now();

```
Datelish.now();
// Tue Jan 10 2017 12:02:58 GMT-0500 (EST)
```

-

#### Datelish.today();

```
Datelish.today();
// Tue Jan 10 2017 00:00:00 GMT-0500 (EST)
```

-

#### Datelish.tomorrow();

```
Datelish.tomorrow();
// Wed Jan 11 2017 00:00:00 GMT-0500 (EST)
```

-

#### Datelish.yesterday();

```
Datelish.yesterday();
// Mon Jan 09 2017 00:00:00 GMT-0500 (EST)
```

-

#### Datelish.prevMonth();

```
Datelish.prevMonth();
// Thu Dec 01 2016 00:00:00 GMT-0500 (EST)
```

-

#### Datelish.nextMonth();

```
Datelish.nextMonth();
// Wed Feb 01 2017 00:00:00 GMT-0500 (EST)
```

-

See the full documentation [here](http://grafluxe.com/o/doc/datelish/Datelish.html).

## License

Copyright (c) 2016 Leandro Silva (http://grafluxe.com)

Released under the MIT License.

See LICENSE.md for entire terms.
