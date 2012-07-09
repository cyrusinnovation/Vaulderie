/*
 * this.characters: {
 * 'Brujaha': {
 *   name: 'Brujaha', 
 *   rating: {'Ventruand': 0} },
 * 'Ventruand': {
 *  name: 'Ventruand',
 *  rating: {'Brujaha': 0}}
 * }
 *
*/

Chars = {
  characters: {},

  create: function(x) { // I need to give one required arg and then I can use 'arguments' dynamically properly, it seems
    for(var i in arguments)
      this.characters[arguments[i]] = {name: arguments[i]};
    this.initialize_bond_rating();
    return this.characters;
  },

  initialize_bond_rating: function(characters) {
    for(var i in characters)
    {
      var vamp = characters[i];
      vamp['rating'] = {};
      for(var j in characters)
      {
        var bonded = characters[j];
        if(vamp.name == bonded.name) continue;
        vamp.rating[bonded.name] = 0;
      }
    }
  },

}
