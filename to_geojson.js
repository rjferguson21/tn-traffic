var parse = require('csv-parse');
var fs = require('fs');
var GeoJSON = require('geojson');
var _ = require('lodash');

var INPUT_FILE = './data/TrfcHistDBF/TrfcHist.csv'
var formatted = [];


fs.readFile(INPUT_FILE, (err, data) => {
  if (err) throw err;
  input = data.toString();

  parse(input, {comment: '#'}, function(err, output){
    HEADERS = output.shift()
    var id = 0;
    var lat = 38;
    var long = 37;

    output.forEach(function(row) {
      var station = {
        id: row[id],
        lat: row[lat],
        long: row[long],
        title: "Kayla",
        "marker-symbol": "monument"
      };

      var start_year = 2014;
      _.range(5, 37).map(function(i) {
        station[start_year.toString()] = row[i];
        start_year--;
      });

      formatted.push(station);
    });

    console.log(JSON.stringify(GeoJSON.parse(formatted, {Point: ['lat', 'long']})));
  });
});
