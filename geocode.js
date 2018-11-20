var Request = require("request")
var fs = require("fs")

Request.get("https://geocode.xyz/Rueras+Graubünden?json=1?region=CH", (error, response, body) => {
  
  if (error) {
    return console.dir(error)
  }

  var apiResponse = JSON.parse(body)

  console.log(apiResponse.longt)
  console.log(apiResponse.latt)

  fs.appendFile("coordinates.csv", apiResponse.longt + ", " + apiResponse.latt + "," + "\n", function(error) {
    if (error) {
      console.log("append failed")
    } else {
      console.log("done")
    }
  })
})
