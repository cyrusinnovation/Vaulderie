RPS = {
  move_that_beats: {
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
    if(this.move_that_beats[r1] == r2)
      return 1;
    else if(r1 == r2)
      return 0;
    return -1;
  },
  do_battle: function() {
    return this.fight(this.play(), this.play());
  },
  win: function(fight) {
    return (fight == 1);
  },
  draw: function(fight) {
    return fight == 0; 
  },
  lose: function(fight) {
    return fight == -1;
  },
  kind_rating_change: function() {
    var battle = this.do_battle();
    if (this.lose(battle) ) return 1;
    if (this.draw(battle) ) return 0;
    if (this.win(battle)  ) return this.pray_for_a_win();
  },
  mean_rating_change: function() {
    var battle = this.do_battle();
    if (this.lose(battle) || this.draw(battle)) return 1;
    return this.pray_for_a_win();
  },
  pray_for_a_win: function() {
    var battle = this.do_battle();
    if (this.win(battle)) return -1;
    return 0;
  }

}


/*
 * 0 traits pulled: nothing
 *
 * traits pulled < current rating
 *  => kind_rating_change
 * traits pulled == current rating
 *  => kind_rating_change
 * traits pulled > current rating
 *  => mean_rating_change
 */
