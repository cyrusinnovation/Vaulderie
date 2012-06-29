require('../public/js/chars');

function ok(expr, msg) {
  if (!expr) throw new Error(msg);
}

suite('Character creation:');

test('two characters', function() {
  var chars = Chars.create('Brujaha', 'Ventruand');
  ok(chars['Ventruand'], 'Ventruand does not exist');
  ok(chars['Brujaha'], 'Brujaha does not exist');
});

test('a character has a bond rating towards other chars', function() {
  var chars = {
    'Brujaha': {name: 'Brujaha'},
    'Ventruand': {name: 'Ventruand'}
  };
  Chars.initialize_bond_rating(chars);
  var brujaha = chars['Brujaha'];
  ok(brujaha.rating['Ventruand'] == 0, 'Default bond rating should be 0');
});
