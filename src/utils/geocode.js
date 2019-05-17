const request = require('request')


const geocode = (address, callback) => {
    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGVkd2FyZHMwMSIsImEiOiJjanZlOTlnMDUwbGdkM3lwNjY1YWdzdDRpIn0.YwUVpKPe2RGj0gJ8rxJDhw&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to contact mapping service!')
            // callback('Unable to contact mapping service!', undefined)  // the same as above
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, {
                latitude:   body.features[0].center[1],
                longitude:  body.features[0].center[0],
                location:   body.features[0].place_name
            })
        }

    })
}

module.exports = geocode