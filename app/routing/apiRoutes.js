// Load all Transportation JSON Objects from js file

var autos = require("../data/transportation");

// ROUTES

module.exports = function(app) {
  
  //SHOW all available JSON Objects

  app.get("/api/autos", function(req, res) {
    res.json(autos);
  });


// POST will only add a TEMPORARY JSON Object in memory.  Will be discarded when node server is restarted

  app.post("/api/autos", function(req, res) {
    
    var bestMatch = {
      name: "",
      photo: "",
      autoDifference: Infinity
    };

    // USER INPUT
    var userData = req.body;
    var userScores = userData.scores;

    var totalDifference;

    // LOOP Thru ALL Values
    for (var i = 0; i < autos.length; i++) {
      var currentAuto = autos[i];
      totalDifference = 0;

      console.log(currentAuto.name);

      // INNER LOOP to get Matching Score
      for (var j = 0; j < currentAuto.scores.length; j++) {
        var currentautoscore = currentAuto.scores[j];
        var currentUserScore = userScores[j];

        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentautoscore));
      }

      
      if (totalDifference <= bestMatch.autoDifference) {
      
        // RESET Values
        bestMatch.name = currentAuto.name;
        bestMatch.photo = currentAuto.photo;
        bestMatch.autoDifference = totalDifference;
      }
    }

    // SAVE to JS Array
    autos.push(userData);

    // RETURN
    res.json(bestMatch);
  });
	
};