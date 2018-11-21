var request = require('request')
var fs = require('fs')
var readcsv = require('readcsv')

const geoCode = (lines, next) => {
    var line = lines[0]
    if(!line) {
      return next()
    }
    //console.log(line.Anlage_Ort);
    request.get(('https://geocode.xyz/' + line.Anlage_PLZ + '?json=1?region=CH'), (error, response, body) => {
      
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

      lines.shift()  

      setTimeout( () => {
        geoCode(lines, next)
      },1000)

    })
}

readcsv(true, './csv_source/solar.csv', (err, data) => {
  if(err) { return console.log(err) }
  geoCode(data, () => {
    console.log('we have data')
  })
})

