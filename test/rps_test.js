var sinon = require('sinon');
var mock = sinon.mock;
var stub = sinon.stub;
require('../www/js/rps');

function ok(expr, msg) {
  if (!expr) throw new Error(msg);
}

suite('Rock, Paper, Scissors:');

test('Paper beats Rock', function() {
  ok(RPS.fight(3, 1) == 1, 'Rock should not beat paper');
});

test('Rock loses to Paper', function() {
  ok(RPS.fight(1, 3) == -1, 'Paper should not lose to Rock');
});

test('Rock and Rock cause a draw', function() {
  ok(RPS.fight(1, 1) === 0, 'Rock and Rock should be a draw');
});

test('you win when ... it is a won fight', function() {
  ok(RPS.win(RPS.fight(3, 1)));
});

test('you draw when ... it is a drawn fight', function() {
  ok(RPS.draw(RPS.fight(3, 3)));
});

test('you lose when ... it is a lost fight', function() {
  ok(RPS.lose(RPS.fight(1, 3)));
});

suite('Miscellaneous refactored methods for rating change');

test('Pray for a win means rating goes down if you win, stays same if you lose', function() {
  var battle = stub(RPS, 'do_battle');
  battle.returns(1);
  ok(RPS.pray_for_a_win() == -1);
  battle.returns(0);
  ok(RPS.pray_for_a_win() === 0);
  battle.returns(-1);
  ok(RPS.pray_for_a_win() === 0);
  RPS.do_battle.restore();
});

suite('Kind rating change');

test('rating goes up if you lose the first fight', function() {
  var battle = stub(RPS, 'do_battle');
  battle.returns(-1);
  ok(RPS.kind_rating_change() == 1);
  RPS.do_battle.restore();
});

test('rating stays the same if you draw the first fight', function() {
  var battle = stub(RPS, 'do_battle');
  battle.returns(0);
  ok(RPS.kind_rating_change() === 0);
  RPS.do_battle.restore();
});

test('win twice and rating goes down', function() {
  var battle = stub(RPS, 'do_battle');
  battle.returns(1);
  ok(RPS.kind_rating_change() == -1);
  RPS.do_battle.restore();
});

test('win then do not win, rating is same', function() {
  var battle = stub(RPS, 'do_battle');
  battle.returns(1);
  var pray = stub(RPS, 'pray_for_a_win');
  pray.returns(0);
  ok(RPS.kind_rating_change() === 0);
  RPS.do_battle.restore();
  RPS.pray_for_a_win.restore();
});

suite('Mean rating change');

test('makes rating go up if you lose or draw', function() {
  var battle = stub(RPS, 'do_battle');
  battle.returns(-1);
  ok(RPS.mean_rating_change() == 1);
  battle.returns(0);
  ok(RPS.mean_rating_change() == 1);
  RPS.do_battle.restore();
});

test('rating goes down if you win twice', function() {
  var battle = stub(RPS, 'do_battle');
  battle.returns(1);
  ok(RPS.mean_rating_change() == -1);
  RPS.do_battle.restore();
});

test('rating stays the same if you win then do not win', function() {
  var battle = stub(RPS, 'do_battle');
  battle.returns(1);
  var pray = stub(RPS, 'pray_for_a_win');
  pray.returns(0);
  ok(RPS.mean_rating_change() === 0);
  RPS.do_battle.restore();
  RPS.pray_for_a_win.restore();
});
