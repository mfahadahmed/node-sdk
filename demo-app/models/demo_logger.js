/****************************************************************************
 * Copyright 2017, Optimizely, Inc. and contributors                   *
 *                                                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 *    http://www.apache.org/licenses/LICENSE-2.0                            *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 ***************************************************************************/

 var enums = require('../../lib/utils/enums');

 /**
  * Demo-Log-Message class.
  */
  class DemoLogMessage {
      /**
       * DempLogMessage constructor
       * @param  {Number}      timestamp
       * @param  {string}      logLevel
       * @param  {string}      logMessage
       */
      constructor(timestamp, logLevel, logMessage) {
        this.timestamp = timestamp;
        this.logLevel = logLevel;
        this.logMessage = logMessage;
      }
  }

 /**
  * Demo-App logger class.
  */
  class DemoAppLogger {
      /**
     * DemoAppLogger constructor.
     */
    constructor() {
        this.logMessages = new Array();
    }

    /**
    * Add the given message in container.
    * @param {string} logLevel   Verbosity level
    * @param {string} logMessage Message to log
    */
    log(logLevel, logMessage) {
        var timestamp = Math.floor(Date.now() / 1000);
        this.logMessages.push(new DemoLogMessage(timestamp, getLogLevelName(logLevel), logMessage));
    }

    /**
     * Get all log messages sorted by timestamp in descending order.
     */
    getSortedLogs() {
        var sortedLogs = this.logMessages.slice(0);
        return sortedLogs.sort((a, b) => b.timestamp - a.timestamp);
    }

    /**
     * Remove all messages from the container.
     */
    clearLogs() {
        this.logMessages = [];
    }
  }

  /**
 * Get log level name
 * @param  {string} logLevel Verbosity level to log at
 * @return {string} String name of log level
 */
function getLogLevelName(logLevel) {
    switch (logLevel) {
      case enums.LOG_LEVEL.DEBUG:
        return 'DEBUG';
      case enums.LOG_LEVEL.INFO:
        return 'INFO';
      case enums.LOG_LEVEL.WARNING:
        return 'WARNING';
      case enums.LOG_LEVEL.ERROR:
        return 'ERROR';
      default:
        return 'NOTSET';
    }
  }

  module.exports = DemoAppLogger;