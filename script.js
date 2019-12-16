// global variables
var day = []; // an array of hour objects
var targetId = ""; // the target of an "Add Event" click

setInterval(function () {
  var now = getNow();
  $("#clock").text(now);
  checkTime(now);
  return now;
}, 1000);

// TODO
// onclick function for edit button
// onclick function for update button
// onclicks for modal buttons

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

// checks the time, calls update every minute
function checkTime(now) {
  var second = parseInt(now.charAt(6) + now.charAt(7));
  if (second == 0) {
    timeUpdate();
  }
}

// will call pastPresentFuture(), display(); storage()
function timeUpdate() {
  pastPresentFuture(day);
  storage(day);
  display(day);
}

// will check and update the past present future keys of the day obj, color each block accordingly
function pastPresentFuture(day) {
  var hourNow = getHour();
  for (var i = 0; i < day.length; i++) {
    var hour = day[i];
    var id = "#hour" + hour.slot;
    if (hour.slot < hourNow) {
      hour.past = true;
      $(id).css("background-color", "rgba(11, 92, 11, 0.418)")
    }
    else if (hour.slot > hourNow) {
      hour.future = true;
      $(id).css("background-color", "rgba(67, 67, 202, 0.555)")
    }
    else {
      hour.present = true;
      $(id).css("background-color", "rgba(180, 1, 1, 0.377)")
    }
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


// will update the front end
function display(day) {
  pastPresentFuture(day);
  // needs to loop through each hour and throw up the hr slot, and list events
  // should display be higher order, and have two smaller functions for the events and hr slot?
  for (var i = 0; i < day.length; i++) {
    var hour = day[i];
    var id = "#hour" + hour.slot;
    var slot = id + "slot"
    $(slot).text(hour.slot);
    var eventsListId = id + "events";
    $(eventsListId).empty();
    for (var j = 0; j < hour.events.length; j++) {
      var event = hour.events[j];
      $(eventsListId).append($("<li>").append(event));
    }
  }
}

$(".addEvent").on("click", function () {
  targetId = event.target.id;
  var hour = getHourObjectFromId();
  displayEventsModal(hour);
})

$("#eventAdd").on("click", function () {
  var event = $("#eventForm").val();
  eventArrayAdd(event);
});

$("#save").on("click", function() {
  storage(day);
  display(day);
});

function eventArrayAdd(event) {
  var hour = getHourObjectFromId()
  pushEvent(hour, event);
  displayEventsModal(hour);
}

function getHourObjectFromId() {
  var hourSlot = parseInt(targetId.charAt(4) + targetId.charAt(5))
  for (var i = 0; i < day.length; i++) {
    if (hourSlot === day[i].slot) {
      return day[i];
    }
  }
}

function displayEventsModal(hour) {
  $("#eventsListModal").empty();
  // about to move this line!!!, stop here when undoing!!!
  for (var i = 0; i < hour.events.length; i++) {
    var event = hour.events[i];
    $("#eventsListModal").append($("<li>").append(event));
}
}

// will add user form input string (event) to hour obj [] of strings
function pushEvent(hour, event) {
  hour.events.push(event);
}

// TEST CALLS
createObjects();
display(day);


// TEST JSON area
// var testObject = { 'one': 1, 'two': 2, 'three': 3 };

// Put the object into storage
// console.log(JSON.stringify(testObject));
// localStorage.setItem('testObject', JSON.stringify(testObject));

// Retrieve the object from storage
// var retrievedObject = localStorage.getItem('testObject');

// console.log('retrievedObject: ', JSON.parse(retrievedObject));