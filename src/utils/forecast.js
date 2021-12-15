const request = require('request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=93c0cd53d8352c5635dd0b2e8c80a1ce&query=' + address + '&units=m'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('please connect your network', undefined)
        } else if (body.error) {
            callback('Unable to find location Try Another..!', undefined)
        } else {
            callback(undefined, {
                localtime: body.location.localtime,
                climate: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                Chance_of_rain: body.current.precip
            })
        }
    })
}

module.exports = forecast