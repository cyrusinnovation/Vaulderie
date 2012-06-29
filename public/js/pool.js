Array.prototype.diff = function(a) {
      return this.filter(function(i) {return !(a.indexOf(i) > -1);});
};

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

  withdraw: function(pointsToWithdraw, pool) {
    var poolCopy = pool.slice(0);

    for(var i = 0; i < pointsToWithdraw; i++) {
      var indexOfBloodPointToRemove = Math.floor( Math.random() * (poolCopy.length - 1));
      poolCopy.splice(indexOfBloodPointToRemove, 1);
    }

    return poolCopy;
  },

  redistribute: function(poolDistribution) {  
    var pool = this.fill(poolDistribution);
    var newDistribution = {};
    console.log("\n\n\n\n\n\n");
    console.log("TOGGLE REDIS");
    console.log(poolDistribution);
    console.log("YE OLDE POOL");
    console.log(pool);
    for(var vampName in poolDistribution) {
      console.log(vampName + " goes into the woods");
      var pointsToWithdraw = poolDistribution[vampName];
      console.log("and finds: " + pointsToWithdraw + " daisies.");
      var tempPool = this.withdraw(pointsToWithdraw, pool);
      console.log("He plucks these:");
      console.log(tempPool);
      console.log("And supposedly I get one output when I diff pool and tempPool:");
      var bloodOwners = this.format(pool.diff(tempPool), pool);
      console.log(bloodOwners);
      newDistribution[vampName] = bloodOwners;
    }
    console.log("TOGGLE REDIS");
    return newDistribution;
  },

  format: function(drawnBlood, pool) {
    var formattedContent = this.prepare(pool);
    console.log(drawnBlood);
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
  }

}
