// console.log("hello World!")

// fetch('http://localhost:3000/location?address=tirunelveli').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//            console.log(data.error)
//         }
//         console.log(data.location)
//         console.log(data.forecast)
//     })
// })
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const MesOne = document.querySelector('#mes-1')
const MesTwo = document.querySelector('#mes-2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    // if (location.length === 0) {
    //     console.log('please enter your address')
    // }
    // else {
    MesOne.textContent = 'Loading...'
    MesTwo.textContent = ''
    fetch('http://localhost:3000/location?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                MesOne.textContent = data.error
            } else {
                const value = data.forecast.climate + ',' + 'It is currently' + ' ' + data.forecast.temperature + ' ' + 'Degrees Out.' + 'chance of rain' + ' ' + data.forecast.Chance_of_rain
                MesOne.textContent = data.location
                MesTwo.textContent = value
            }

        })
    })


})