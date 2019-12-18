$(document).ready(function () {

  // global variables, opening calls
  var day = []; // an array of hour objects
  createObjects();
  day = pullDayFromStorage(day);
  // storageConsoleLog();
  display(day);

  // storageConsoleLog(); // clear later
  for (var i = 0; i < day.length; i++) {
    console.log(day[i]);
  }

  var targetId = ""; // the target of an "Add Event" click

  // interval
  setInterval(function () {
    var now = getNow();
    $("#clock").text(now);
    checkTime(now);
    return now;
  }, 1000);

  // onclicks

  $("#createDay").on("click", function () {
    clearDay(day);
    createObjects();
    storage(day);
    display(day);
  })

  // $("#clearDay").on("click", function () {
  //   clearDay(day);
  //   $("cardDiv").empty();
  //   display(day);
  // })

  $(".addEvent").on("click", function () {
    targetId = event.target.id;
    var hour = getHourObjectFromId();
    displayEventsModal(hour);
  })

  $("#eventAdd").on("click", function () {
    var event = $("#eventForm").val();
    eventArrayAdd(event);
  });

  $("#save").on("click", function () {
    storage(day);
    display(day);
  });

  // utility functions

  // for testing
  function storageConsoleLog() {
    // console.log("storage console log:")
    var newDay = pullDayFromStorage(day);
    newDay.forEach(function (element) {
      console.log("storage console log:")
      console.log(element);
    });
  }

  // clears the day array, pushes it to storage
  function clearDay(day) {
    for (var i = 0; i < day.length; i++) {
      var key = "hour" + day[i].slot;
      localStorage.removeItem(key);
      // console.log("in storage(): " + "key: " + key + " string: " + JSON.stringify(day[i]));
    }
    storage(day);
  }

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

  // will create all of the Hour objects
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

  // storage function, pushes obj array (day) to local storage
  function storage(day) {
    console.log("storage() called!");
    for (var i = 0; i < day.length; i++) {
      var key = "hour" + day[i].slot;
      localStorage.setItem(key, JSON.stringify(day[i]));
      // console.log("in storage(): " + "key: " + key + " string: " + JSON.stringify(day[i]));
    }
    storageConsoleLog(); //clear later
  }

  // pulls the day array as it was last stored in local storage
  function pullDayFromStorage(day) {
    console.log("pullDayFromStorage() called!")
    // storageConsoleLog();
    var storedDay = [];
    for (var i = 0; i < day.length; i++) {
      var key = "hour" + day[i].slot;
      var hour = JSON.parse(localStorage.getItem(key)); // will this work, or do i need two lines?
      console.log(hour);
      storedDay.push(hour);
      console.log("day[] log from pullDayFromStorage() " + day[i]);
    }
    return storedDay;
  }

  // checks the time, calls timeUpdate every minute
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
      // each of these a separate function?
      if (hour.slot < hourNow) {
        hour.past = true;
        $(id).css("background-color", "rgba(158, 167, 255, 0.418)")
        // var buttonId = id + "add";
        // $(buttonId).hide();
      }
      else if (hour.slot > hourNow) {
        hour.future = true;
        $(id).css("background-color", "rgba(67, 67, 202, 0.555)")
      }
      else {
        hour.present = true;
        $(id).css("background-color", "rgba(215, 78, 228, 0.377)")
      }
    }
  }

  // will update the front end
  // CLEAN THIS FUNCTION!
  function display(day) {
    pastPresentFuture(day);
    // needs to loop through each hour and throw up the hr slot, and list events
    // should display be higher order, and have two smaller functions for the events and hr slot?
    for (var i = 0; i < day.length; i++) {
      var hour = day[i];
      var id = "#hour" + hour.slot;
      var slot = id + "slot"
      // ugly in here, clean up!
      var hourDisplay = hour.slot
      if (hourDisplay > 12) {
        hourDisplay -= 12;
      }
      var nextHourDisplay = hourDisplay + 1;
      if (nextHourDisplay > 12) {
        nextHourDisplay -= 12;
      }
      $(slot).text(hourDisplay + " - " + nextHourDisplay);
      var eventsListId = id + "events";
      $(eventsListId).empty();
      for (var j = 0; j < hour.events.length; j++) {
        var event = hour.events[j];
        $(eventsListId).append($("<li>").append(event));
      }
    }
  }

  // adds an event string to object events array
  function eventArrayAdd(event) {
    var hour = getHourObjectFromId()
    pushEvent(hour, event);
    displayEventsModal(hour);
  }

  // finds the object targeted by the add event on click
  function getHourObjectFromId() {
    var hourSlot = parseInt(targetId.charAt(4) + targetId.charAt(5))
    for (var i = 0; i < day.length; i++) {
      if (hourSlot === day[i].slot) {
        return day[i];
      }
    }
  }

  // clears the old events list display, reappends the entire list
  function displayEventsModal(hour) {
    $("#eventsListModal").empty();
    for (var i = 0; i < hour.events.length; i++) {
      var event = hour.events[i];
      $("#eventsListModal").append($("<li>").append(event));
    }
  }

  // will add user form input string (event) to hour obj [] of strings
  function pushEvent(hour, event) {
    hour.events.push(event);
  }

  // TEST JSON area
  // var testObject = { 'one': 1, 'two': 2, 'three': 3 };

  // Put the object into storage
  // console.log(JSON.stringify(testObject));
  // localStorage.setItem('testObject', JSON.stringify(testObject));

  // Retrieve the object from storage
  // var retrievedObject = localStorage.getItem('testObject');

  // console.log('retrievedObject: ', JSON.parse(retrievedObject));
})