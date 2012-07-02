require('../public/js/pool');

function ok(expr, msg) {
  if (!expr) throw new Error(msg);
}

suite('Vaulderie pool');

test('has blood from many people', function() {
  var pool = Pool.fill({'Brujaha': 5, 'Ventruand': 2});
  ok(pool.length === 7);
  // tests to check there is Brujaha five times and Ventruand twice?
});

test('can take x points of blood randomly', function() {
  var pool = Pool.fill({'Brujaha': 5, 'Ventruand': 2});
  var newPool = Pool.poolAfterVampireWithdraws(5, pool);
  ok(newPool.length === 2);
});

test('returns an object with vampName and what blood was withdrawn', function() {
  var bloodDistribution = Pool.redistribute({'Brujaha': 5, 'Ventruand': 2, 'Toreador': 2});
  for(var vampName in bloodDistribution) {
    for(var bloodSource in bloodDistribution[vampName]) {
      ok(bloodDistribution[vampName][bloodSource] >= 0);
    }
  }
});

test('formats an array of points of blood into something I will want to use later', function() {
  var array = ['A', 'A', 'A', 'B', 'B', 'C', 'C', 'C', 'C', 'C'];
  var yo = Pool.format(array, array);
  ok(yo['A'] === 3);
  ok(yo['B'] === 2);
  ok(yo['C'] === 5);
});

test('initializes an object showing all vamps who put blood in the pool', function() {
  var obj = Pool.prepare(['Brujaha', 'Brujaha', 'Ventruand', 'Toreador', 'Toreador', 'Toreador']);
  ok(obj['Brujaha'] === 0);
  ok(obj['Ventruand'] === 0);
  ok(obj['Toreador'] === 0);
});

