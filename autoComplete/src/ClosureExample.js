//example 1
function init() {
  var name = "Hello World"; // name is a local variable created by init
  function displayName() {
    // displayName() is the inner function, a closure
    alert(name); // use variable declared in the parent function
  }
  displayName();
}
init();

//example 2
function F1() {
  let a = 200;
  return function() {
    console.log(a);
  };
}

let f1 = F1();
let a = 100;
f1(); //200
