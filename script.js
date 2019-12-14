setInterval(function () {
  // run every 60 seconds instead of every second?
  var now = moment().format('hh:mm:ss: A');
  $("#clock").text(now);
}, 1000);

// will create all of the HR objects
function createObjects() {

}

// storage function, pushes obj array (days) to local storage
function storage(days) {

}

// checks the time, calls update every minute?
function checkTime(time) {

}

// will call pastPresentFuture(), display(); storage()
function timeUpdate() {

}

// will check and possibly update the past present future keys of the day obj
function pastPresentFuture(day) {

}

// will update the front end (somehow?)
function display() {

}

// will add user form input string (event) to day obj [] of strings
function push(day, event) {

}


// TEST JSON area
var testObject = { 'one': 1, 'two': 2, 'three': 3 };

// Put the object into storage
console.log(JSON.stringify(testObject));
localStorage.setItem('testObject', JSON.stringify(testObject));

// Retrieve the object from storage
var retrievedObject = localStorage.getItem('testObject');

console.log('retrievedObject: ', JSON.parse(retrievedObject));