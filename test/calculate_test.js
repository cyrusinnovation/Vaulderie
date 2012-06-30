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

test('ye Olde Integration Test', function() {
  var bloodDrawnBackFromPool = Pool.redistribute(Calculate.getBloodGiven(myData()));
  console.log("BLOOD DRAWN BACK FROM POOL");
  console.log(bloodDrawnBackFromPool);
  var oldAndNewRatings = Calculate.generateRatings(myData(), bloodDrawnBackFromPool);
  console.log("OLD AND NEW RATINGS");
  console.log(oldAndNewRatings);
  ok(false, "The integration test does not pass.");
});
