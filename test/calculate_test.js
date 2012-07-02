require('../public/js/pool.js');
require('../public/js/calculate.js');

function ok(expr, msg) {
  if (!expr) throw new Error(msg);
}

function myData() {
  var obj = [
    { 
    'name': 'Brujaha',
    'poolValue': 5,
    'ratings': {
      'Toreador': 4,
      'Ventruand': 8
    },
  },
  {
    'name': 'Toreador',
    'poolValue': 2,
    'ratings': {
      'Brujaha': 1,
      'Ventruand': 5
    }
  },
  {
    'name': 'Ventruand',
    'poolValue': 6,
    'ratings': {
      'Toreador': 3,
      'Brujaha': 1,
    }
  }
  ];
  return obj;
}

suite('Calculate');

test('returns an object with each Vampire and the blood points put in the pool', function() {
  var donors = Calculate.getBloodGiven(myData());
  ok(donors['Brujaha'] === 5);
  ok(donors['Toreador'] === 2);
  ok(donors['Ventruand'] === 6);
});

test('returns an object with old and new bond ratings', function() {
  var ratingChanges = {'Brujaha': {'Ventruand': 1, 'Toreador': 0},
                   'Toreador': {'Brujaha': -1, 'Ventruand': 1},
                    'Ventruand': {'Brujaha': 0, 'Toreador': 1}};
  var newRatings = Calculate.diffRatings(myData(), ratingChanges);
  ok(newRatings[0]['ratings']['Ventruand'] === 9);
  ok(newRatings[0]['ratings']['Toreador'] === 4);
  ok(newRatings[1]['ratings']['Ventruand'] === 6);
  ok(newRatings[1]['ratings']['Brujaha'] === 0);
  ok(newRatings[2]['ratings']['Toreador'] === 4);
  ok(newRatings[2]['ratings']['Brujaha'] === 1);
});

test('ye Olde Integration Test', function() {
  var newRatings = Calculate.ratings(myData());
  ok(true, "Let me know if you figure out how to write this test");
});
