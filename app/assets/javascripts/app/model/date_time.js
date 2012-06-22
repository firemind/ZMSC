// format time (default "HH:MM")
function toTime(time, format) {
  if(!format) { format = "HH:MM"; }
  return time.format(format);
}

function parseDates(data) {
  var copy = $.extend({}, data);
  if(!(copy.date instanceof Date)) {
    copy.date = getDate(copy.date);
  }
  if(!(copy.start_time instanceof Date)) {
    copy.start_time= getTime(copy.start_time);
  }
  if(copy.end_time && !(copy.end_time instanceof Date)) {
    copy.end_time= getTime(copy.end_time);
  }
  return copy;
}

function getDate(str, format) {
  if(!format){ format = ['dd.MM.yyyy', 'd.M.yyyy', 'yyyy-MM-dd']; }
  return Date.parseExact(str, format);
}

function getTime(str, format) { 
  if(!format){ format = ['HH:mm', 'H:m']; }
  return Date.parseExact(str, format);
}

// number of minutes formatted as time
function MinutesToTime(minutes) {
  var hours = Math.floor(minutes/60);
  minutes = minutes - hours * 60;
  if(minutes < 10) { minutes = "0" + minutes.toString(); }
  return hours + ":" + minutes;
}

// format date (default "dd.mm.yyyy")
function toDate(date, format) {
  if(!format) { format = "dd.mm.yyyy"; }
  return date.format(format); 
}

// get the difference between two times
function diffTimes(start, end) {
  if(end == null) {
    return new Date(0);
  } else {
    // get hours
    var hours = end.getHours() - start.getHours();
    // get minutes
    var minutes = end.getMinutes() - start.getMinutes();

    if (minutes < 0) {
      minutes += 60;
      hours--;
    }

    // return the new date object
    return new Date(0, 0, 0, hours, minutes, 0);
  }
}
