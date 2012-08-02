//require('./rps.js');
Calculate = {
  getBloodGiven: function(vaulderie) {
    var bloodGiven = {};

    vaulderie.forEach(function (el) {
      bloodGiven[el['name']] = el['poolValue'];
    });

    return bloodGiven;
  },

  unSpinalTap: function(ratings) {
    console.log(ratings);
    ratings.forEach(function(vampire) {
      for(var rating in vampire['ratings']) {
        if(vampire['ratings'][rating] === 11) vampire['ratings'][rating] = 10;
      }
    });
    return ratings;
  },

  minimumRatingIsOne: function(ratings) {
    ratings.forEach(function(vampire) {
      for(var rating in vampire['ratings']) {
        if(vampire['ratings'][rating] < 1) vampire['ratings'][rating] = 1;
      }
    });
    return ratings;
  },
 
  generateRatings: function(startingValues, bloodFromPool) {
    var ratings = {};
    startingValues.forEach(function(el) {
      var currentVamp = el['name'];
      ratings[currentVamp] = {};
      var bloodTaken = bloodFromPool[currentVamp]; 
      for(var vamp in bloodTaken) {
        var drunkBlood = bloodTaken[vamp];

        if(vamp === currentVamp)
          continue;
        if(drunkBlood === 0)
          continue;

        if(drunkBlood > el['ratings'][vamp]) {
          ratings[currentVamp][vamp] = RPS.mean_rating_change();
        } else {
          ratings[currentVamp][vamp] = RPS.kind_rating_change();
        }

      }
    });
    return ratings;
  },

 diffRatings: function(startingValues, ratingChanges) {
    var newRatings = startingValues.slice(0);
    for(var vampire in startingValues) {
      var currentVamp = startingValues[vampire];
      var name = currentVamp['name'];
      for(var vampName in ratingChanges[name]) {
        var currentRating = newRatings[vampire]['ratings'][vampName];
        var ratingChange = ratingChanges[name][vampName];
        newRatings[vampire]['ratings'][vampName] = currentRating + ratingChange;
      }
    }
    return newRatings;
  },

  ratings: function(startingValues) {
    var bloodDrawnBackFromPool = Pool.redistribute(this.getBloodGiven(startingValues));
    var ratingChanges = this.generateRatings(startingValues, bloodDrawnBackFromPool);
    var newRatings = this.diffRatings(startingValues, ratingChanges);
    return this.minimumRatingIsOne(this.unSpinalTap(newRatings));
  }
}

