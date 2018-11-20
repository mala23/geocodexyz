var Request = require("request")

Request.get("https://geocode.xyz/Rueras+Graubünden?json=1?region=CH", (error, response, body) => {
  if (error) {
    return console.dir(error)
  }
  var apiResponse = JSON.parse(body)
  console.log(apiResponse.longt)
  console.log(apiResponse.latt)
})
