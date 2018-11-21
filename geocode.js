var Request = require('request')
var fs = require('fs')
var readcsv = require('readcsv')

readcsv(true, './csv_source/solar.csv', (err, data) => {
  if(err) { return console.log(err) }
  data.forEach(line => {

    setTimeout(function() {
    //console.log(line.Anlage_Ort);
    Request.get(('https://geocode.xyz/' + line.Anlage_PLZ + '?json=1?region=CH'), (error, response, body) => {
      
      if (error) {
        return console.dir(error)
      }

      var apiResponse = JSON.parse(body)

      console.log(apiResponse.latt)
      console.log(apiResponse.longt)

      fs.appendFile('coordinates.csv', line.Anlage_Ort + ", " + line.Anlage_PLZ + ", " +  apiResponse.latt + ", " + apiResponse.longt + "," + "\n", function(error) {

        if (error) {
          console.log('append failed')
        } else {
          console.log('done')
        }

      })
    })
    }, 1000)
  })
})

