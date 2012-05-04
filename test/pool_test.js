require('../pool');

function ok(expr, msg) {
  if (!expr) throw new Error(msg);
}

suite('Vaulderie pool');

test('has blood from many people', function() {
  var pool = Pool.fill({'Brujaha': 5, 'Ventruand': 2});
  ok(pool['Brujaha'] == 5);
  ok(pool['Ventruand'] == 2);
});
