require('./rps.js');
Calculate = {
  getBloodGiven: function(vaulderie) {
    var bloodGiven = {};

    vaulderie.forEach(function (el) {
      bloodGiven[el['name']] = el['poolValue'];
    });

    return bloodGiven;
  },

  generateRatings: function(startingValues, bloodFromPool) {
    var ratings = {};
    startingValues.forEach(function(el) {
      var currentVamp = el['name'];
      ratings[currentVamp] = {};
      //console.log(bloodFromPool);
      var bloodTaken = bloodFromPool[currentVamp]; 
      for(var vamp in bloodTaken) {
        var drunkBlood = bloodTaken[vamp];

      //  console.log(drunkBlood);
        if(vamp === currentVamp)
          continue;

        if(drunkBlood > el['ratings'][vamp]) {
          ratings[currentVamp][vamp] = RPS.mean_rating_change();
        } else {
          ratings[currentVamp][vamp] = RPS.kind_rating_change();
        }

      }
    });
    return ratings;
  }

};

