global.RPS = {
  beaten_by: {
    'Rock': 'Scissors',
    'Paper': 'Rock',
    'Scissors': 'Paper'
  }
  ,
  play: function() {
    Math.floor( (Math.random() * 3) + 1);
  }
  ,
  fight: function(r1, r2) {
    if(this.beaten_by[r1] == r2)
      return 'win';
    else if(r1 == r2)
      return 'draw';
    return 'lose';
  }
}
