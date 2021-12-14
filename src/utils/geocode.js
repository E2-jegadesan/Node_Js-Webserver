const request = require("request")

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamVnYTIwMDUiLCJhIjoiY2t3dnp4emh0MW8xazJvbHM4NGcyYXZ6aCJ9.nAXhNQ-mOCaWlQRumAt-Kw&limit=1'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("please connect your network")
        }
        else if (body.features.length === 0) {
            callback("unable to find location")
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode