// format time (default "HH:MM")
function toTime(time, format) {
  if(!format) { format = "HH:MM"; }
  return time.format(format);
}

// number of minutes formatted as time
function MinutesToTime(minutes, format) {
  time = new Date(0,0,0,0,minutes,0,0);
  return toTime(time, format);
}

// format date (default "dd.mm.yyyy")
function toDate(date, format) {
  if(!format) { format = "dd.mm.yyyy"; }
  return date.format(format); 
}

// get the difference between two times
function diffTimes(start, end) {
  // get hours
  var hours = end.getHours() - start.getHours();
  // get minutes
  var minutes = end.getMinutes() - start.getMinutes();

  if (minutes < 0) {
    minutes += 60;
    hours--;
  }

  // return the new date object
  return new Date(1, 1, 1, hours, minutes, 0);
}
