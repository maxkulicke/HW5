$(document).ready(function () {

  // global variables, opening calls
  var day = []; // an array of hour objects
  createObjects();
  console.log(day);
  day = pullDayFromStorage(day); // this line is important, not redundant
  // deckMaker(day); bring this back
  console.log(day);

  display(day);

  var targetId = ""; // the target of an "Add Event" click

  // interval
  setInterval(function () {
    $("#clock").text(getClockDisplay());
    $("#date").text(getDateDisplay());
    checkTime(getNow());
  }, 1000);

  // onclicks

  $("#createConfirm").on("click", function () {
    clearDay(day);
    clearEventsModal();
    // displayEventsModal(getHourObjectFromId());
    createObjects();
    storage(day);
    day = pullDayFromStorage(day);
    display(day);
  })

  $(".addEvent").on("click", function () {
    targetId = event.target.id;
    clearEventsModal();
    displayEventsModal(getHourObjectFromId());
  })

  $("#eventAdd").on("click", function () {
    var event = $("#eventForm").val();
    eventArrayAdd(event);
    clearEventsModal();
    displayEventsModal(getHourObjectFromId());
  });

  $("#save").on("click", function () {
    storage(day);
    day = pullDayFromStorage(day);
    display(day);
  });

  // utility functions

  // clears the day array, pushes it to storage
  function clearDay(day) {
    for (var i = 0; i < day.length; i++) {
      var key = "hour" + day[i].slot;
      localStorage.removeItem(key);
    }
    storage(day);
    day = pullDayFromStorage(day);
  }

  // returns the current time (string type)
  function getNow() {
    var now = moment().format('HH:mm:ss: A');
    return now;
  }

  function getDateDisplay() {
    var now = moment().format('MMMM Do YYYY');;
    return now;
  }

  function getClockDisplay() {
    var now = moment().format('h:mm:ss a');;
    return now;
  }

  // returns the current hour (09 - 17) (int type)
  function getHour() {
    var hour = parseInt(getNow().charAt(0) + getNow().charAt(1));
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
    // return day;
  }

  // storage function, pushes obj array (day) to local storage
  function storage(day) {
    for (var i = 0; i < day.length; i++) {
      var key = "hour" + day[i].slot;
      localStorage.setItem(key, JSON.stringify(day[i]));
    }
  }

  // pulls the day array as it was last stored in local storage
  function pullDayFromStorage(day) {
    var storedDay = [];
    for (var i = 0; i < day.length; i++) {
      var key = "hour" + day[i].slot;
      var hour = JSON.parse(localStorage.getItem(key)); // will this work, or do i need two lines?
      storedDay.push(hour);
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
    day = pullDayFromStorage(day);
    pastPresentFuture(day);
    storage(day);
    display(day);
  }

  // will check and update the past present future keys of the day obj, color each block accordingly
  function pastPresentFuture(day) {
    for (var i = 0; i < day.length; i++) {
      var hour = day[i];
      var id = "#hour" + hour.slot;
      pastPresentFutureSort(hour, id);
    }
  }

  function pastPresentFutureSort(hour, id) {
    if (hour.slot < getHour()) {
      hour.past = true;
      $(id).css("background-color", "rgba(158, 167, 255, 0.418)")
    }
    else if (hour.slot > getHour()) {
      hour.future = true;
      $(id).css("background-color", "rgba(67, 67, 202, 0.555)")
    }
    else {
      hour.present = true;
      $(id).css("background-color", "rgba(215, 78, 228, 0.377)")
    }
  }

  // this function is in charge of all of the hour cards and events lists
  function display(day) {
    pastPresentFuture(day);
    for (var i = 0; i < day.length; i++) {
      var hour = day[i];
      var id = "#hour" + hour.slot;
      var slot = id + "slot"
      $(slot).text(hourDisplayMaker(hour) + ":00");
      eventsListAppender(hour, id);
    }
  }

  function hourDisplayMaker(hour) {
    var hourDisplay = hour.slot
    if (hourDisplay > 12) {
      hourDisplay -= 12;
    }
    return hourDisplay;
  }

  function eventsListAppender(hour, id) {
    var eventsListId = id + "events";
    $(eventsListId).empty();
    for (var j = 0; j < hour.events.length; j++) {
      var event = hour.events[j];
      $(eventsListId).append($("<li>").append(event));
    }
  }

  // adds an event string to object events array
  function eventArrayAdd(event) {
    var hour = getHourObjectFromId();
    pushEvent(hour, event);
    displayEventsModal(hour);
  }

  // finds the object targeted by the add event on click
  function getHourObjectFromId() {
    var hourSlot = parseInt(targetId.charAt(4) + targetId.charAt(5))
    // day = pullDayFromStorage(day);
    for (var i = 0; i < day.length; i++) {
      if (hourSlot === day[i].slot) {
        return day[i];
      }
    }
  }

  // clears the old events list display, reappends the entire list
  function displayEventsModal(hour) {
    // $("#eventsListModal").empty();
    clearEventsModal();
    for (var i = 0; i < hour.events.length; i++) {
      var event = hour.events[i];
      $("#eventsListModal").append($("<li>").append(event));
    }
  }

  function clearEventsModal() {
    $("#eventsListModal").empty();
    $("#eventForm").empty();
    $("#eventForm").text("");
  }

  // will add user form input string (event) to hour obj [] of strings
  function pushEvent(hour, event) {
    hour.events.push(event);
  }

  // the appenders
  function deckMaker(day) {
    for (var i = 0; i < day.length; i++) { // make this a forEach?
      cardMaker(day[i]);
    }
  }

  function cardMaker(hour) {
    var cardDiv = divMaker();
    innerCardMaker(cardDiv, hour.slot);
    buttonMaker(cardDiv, hour.slot);
  }


  function divMaker() {
    var deck = $("#cardDeck"); // can this line be eliminated?
    var divClassCard = deck.append($("<div></div>")
      .addClass("card")
    );
    var divClassCardBody = divClassCard.append($("<div></div>")
      .addClass("card-body hourCard")
    );
    return divClassCardBody;
  }

  function innerCardMaker(div, hourSlot) {
    div.append([
      $("<h5></h5>")
        .attr({
          "class": "card-title",
          "id": "hour" + hourSlot + "slot",
        }),
      $("<ul></ul>")
        .attr({
          "class": "card-text",
          "id": "hour" + hourSlot + "events",
        }),
    ]);
  }

  function buttonMaker(div, hourSlot) {
    div.append($("<button>")
      .attr({
        "type": "button",
        "class": "btn btn-dark float-right addEvent",
        "id": "hour" + hourSlot + "add",
        "data-toggle": "modal",
        "data-target": "#editModal",
      })
    );
    $("#hour" + hourSlot + "add").text("Add Event");
  }

})