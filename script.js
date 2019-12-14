// global variables
var day = []; // an array of hour objects

setInterval(function () {
  // run every 60 seconds instead of every second?
  var now = getNow();
  $("#clock").text(now);
  checkTime(now);
  display(day);
  return now;
}, 1000);

// TODO
// onclick function for edit button
// onclick function for update button

// returns the current time (string type)
function getNow() {
  var now = moment().format('HH:mm:ss: A');
  return now;
}

// returns the current hour (09 - 17) (int type)
function getHour() {
  var now = getNow();
  var hour = parseInt(now.charAt(0) + now.charAt(1));
  return hour;
}

// will create all of the HR objects
function createObjects() {
  // get HR in here?
  for (var i = 9; i < 18; i++) {
    var hour = {
      slot: i,
      past: false,
      present: false,
      future: false,
      events: [],
    }
    day.push(hour);
  }
  pastPresentFuture(day);
}

// storage function, pushes obj array (days) to local storage
function storage(day) {
  for (var i = 0; i < day.length; i++) {
    var key = "hour" + day[i].slot;
    localStorage.setItem(key, JSON.stringify(day[i]));
  }
}

// checks the time, calls update every minute?
function checkTime(now) {
  var second = parseInt(now.charAt(6) + now.charAt(7));
  if (second == 0) {
    timeUpdate();
  }
}

// will call pastPresentFuture(), display(); storage()
function timeUpdate() {
  for (var i = 0; i < day.length; i++) {
    pastPresentFuture(day[i]);
    storage(day);
    display(day); // is this call needed?
  }
}

// will check and possibly update the past present future keys of the day obj
function pastPresentFuture(hour) {
  // var hour = day[i];
  var hourNow = getHour();
  if (hour.slot < hourNow) {
    hour.past = true;
  }
  else if (hour.slot > hourNow) {
    hour.future = true;
  }
  else {
    hour.present = true;
  }
}

function pullDayFromStorage(day) {
  for (var i = 0; i < day.length; i++) {
    var key = "hour" + day[i].slot;
    var hour = JSON.parse(localStorage.getItem(key)); // will this work, or do i need two lines?
    day[i] = hour;
  }
  return day;
}


// will update the front end (somehow?)
function display(day) {
  // needs to loop through each hour, and update pastpresentfuture colors, throw up the hr slot, and list events
  for (var i = 0; i < day.length; i++) {
    var hour = day[i];
    var id = "#hour" + hour.slot;
    if (hour.past) {
      $(id).toggleClass("past");
    }
    else if (hour.present) {
      $(id).toggleClass("present");
    }
    else {
      $(id).toggleClass("future");
    }
    // $(id).h5.text(hour.slot);
  }
}

// will add user form input string (event) to hour obj [] of strings
function push(hour, event) {
  hour.events.push(event);
}

createObjects();
display(day);
for (var i = 0; i < day.length; i++) {
  console.log(day[i]);
}


// TEST JSON area
// var testObject = { 'one': 1, 'two': 2, 'three': 3 };

// Put the object into storage
// console.log(JSON.stringify(testObject));
// localStorage.setItem('testObject', JSON.stringify(testObject));

// Retrieve the object from storage
// var retrievedObject = localStorage.getItem('testObject');

// console.log('retrievedObject: ', JSON.parse(retrievedObject));