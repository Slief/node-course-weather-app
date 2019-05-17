const request = require('request')

const forecast = (latitude, longitude, callback) => {
    let urlOptions = '?units=si'
    urlOptions = ''
    const url = 'https://api.darksky.net/forecast/20a0a8105d01c42f63a50d41fe02aa69/' + latitude + ','+ longitude +'' + urlOptions
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to contact weather service!')
        } else if (body.error) {
            callback('Unable to find location. Error: '+ body.code + ' - '+ body.error)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees outside. There is ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast 
