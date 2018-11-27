var request = require('request')
var fs = require('fs')
var readcsv = require('readcsv')

const geoCode = (lines, next) => {
    var line = lines[0]
    if(!line) {
      return next()
    }
    request.get(('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(line.Location) + ',+Switzerland' + '&key=AIzaSyCDvW_uvyPe-L_bjFrcYiWLsbOP1sbq7B4'), (error, response, body) => {

      if (error) {
        return console.dir(error)
      }

      let apiResponse = JSON.parse(body)
      console.log(line.Location)
      console.log(line.Production)
      console.log(line.Startup)
      let lat = apiResponse.results[0].geometry.location.lat
      let lng = apiResponse.results[0].geometry.location.lng
      console.log(lat)
      console.log(lng)

      fs.appendFile('water_complete.csv', line.Location + "," + line.Production + "," + line.Startup + ", " +  lat + ", " + lng + "," + "\n", function(error) {

        if (error) {
          console.log('append failed')
        } else {
          console.log('done')
        }

      })

      lines.shift()

      setTimeout( () => {
        geoCode(lines, next)
      })

    })
}

readcsv(true, './csv_source/zips/water.csv', (err, data) => {
  if(err) { return console.log(err) }
  geoCode(data, () => {
    console.log('we have data')
  })
})
