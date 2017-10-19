"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// jshint esversion:6, node:true

/**
 * @author Leandro Silva
 * @copyright 2016-2017 Leandro Silva (http://grafluxe.com)
 * @license MIT
 *
 * @classdesc Originally written to help work with calendar data, this class helps parse, format, and
 *            transform dates. It supports both Node and browser use.
 */

var Datelish = function () {
  function Datelish() {
    _classCallCheck(this, Datelish);
  }

  _createClass(Datelish, null, [{
    key: "monthAsNames",

    /**
     * Returns an array of month names.
     * @param   {Boolean} short=false Whether to return full month names or the 3 letter abbreviated versions.
     * @returns {Array}
     */
    value: function monthAsNames() {
      var short = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

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

  }, {
    key: "daysPerMonth",
    value: function daysPerMonth(month, year) {
      var arr = [],
          i = void 0,
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

  }, {
    key: "daysTotal",
    value: function daysTotal(month, year) {
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

  }, {
    key: "years",
    value: function years(from, to) {
      var arr = [],
          i = void 0,
          diff = void 0;

      if (from < 1000 || from > 9999 || typeof to === "number" && (to < 1000 || to > 9999)) {
        throw new Error("The years method expects a four digit year.");
      }

      if (typeof to === "string") {
        to = from + parseInt(to, 10);
      }

      diff = to - from;

      if (diff < 0) {
        diff = 0;
      }

      for (i = 0; i <= diff; i++) {
        arr.push(from + i);
      }

      return arr;
    }

    /**
     * Returns the current year (in four digit format).
     * @returns {Number}
     */

  }, {
    key: "currYear",
    value: function currYear() {
      return new Date().getFullYear();
    }

    /**
     * Returns the index (0–11) for a given month.
     * @param   {String} month The month name (as either a three letter abbreviation or the full name in American English).
     * @returns {Number}
     */

  }, {
    key: "monthNameToIndex",
    value: function monthNameToIndex(month) {
      month = month.substr(0, 1).toUpperCase() + month.substr(1);

      return Datelish.monthAsNames(month.length <= 3 ? true : false).indexOf(month);
    }

    /**
     * Returns the name for a given month index (0–11).
     * @param   {Number}   index       The index to search.
     * @param   {Boolean=} short=false Whether to return full a month name or the 3 letter abbreviated version.
     * @returns {String}
     */

  }, {
    key: "monthIndexToName",
    value: function monthIndexToName(index) {
      var short = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return Datelish.monthAsNames(short)[index];
    }

    /**
     * Returns a boolean determining whether a given date is today.
     * @param   {Date} date The date to check against.
     * @returns {Boolean}
     */

  }, {
    key: "todayIs",
    value: function todayIs(date) {
      var today = new Date();

      return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
    }

    /**
     * Returns a boolean determining whether a given date is between two dates.
     * @param   {Date}     date                 The date to check against.
     * @param   {Date}     startDate            The start date.
     * @param   {Date}     endDate              The end date.
     * @param   {Boolean=} includeEndDate=false Whether to include the end date.
     * @returns {Boolean}
     */

  }, {
    key: "dateIsBetween",
    value: function dateIsBetween(date, startDate, endDate) {
      var includeEndDate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      return date >= startDate && (includeEndDate ? date <= endDate : date < endDate);
    }

    /**
     * Returns a boolean determining whether a given date is after a date.
     * @param   {Date}    date        The date to check against.
     * @param   {Date}    isAfterDate The date to compare against.
     * @returns {Boolean}
     */

  }, {
    key: "dateIsAfter",
    value: function dateIsAfter(date, isAfterDate) {
      return date > isAfterDate;
    }

    /**
     * Returns a boolean determining whether given date is before a date.
     * @param   {Date}    date         The date to check against.
     * @param   {Date}    isBeforeDate The date to compare against.
     * @returns {Boolean}
     */

  }, {
    key: "dateIsBefore",
    value: function dateIsBefore(date, isBeforeDate) {
      return date < isBeforeDate;
    }

    /**
     * Returns a date in ISO 8601 format (YYYY-MM-DDThh:mm:ssTZD).
     * @param   {Date}   date The date to check against.
     * @returns {String}
     */

  }, {
    key: "toISO8601",
    value: function toISO8601(date) {
      var dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
          time = "T" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
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

  }, {
    key: "toLittleEndian",
    value: function toLittleEndian(date) {
      var divider = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
      var prepend0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

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

  }, {
    key: "fromLittleEndian",
    value: function fromLittleEndian(dateStr) {
      var match = dateStr.match(/\d+/g);

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

  }, {
    key: "toMiddleEndian",
    value: function toMiddleEndian(date) {
      var divider = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
      var prepend0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (prepend0) {
        return Datelish.prepend0(date.getMonth() + 1) + divider + Datelish.prepend0(date.getDate()) + divider + date.getFullYear();
      } else {
        return date.getMonth() + 1 + divider + date.getDate() + divider + date.getFullYear();
      }
    }

    /**
     * Returns a date from a middle-endian formatted string (MM/DD/YYYY).
     * @param   {String} dateStr The date to check against.
     * @returns {Date}
     */

  }, {
    key: "fromMiddleEndian",
    value: function fromMiddleEndian(dateStr) {
      var match = dateStr.match(/\d+/g);

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

  }, {
    key: "toBigEndian",
    value: function toBigEndian(date) {
      var divider = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
      var prepend0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

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

  }, {
    key: "fromBigEndian",
    value: function fromBigEndian(dateStr) {
      var match = dateStr.match(/\d+/g);

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

  }, {
    key: "toMinutes",
    value: function toMinutes(sec) {
      var prepend0 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var mins = String(sec / 60),
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

  }, {
    key: "now",
    value: function now() {
      return new Date();
    }

    /**
     * Returns today.
     * @returns {Date}
     */

  }, {
    key: "today",
    value: function today() {
      var now = new Date();

      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    /**
     * Returns tomorrow.
     * @returns {Date}
     */

  }, {
    key: "tomorrow",
    value: function tomorrow() {
      return Datelish.daysFromDate(Datelish.today(), 1);
    }

    /**
     * Returns yesterday.
     * @returns {Date}
     */

  }, {
    key: "yesterday",
    value: function yesterday() {
      return Datelish.daysFromDate(Datelish.today(), -1);
    }

    /**
     * Returns a number of days before/after a given date.
     * @param   {Date}   date The date to check against.
     * @param   {Number} n    The number of days to advance/retract. Use a negative number to go back days.
     * @returns {Date}
     */

  }, {
    key: "daysFromDate",
    value: function daysFromDate(date, n) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
    }

    /**
     * Returns the previous month of a given date.
     * @param   {Date=} date=null The date to check against. If null, date will equal today.
     * @returns {Date}
     */

  }, {
    key: "prevMonth",
    value: function prevMonth() {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      date = date || Datelish.today();

      return new Date(date.getFullYear(), date.getMonth() - 1, 1);
    }

    /**
     * Returns the next month of a given date.
     * @param   {Date=} date=null The date to check against. If null, date will equal today.
     * @returns {Date}
     */

  }, {
    key: "nextMonth",
    value: function nextMonth() {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      date = date || Datelish.today();

      return new Date(date.getFullYear(), date.getMonth(), Datelish.daysTotal(date.getMonth(), date.getFullYear()) + 1);
    }

    /**
     * Returns a string with a prepended "0" (if the value is less than 10).
     * @param   {Number|String} val The string/number to check against.
     * @returns {String}
     */

  }, {
    key: "prepend0",
    value: function prepend0(val) {
      if (String(val).indexOf(".") > -1 || isNaN(val)) {
        throw new Error("The prepend0 method expects a whole number.");
      }

      val = Number(val);

      return val < 10 ? "0" + val : val;
    }

    /**
     * Returns the number of days between two dates.
     * @param   {Date}   startDate The start date.
     * @param   {Date}   endDate   The end date.
     * @returns {Number}
     */

  }, {
    key: "dayCount",
    value: function dayCount(startDate, endDate) {
      var days = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24;

      return days + (startDate.getTimezoneOffset() > endDate.getTimezoneOffset() ? 1 : 0);
    }

    /**
     * Returns an array of months from the given dates.
     * @param   {Date}     startDate              The start date.
     * @param   {Date}     endDate                The end date.
     * @param   {Boolean=} includeStartDate=false Whether to include the start date in the output.
     * @returns {Array}
     */

  }, {
    key: "monthsFrom",
    value: function monthsFrom(startDate, endDate) {
      var includeStartDate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var yrs = (endDate.getFullYear() - startDate.getFullYear()) * 12,
          mth = endDate.getMonth() - startDate.getMonth(),
          dates = [],
          i = includeStartDate ? 0 : 1,
          len = yrs + mth + 1;

      for (i; i < len; i++) {
        dates.push(new Date(startDate.getFullYear(), startDate.getMonth() + i, 1));
      }

      return dates;
    }
  }]);

  return Datelish;
}();

// Support CJS/Node


if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
  module.exports = Datelish;
}
