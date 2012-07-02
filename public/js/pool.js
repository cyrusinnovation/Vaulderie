
Pool = {
  fill: function(obj) {
    var blood = [];
    for(var vampName in obj) {
      for(var i = 0; i < obj[vampName]; i++) {
        blood.push(vampName);
      }
    }
    return blood;
  },

  poolAfterVampireWithdraws: function(pointsToWithdraw, pool) {
    var poolCopy = pool.slice(0);
    var pointsDrunkByVamp = [];

    for(var i = 0; i < pointsToWithdraw; i++) {
      var indexOfBloodPointToRemove = Math.floor( Math.random() * (poolCopy.length - 1));
      pointsDrunkByVamp.push( poolCopy.splice(indexOfBloodPointToRemove, 1) );
    }

    return [poolCopy, pointsDrunkByVamp];
  },

  redistribute: function(poolDistribution) {  
    var completePool = this.fill(poolDistribution);
    var depletablePool = completePool.slice(0);
    var newDistribution = {};

    for(var vampName in poolDistribution) {

      var pointsToWithdraw = poolDistribution[vampName];

      var tempResults = this.poolAfterVampireWithdraws(pointsToWithdraw, depletablePool);
      var poolAfterVampireDrinks = tempResults[0];
      var pointsDrunkByVampire = tempResults[1];
      var bloodOwners = this.format(pointsDrunkByVampire, completePool);
      newDistribution[vampName] = bloodOwners;
      depletablePool = poolAfterVampireDrinks;
    }
    return newDistribution;
  },

  format: function(drawnBlood, pool) {
    var formattedContent = this.prepare(pool);
    drawnBlood.forEach(function(el) {
      formattedContent[el] += 1;
    });
    return formattedContent;
  },

  prepare: function(pool) {
    var vamps = {};
    pool.forEach(function(el) {
      vamps[el] = 0;
    });
    return vamps;
  },

}
