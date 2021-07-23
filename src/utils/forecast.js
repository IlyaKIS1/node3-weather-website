const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=bb93bef180d1ecba989d3a120751257e&query=" + latitude + "," + longitude;

   
    request({url, json:true}, (error, { body }) => {

        if (error) {
            callback("Unable to connect to the internet", undefined);
        } else if (body.error) {
            callback("Unable to find location. Try another search", undefined);
        } else {
            //const {weather_descriptions: weatherDescriptions, temperature: temperature, feelslike: feelsLike} = response.body.current
            callback(undefined, body.current.weather_descriptions[0] + ". There is a currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out")
        }
    })
}

module.exports = forecast;