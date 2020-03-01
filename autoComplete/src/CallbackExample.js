function doWork(subject, callback) {
  alert(`Starting my ${subject} work.`);
  callback();
}
function alertFinished() {
  alert("Finished my work");
}
doWork("math", alertFinished);
