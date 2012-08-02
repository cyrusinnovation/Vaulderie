require('../www/js/pool.js');
require('../www/js/calculate.js');

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

function extremeCases() {
  var obj = [
    {
    'name': 'tenboy',
    'poolValue': 5,
    'ratings': {
      'zero-1': 10,
      'zero-2': 10,
      'zero-3': 10
    }
  },
  {
    'name': 'zero-1',
    'poolValue': 5,
    'ratings': {
      'tenboy': 0,
      'zero-2': 0,
      'zero-3': 0
    }
  },
  {
    'name': 'zero-2',
    'poolValue': 5,
    'ratings': {
      'tenboy': 0,
      'zero-1': 0,
      'zero-3': 0
    }
  },
  {
    'name': 'zero-3',
    'poolValue': 5,
    'ratings': {
      'tenboy': -1,
      'zero-1': -1,
      'zero-2': -1
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

test('If the rating is 10, it cannot go to 11 (sorry Spinal Tap fans)', function() {
  console.log("THIS IS SPINAL TAP!");
  var results = Calculate.unSpinalTap(extremeCases());
  ok(results[0]['ratings']['zero-1'] === 10);
  ok(results[0]['ratings']['zero-2'] === 10);
  ok(results[0]['ratings']['zero-3'] === 10);
});

test('If the rating is 0, it becomes 1 automatically', function() {
  console.log("MINIMUM IS ONE!");
  var results = Calculate.minimumRatingIsOne(extremeCases());
  ok(results[1]['ratings']['tenboy'] === 1);
  ok(results[1]['ratings']['zero-2'] === 1);
  ok(results[1]['ratings']['zero-3'] === 1);
  ok(results[2]['ratings']['tenboy'] === 1);
  ok(results[2]['ratings']['zero-1'] === 1);
  ok(results[2]['ratings']['zero-3'] === 1);
  ok(results[3]['ratings']['tenboy'] === 1);
  ok(results[3]['ratings']['zero-1'] === 1);
  ok(results[3]['ratings']['zero-2'] === 1);
});
