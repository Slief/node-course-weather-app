const request = require('request')

const forecast = (latitude, longitude, callback) => {
    let urlOptions = '?units=si'
    urlOptions = ''
    
    const url = 'https://api.darksky.net/forecast/20a0a8105d01c42f63a50d41fe02aa69/' + latitude + ','+ longitude +'' + urlOptions;
    // console.log(url)
    // 66221    https://api.darksky.net/forecast/20a0a8105d01c42f63a50d41fe02aa69/38.88,-94.69

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to contact weather service!')
        } else if (body.error) { 
            callback('Unable to find location. Error: '+ body.code + ' - '+ body.error)
        } else {
            // console.log(body.daily.data[0])
            let alertHeader = "";
            if(body.alerts) alertHeader = body.alerts[0].title;
            let alertText = "";
            if(body.alerts) alertText = body.alerts[0].description;

            callback(undefined, body.daily.data[0].summary + ' It is currently ' + 
            Math.round(body.currently.temperature) + " degrees outside. The high today is " + Math.round(body.daily.data[0].temperatureHigh) +
            " with a low of " + Math.round(body.daily.data[0].temperatureLow) + " degrees. There is " + 
            body.daily.data[0].precipProbability * 100 + '% chance of rain.', alertHeader, alertText)

            // callback(undefined, body.daily.data[0].summary + ' It is currently ' + 
            // body.currently.temperature + " degrees outside. The high today is " + body.daily.data[0].temperatureHigh +
            // " with a low of " + body.daily.data[0].temperatureLow + " degrees. There is " + 
            // body.currently.precipProbability * 100 + '% chance of rain.', alertHeader, alertText)
        }
    })
}

module.exports = forecast 
