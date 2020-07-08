import * as moment from 'moment';

export class TimeConverter {
  /**
   }
   * Converts 12 hour time to 24 hour time to store in DB
   * @param {string} time 12 hour time format
   * @returns {string} 24 hour time format
   */
  static convertTo24Hr(time: string): string {
    // console.log("Time passed in: " + time);
    // use moment
    const momentTime = moment(time, 'hh:mma');
    // format and return it
    return momentTime.format('HH:mm');
  }

  /**
   * Converst 24 hour time to 12 hour time to display to user
   * @param {string} time 24 hour time format
   * @returns {string} 12 hour time format
   */
  static convertTo12Hr(time: string): string {
    // use moment
    const momentTime = moment(time, 'HH:mm');
    // format and return it
    return momentTime.format('h:mma');
  }
}
