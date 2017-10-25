// jshint esversion:6, node:true

/**
 * @author Leandro Silva
 * @copyright 2016-2017 Leandro Silva (http://grafluxe.com)
 * @license MIT
 *
 * @classdesc Originally written to help work with calendar data, this class helps parse, format, and
 *            transform dates. It supports both Node and browser use.
 */

class Datelish {
  /**
   * Returns an array of month names.
   * @param   {Boolean} short=false Whether to return full month names or the 3 letter abbreviated versions.
   * @returns {Array}
   */
  static monthAsNames(short = false) {
    if (short) {
      return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    } else {
      return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }
  }

  /**
   * Returns an array of days for a given month of the specified year. Including the year is requied since
   * days change due to leap year.
   * @param   {Number|String} month Expects either a number representing the current month (0-11) or
   *                                a string with the month name (as either a three letter abbreviation
   *                                or the full name in American English).
   * @param   {Number}        year  Can be formatted as either two digits or four digits.
   * @returns {Array}
   */
  static daysPerMonth(month, year) {
    let arr = [],
        i,
        len = Datelish.daysTotal(month, year);

    for (i = 1; i <= len; i++) {
      arr.push(i);
    }

    return arr;
  }

  /**
   * Returns the total numbers of days in a given month of the specified year. Including the year is requied since
   * days change due to leap year.
   * @param   {Number|String} month Either a number representing the current month (0-11) or a string
   *                                with the month name (as either a three letter abbreviation or the full
   *                                name in American English).
   * @param   {Number}        year  Can be formatted as either two digits or four digits.
   * @returns {Number}
   */
  static daysTotal(month, year) {
    if (typeof month === "string") {
      month = Datelish.monthNameToIndex(month);
    }

    if (month < 0) {
      return null;
    }

    return new Date(year, month + 1, 0).getDate();
  }

  /**
   * Returns an array of years (in four digit format) from the range inputted.
   * @param   {Number}        from A four digit year.
   * @param   {Number|String} to   A number or string. If a string is used, a range is returned with
   *                               the 'from' year plus amount in the 'to' string. For example: Assuming
   *                               the current year is 2012, both Datelish.years(Datelish.currYear, 2014)
   *                               and Datelish.years(Datelish.currYear, "2") return [2012, 2013, 2014].
   * @returns {Array}
   */
  static years(from, to) {
    let arr = [],
        i,
        diff;

    if (from < 1000 || from > 9999 || (typeof to === "number" && (to < 1000 || to > 9999))) {
      throw new Error("The years method expects a four digit year.");
    }

    if (typeof to === "string") { to = from + parseInt(to, 10); }

    diff = to - from;

    if (diff < 0) { diff = 0; }

    for (i = 0; i <= diff; i++) {
      arr.push(from + i);
    }

    return arr;
  }

  /**
   * Returns the current year (in four digit format).
   * @returns {Number}
   */
  static currYear() {
    return new Date().getFullYear();
  }

  /**
   * Returns the index (0–11) for a given month.
   * @param   {String} month The month name (as either a three letter abbreviation or the full name in American English).
   * @returns {Number}
   */
  static monthNameToIndex(month) {
    month = month.substr(0, 1).toUpperCase() + month.substr(1);

    return Datelish.monthAsNames(month.length <= 3 ? true : false).indexOf(month);
  }

  /**
   * Returns the name for a given month index (0–11).
   * @param   {Number}   index       The index to search.
   * @param   {Boolean=} short=false Whether to return full a month name or the 3 letter abbreviated version.
   * @returns {String}
   */
  static monthIndexToName(index, short = false) {
    return Datelish.monthAsNames(short)[index];
  }

  /**
   * Returns a boolean determining whether a given date is today.
   * @param   {Date} date The date to check against.
   * @returns {Boolean}
   */
  static todayIs(date) {
    let today = new Date();

    return (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate());
  }

  /**
   * Returns a boolean determining whether a given date is between two dates.
   * @param   {Date}     date                 The date to check against.
   * @param   {Date}     startDate            The start date.
   * @param   {Date}     endDate              The end date.
   * @param   {Boolean=} includeEndDate=false Whether to include the end date.
   * @returns {Boolean}
   */
  static dateIsBetween(date, startDate, endDate, includeEndDate = false) {
      return (date >= startDate && (includeEndDate ? date <= endDate : date < endDate));
  }

