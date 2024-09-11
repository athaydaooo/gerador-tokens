import moment from "moment";

class DateManager {
  addMinutes(date:Date, minutes: number){
    return moment(date).add(minutes,'minutes').toDate()
  }
}

export default DateManager