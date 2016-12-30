/**
 * @author Leandro Silva
 * @file Supports module (AMD/CJS) and window use.
 */

(function (win) {
  "use strict";

  /**
   * Defines the modular object. Do not rename this function as it is used as
   * the export for modules and the window object. Place all logic inside this
   * function and pass in dependencies as arguments.
   */
  function modular() {
    var DateUtil;

    /**
    * @class
    * @classdesc Utilities for working with dates.
    */
    DateUtil = function () {
      return;
    };

    /**
     * Returns an array of month names.
     * @param   {Boolean=} short If the 'short' param is set to true, a three letter abbreviation of each month is returned.
     * @returns {Array}
     */
    DateUtil.monthAsNames = function (short) {
      if (short) {
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      } else {
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      }
    };

    /**
     * Returns an array of days for a given month of the specified year (days change due to leap year).
     * @param   {(Number|String)} month Expects either a number representing the current month (0 - 11) or a string with the month name (as either a three letter abbreviation or the full name in American English).
     * @param   {Number} year
     * @returns {Array}
     */
    DateUtil.daysPerMonth = function (month, year) {
      var a = [],
        i,
        len = DateUtil.daysTotal(month, year);

      for (i = 1; i <= len; i++) {
        a.push(i);
      }

      return a;
    };

    /**
     * Returns the total numbers of days in a given month of the specified year (days change due to leap year).
     * @param   {(Number|String)} month Either a number representing the current month (0 - 11) or a string with the month name (as either a three letter abbreviation or the full name in American English).
     * @param   {Number} year
     * @returns {Number}
     */
    DateUtil.daysTotal = function (month, year) {
      var d;

      if (typeof month === "string") { month = DateUtil.monthNameToIndex(month); }
      if (month < 0) { return null; }

      d = new Date(year, month + 1, 0);

      return d.getDate();
    };

    /**
     * Returns an array of years (in four digit form) from the range inputted.
     * @param   {Number} from A four digit year.
     * @param   {(String|Number)} to   A number or string. If a string is used, a range is returned with the 'from' year plus amount in the 'to' string. For example: Assuming the current year is 2012, both DateUtls.years(DateUtls.currYear, 2014) and DateUtls.years(DateUtls.currYear, '2') return [2012, 2013, 2014].
     * @returns {Array}
     */
    DateUtil.years = function (from, to) {
      var a = [],
        i,
        dif;

      if (from < 1000 || from > 9999 || (typeof to === "number" && (to < 1000 || to > 9999))) {
        throw new Error("The years method expects a four digit year.");
      }

      if (typeof to === "string") { to = from + parseInt(to, 10); }

      dif = to - from;

      if (dif < 0) { dif = 0; }

      for (i = 0; i <= dif; i++) {
        a.push(from + i);
      }

      return a;
    };

    /**
     * Returns the current year (in four digit form).
     * @returns {Number}
     */
    DateUtil.currYear = function () {
      return new Date().getFullYear();
    };

    /**
     * Returns the index (0–11) for a given month.
     * @param   {String}   month The month name (as either a three letter abbreviation or the full name in American English).
     * @returns {Number}
     */
    DateUtil.monthNameToIndex = function (month) {
      var mArr = DateUtil.monthAsNames(month.length <= 3 ? true : false);

      month = month.substr(0, 1).toUpperCase() + month.substr(1);

      return mArr.indexOf(month);
    };

    /**
     * Returns the name for a given month index (0–11).
     * @param   {Number} index
     * @param   {Boolean=} short
     * @returns {String}
     */
    DateUtil.monthIndexToName = function (index, short) {
      return DateUtil.monthAsNames(short)[index];
    };

    /**
     * Returns a boolean determining whether a given date is today.
     * @param   {Date}   date
     * @returns {Boolean}
     */
    DateUtil.todayIs = function (date) {
      var today = new Date();

      return (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate());
    };

    /**
     * Returns a boolean determining whether a given date is between two dates.
     * @param   {Date} d
     * @param   {Date} startDate
     * @param   {Date} endDate
     * @param   {Boolean=} includeEndDate
     * @returns {Boolean}
     */
    DateUtil.dateIsBetween = function (d, startDate, endDate, includeEndDate) {
      if (includeEndDate) {
        return (d >= startDate && d <= endDate);
      } else {
        return (d >= startDate && d < endDate);
      }
    };

    /**
     * Returns a boolean determining whether a given date is after a date.
     * @param   {Date} d
     * @param   {Date} isAfterDate
     * @returns {Boolean}
     */
    DateUtil.dateIsAfter = function (d, isAfterDate) {
      return d > isAfterDate;
    };

    /**
     * Returns a boolean determining whether given date is before a date.
     * @param   {Date} d
     * @param   {Date} isBeforeDate
     * @returns {Boolean}
     */
    DateUtil.dateIsBefore = function (d, isBeforeDate) {
      return d < isBeforeDate;
    };

    /**
     * Returns a date in ISO 8601 format (YYYY-MM-DDThh:mm:ssTZD).
     * @param   {Date} d
     * @param   {Boolean=} [prefixT = true] Set to true to prefix the "T" chatacter.
     * @returns {String}
     */
    DateUtil.toISO8601 = function (d, prefixT) {
      var s = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + (prefixT !== false ? "T" : " ") + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
        tzd = d.toString().substr(-11, 3) + ":" + d.toString().substr(-8, 2);

      return s.replace(/(\D)(\d)(?=\D)|(\D)(\d)$/g, "$1$30$2$4") + tzd;
    };

    /**
     * Returns a date in little-endian format (DD/MM/YYYY).
     * @param   {Date} d
     * @param   {String=} [divider = "/"]
     * @param   {Boolean=} [prepend0 = true]
     * @returns {String}
     */
    DateUtil.toLittleEndian = function (d, divider, prepend0) {
      var date;

      if (!divider) { divider = "/"; }
      if (prepend0 === undefined) {  prepend0 = true; }

      if (prepend0) {
        date = DateUtil.prepend0(d.getDate()) + divider + DateUtil.prepend0(d.getMonth() + 1) + divider + d.getFullYear();
      } else {
        date = d.getDate() + divider + (d.getMonth() + 1) + divider + d.getFullYear();
      }

      return date;
    };

    /**
     * Returns a date from little-endian format (DD/MM/YYYY).
     * @param   {Date}   d
     * @returns {Date}
     */
    DateUtil.fromLittleEndian = function (d) {
      var m = d.match(/\d+/g);

      if (m[2].length !== 4) { throw new Error("[DateUtls] The fromLittleEndian method expects a four digit year."); }

      return new Date(m[2], m[1] - 1, m[0]);
    };

    /**
     * Returns a date in middle-endian format (MM-DD-YYYY).
     * @param   {Date} d
     * @param   {String=} [divider = "/"]
     * @param   {Boolean=} [prepend0 = true]
     * @returns {String}
     */
    DateUtil.toMiddleEndian = function (d, divider, prepend0) {
      var date;

      if (!divider) { divider = "/"; }
      if (prepend0 === undefined) {  prepend0 = true; }

      if (prepend0) {
        date = DateUtil.prepend0(d.getMonth() + 1) + divider + DateUtil.prepend0(d.getDate()) + divider + d.getFullYear();
      } else {
        date = (d.getMonth() + 1) + divider + d.getDate() + divider + d.getFullYear();
      }

      return date;
    };

    /**
     * Returns a date from middle-endian format (MM-DD-YYYY).
     * @param   {String}   d
     * @returns {Date}
     */
    DateUtil.fromMiddleEndian = function (d) {
      var m = d.match(/\d+/g);

      if (m[2].length !== 4) { throw new Error("[DateUtls] The fromMiddleEndian method expects a four digit year."); }

      return new Date(m[2], m[0] - 1, m[1]);
    };

    /**
     * Returns a date in big-endian format (YYYY-MM-DD).
     * @param   {Date} d
     * @param   {String=} [divider = "/"]
     * @param   {Boolean=} [prepend0 = true]
     * @returns {String}
     */
    DateUtil.toBigEndian = function (d, divider, prepend0) {
      var date;

      if (!divider) { divider = "/"; }
      if (prepend0 === undefined) {  prepend0 = true; }

      if (prepend0) {
        date = d.getFullYear() + divider + DateUtil.prepend0(d.getMonth() + 1) + divider + DateUtil.prepend0(d.getDate());
      } else {
        date = d.getFullYear() + divider + (d.getMonth() + 1) + divider + d.getDate();
      }

      return date;
    };

    /**
     * Returns a date from big-endian format (YYYY-MM-DD).
     * @param   {String}   d
     * @returns {Date}
     */
    DateUtil.fromBigEndian = function (d) {
      var m = d.match(/\d+/g);

      if (m[0].length !== 4) { throw new Error("[DateUtls] The fromBigEndian method expects a four digit year."); }

      return new Date(m[0], m[1] - 1, m[2]);
    };

    /**
     * Converts seconds to minutes and returns it as a string.
     * @param   {Number} sec
     * @param   {Boolean=} [prepend0 = true]
     * @returns {String}
     */
    DateUtil.toMinutes = function (sec, prepend0) {
      var mins = String(sec / 60),
        secs = String(sec % 60);

      if (prepend0 === undefined) {  prepend0 = true; }

      if (mins.indexOf(".") > -1) { mins = mins.substr(0, mins.indexOf(".")); }

      return (prepend0 && mins.length < 2 ? "0" + mins : mins) + ":" + (secs.length < 2 ? "0" + secs : secs);
    };

    /**
     * Returns the today including the current time.
     * @returns {Date}
     */
    DateUtil.now = function () {
      return new Date();
    };

    /**
     * Returns today.
     * @returns {Date}
     */
    DateUtil.today = function () {
      var now = new Date();

      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    };

    /**
     * Returns tomorrow.
     * @returns {Date}
     */
    DateUtil.tomorrow = function () {
      return DateUtil.daysFromDate(DateUtil.today(), 1);
    };

    /**
     * Returns yesterday.
     * @returns {Date}
     */
    DateUtil.yesterday = function () {
      return DateUtil.daysFromDate(DateUtil.today(), -1);
    };

    /**
     * Returns a number of days before/after a given date.
     * @param   {Date}   d
     * @param   {Number} n
     * @returns {Date}
     */
    DateUtil.daysFromDate = function (d, n) {
      return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
    };

    /**
     * Returns the previous month.
     * @returns {Date}
     */
    DateUtil.prevMonth = function () {
      var today = DateUtil.today();

      return new Date(today.getFullYear(), today.getMonth() - 1, 1);
    };

    /**
     * Returns the next month.
     * @returns {Date}
     */
    DateUtil.nextMonth = function () {
      var today = DateUtil.today();

      return new Date(today.getFullYear(), today.getMonth(), DateUtil.daysTotal(today.getMonth(), today.getFullYear()) + 1);
    };

    /**
     * Returns a string with a prepended '0' if needed (if the value is under the 10).
     * @param   {(Sring|Number)} val
     * @returns {String}
     */
    DateUtil.prepend0 = function (val) {
      return (val < 10 ? "0" + val : val);
    };

    /**
     * Returns the number of days between two dates.
     * @param   {Date}   d1
     * @param   {Date}   d2
     * @returns {Number}
     */
    DateUtil.dayCount = function (d1, d2) {
      d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
      d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

      return (((((d2.getTime() - d1.getTime()) / 1000) / 60) / 60) / 24) + (d1.getTimezoneOffset() > d2.getTimezoneOffset() ? 1 : 0);
    };

    /**
     * Returns an array of months from the given dates.
     * @param   {Date} from
     * @param   {Date} to
     * @returns {Array}
     */
    DateUtil.monthsFrom = function (from, to) {
      var yrs = (to.getFullYear() - from.getFullYear()) * 12,
        mth = (to.getMonth() - from.getMonth()),
        dates = [],
        i,
        len = yrs + mth + 1;

      for (i = 1; i < len; i++) {
        dates.push(new Date(from.getFullYear(), from.getMonth() + i, 1));
      }

      return dates;
    };

    return DateUtil;
  }

  //========================================================================================

  /**
   * Adds support for module and window use. Pass in dependency paths into the modulePaths
   * array and include the matching window object paths in the windowObjects array. The
   * windowName param expects your Class name. No need to edit anything in the if statement.
   */
  var modulesPaths = [],
    windowObjects = [],
    windowName = "DateUtil";

  if ((win.define || {}).amd) {
    win.define(modulesPaths, function () { return modular.apply(null, arguments); });
  } else if (typeof module === "object" && module.exports) {
    modulesPaths.forEach(function (el, i) { modulesPaths[i] = require(modulesPaths[i]); });
    module.exports = modular.apply(null, modulesPaths);
  } else {
    win[windowName] = modular.apply(null, windowObjects);
  }
}(this));
