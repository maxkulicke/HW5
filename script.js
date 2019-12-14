setInterval(function () {
  // run every 60 seconds instead of every second?
  var now = moment().format('hh:mm:ss: A');
  $("#clock").text(now);
}, 1000);

// TEST JSON area
var testObject = { 'one': 1, 'two': 2, 'three': 3 };

// Put the object into storage
console.log(JSON.stringify(testObject));
localStorage.setItem('testObject', JSON.stringify(testObject));

// Retrieve the object from storage
var retrievedObject = localStorage.getItem('testObject');

console.log('retrievedObject: ', JSON.parse(retrievedObject));