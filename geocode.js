var request = require('request')
var fs = require('fs')
var readcsv = require('readcsv')

const geoCode = (lines, next) => {
    var line = lines[0]
    if(!line) {
      return next()
    }
    console.log(encodeURIComponent(line.Location))
    request.get(('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(line.Location) + ',+Switzerland' + '&key=AIzaSyCDvW_uvyPe-L_bjFrcYiWLsbOP1sbq7B4'), (error, response, body) => {

      if (error) {
        return console.dir(error)
      }

      let apiResponse = JSON.parse(body)
      console.log(apiResponse)
      let zip = apiResponse.results[0].address_components[5]

      console.log(zip)
      /*
      fs.appendFile('data_zip.csv', line.Ort + "," + line.PLZ + ", " +  lat + ", " + lng + "," + "\n", function(error) {

        if (error) {
          console.log('append failed')
        } else {
          console.log('done')
        }

      })
      */

      lines.shift()

      setTimeout( () => {
        geoCode(lines, next)
      })

    })
}

readcsv(true, './csv_source/zips/water_data.csv', (err, data) => {
  if(err) { return console.log(err) }
  geoCode(data, () => {
    console.log('we have data')
  })
})
