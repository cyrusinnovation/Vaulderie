require('../rps');

function ok(expr, msg) {
  if (!expr) throw new Error(msg);
}

suite('Rock, Paper, Scissors:\n');

test('Paper beats Rock', function() {
  ok(RPS.fight('Paper', 'Rock') == 'win', 'Rock should not beat paper');
});

test('Rock loses to Paper', function() {
  ok(RPS.fight('Rock', 'Paper') == 'lose', 'Paper should not lose to Rock');
});

test('Rock and Rock cause a draw', function() {
  ok(RPS.fight('Rock', 'Rock') == 'draw', 'Rock and Rock should be a draw');
});