  /**
   * Returns a boolean determining whether a given date is after a date.
   * @param   {Date}    date        The date to check against.
   * @param   {Date}    isAfterDate The date to compare against.
   * @returns {Boolean}
   */
  static dateIsAfter(date, isAfterDate) {
    return date > isAfterDate;
  }

  /**
   * Returns a boolean determining whether given date is before a date.
   * @param   {Date}    date         The date to check against.
   * @param   {Date}    isBeforeDate The date to compare against.
   * @returns {Boolean}
   */
  static dateIsBefore(date, isBeforeDate) {
    return date < isBeforeDate;
  }

  /**
   * Returns a date in ISO 8601 format (YYYY-MM-DDThh:mm:ssTZD).
   * @param   {Date}   date The date to check against.
   * @returns {String}
   */
  static toISO8601(date) {
    let dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        time = `T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        tzd = date.toString().substr(-11, 3) + ":" + date.toString().substr(-8, 2);

    return (dateStr + time).replace(/(\D)(\d)(?=\D)|(\D)(\d)$/g, "$1$30$2$4") + tzd;
  }

  /**
   * Returns a date in little-endian format (DD/MM/YYYY).
   * @param   {Date}     date          The date to check against.
   * @param   {String=}  divider="/"   The character to use as a divider.
   * @param   {Boolean=} prepend0=true Whether to prepend a "0" if the value is less than the 10.
   * @returns {String}
   */
  static toLittleEndian(date, divider = "/", prepend0 = true) {
    if (prepend0) {
      return Datelish.prepend0(date.getDate()) + divider + Datelish.prepend0(date.getMonth() + 1) + divider + date.getFullYear();
    } else {
      return date.getDate() + divider + (date.getMonth() + 1) + divider + date.getFullYear();
    }
  }

  /**
   * Returns a date from a little-endian formatted string (DD/MM/YYYY).
   * @param   {String} dateStr The date to check against.
   * @returns {Date}
   */
  static fromLittleEndian(dateStr) {
    let match = dateStr.match(/\d+/g);

    if (match[2].length !== 4) {
      throw new Error("The fromLittleEndian method expects a four digit year (DD/MM/YYYY).");
    }

    return new Date(match[2], match[1] - 1, match[0]);
  }

  /**
   * Returns a date in middle-endian format (MM/DD/YYYY).
   * @param   {Date}     date          The date to check against.
   * @param   {String=}  divider="/"   The character to use as a divider.
   * @param   {Boolean=} prepend0=true Whether to prepend a "0" if the value is less than the 10.
   * @returns {String}
   */
  static toMiddleEndian(date, divider = "/", prepend0 = true) {
    if (prepend0) {
      return Datelish.prepend0(date.getMonth() + 1) + divider + Datelish.prepend0(date.getDate()) + divider + date.getFullYear();
    } else {
      return (date.getMonth() + 1) + divider + date.getDate() + divider + date.getFullYear();
    }
  }

  /**
   * Returns a date from a middle-endian formatted string (MM/DD/YYYY).
   * @param   {String} dateStr The date to check against.
   * @returns {Date}
   */
  static fromMiddleEndian(dateStr) {
    let match = dateStr.match(/\d+/g);

    if (match[2].length !== 4) {
      throw new Error("The fromMiddleEndian method expects a four digit year (MM/DD/YYYY).");
    }

    return new Date(match[2], match[0] - 1, match[1]);
  }

  /**
   * Returns a date in big-endian format (YYYY/MM/DD).
   * @param   {Date}     date          The date to check against.
   * @param   {String=}  divider="/"   The character to use as a divider.
   * @param   {Boolean=} prepend0=true Whether to prepend a "0" if the value is less than the 10.
   * @returns {String}
   */
  static toBigEndian(date, divider = "/", prepend0 = true) {
    if (prepend0) {
      return date.getFullYear() + divider + Datelish.prepend0(date.getMonth() + 1) + divider + Datelish.prepend0(date.getDate());
    } else {
      return date.getFullYear() + divider + (date.getMonth() + 1) + divider + date.getDate();
    }
  }

  /**
   * Returns a date from a big-endian formatted string (YYYY/MM/DD).
   * @param   {String} dateStr The date to check against.
   * @returns {Date}
   */
  static fromBigEndian(dateStr) {
    let match = dateStr.match(/\d+/g);

    if (match[0].length !== 4) {
      throw new Error("The fromBigEndian method expects a four digit year (YYYY/MM/DD).");
    }

    return new Date(match[0], match[1] - 1, match[2]);
  }

  /**
   * Converts seconds to minutes.
   * @param   {Number}   sec           Seconds.
   * @param   {Boolean=} prepend0=true Whether to prepend a "0" if the value is less than the 10.
   * @returns {String}
   */
  static toMinutes(sec, prepend0 = true) {
    let mins = String(sec / 60),
        secs = String(sec % 60);

    if (mins.indexOf(".") > -1) {
      mins = mins.substr(0, mins.indexOf("."));
    }

    return (prepend0 && mins.length < 2 ? "0" + mins : mins) + ":" + (secs.length < 2 ? "0" + secs : secs);
  }

  /**
   * Returns the today including the current time.
   * @returns {Date}
   */
  static now() {
    return new Date();
  }

  /**
   * Returns today.
   * @returns {Date}
   */
  static today() {
    let now = new Date();

    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  /**
   * Returns tomorrow.
   * @returns {Date}
   */
  static tomorrow() {
    return Datelish.daysFromDate(Datelish.today(), 1);
  }

  /**
   * Returns yesterday.
   * @returns {Date}
   */
  static yesterday() {
    return Datelish.daysFromDate(Datelish.today(), -1);
  }

  /**
   * Returns a number of days before/after a given date.
   * @param   {Date}   date The date to check against.
   * @param   {Number} n    The number of days to advance/retract. Use a negative number to go back days.
   * @returns {Date}
   */
  static daysFromDate(date, n) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
  }

  /**
   * Returns the previous month of a given date.
   * @param   {Date=} date=null The date to check against. If null, date will equal today.
   * @returns {Date}
   */
  static prevMonth(date = null) {
    date = date || Datelish.today();

    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }

  /**
   * Returns the next month of a given date.
   * @param   {Date=} date=null The date to check against. If null, date will equal today.
   * @returns {Date}
   */
  static nextMonth(date = null) {
    date = date || Datelish.today();

    return new Date(date.getFullYear(), date.getMonth(), Datelish.daysTotal(date.getMonth(), date.getFullYear()) + 1);
  }

  /**
   * Returns a string with a prepended "0" (if the value is less than 10).
   * @param   {Number|String} val The string/number to check against.
   * @returns {String}
   */
  static prepend0(val) {
    if (String(val).indexOf(".") > -1 || isNaN(val)) {
      throw new Error("The prepend0 method expects a whole number.");
    }

    val = Number(val);

    return (val < 10 ? "0" + val : val);
  }

  /**
   * Returns the number of days between two dates.
   * @param   {Date}   startDate The start date.
   * @param   {Date}   endDate   The end date.
   * @returns {Number}
   */
  static dayCount(startDate, endDate) {
    let days = ((((endDate.getTime() - startDate.getTime()) / 1000) / 60) / 60) / 24;

    return Math.floor(days) + (startDate.getTimezoneOffset() > endDate.getTimezoneOffset() ? 1 : 0);
  }

  /**
   * Returns an array of months from the given dates.
   * @param   {Date}     startDate              The start date.
   * @param   {Date}     endDate                The end date.
   * @param   {Boolean=} includeStartDate=false Whether to include the start date in the output.
   * @returns {Array}
   */
  static monthsFrom(startDate, endDate, includeStartDate = false) {
    let yrs = (endDate.getFullYear() - startDate.getFullYear()) * 12,
        mth = (endDate.getMonth() - startDate.getMonth()),
        dates = [],
        i = (includeStartDate ? 0 : 1),
        len = yrs + mth + 1;

    for (i; i < len; i++) {
      dates.push(new Date(startDate.getFullYear(), startDate.getMonth() + i, 1));
    }

    return dates;
  }

}

// Support CJS/Node
if (typeof module === "object" && module.exports) {
  module.exports = Datelish;
}
