var sinon = require('../node_modules/sinon/lib/sinon.js');

var mock = sinon.mock;
var stub = sinon.stub;

function ok(expr, msg) {
  if (!expr) throw new Error(msg);
}

suite('Rating goes up');

var rockPaperScissors = {
  cast: function() {
  var result = Math.floor((Math.random()*3)+1);
  if(result == 1)
    return "win";
  if(result == 2)
    return "tie";
  if(result == 3)
    return "lose";
  }
};


test('j', function() {
  var rps = stub(rockPaperScissors, 'cast');
  rps.returns("win");
  ok(rps() === "win");
  var arr = [1,2,3];
  ok(arr.length === 3);
});



