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
const MesThree = document.querySelector('#mes-3')
const MesFour = document.querySelector('#mes-4')
const MessFive = document.querySelector('#mess-1')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    MesOne.textContent = 'Loading...'
    MesTwo.textContent = ''
    MesThree.textContent = ''
    MesFour.textContent = ''
    MessFive.textContent = ''
    fetch('/location?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                MesOne.textContent = data.error
            } else {

                const Weather_condition = data.forecast.climate
                const Tempearture = 'It is currently' + ' ' + data.forecast.temperature + ' '
                const Chance_of_rain = 'Chance of Rain: ' + ' ' + data.forecast.Chance_of_rain
                const localtime = 'LocalTime : ' + data.forecast.localtime
                MesOne.textContent = 'Location: ' + data.location
                MesTwo.textContent = 'Weather Condition: ' + Weather_condition
                MesThree.textContent = 'Temperature: ' + Tempearture + '°c'
                MesFour.textContent = Chance_of_rain + '%'
                MessFive.textContent = localtime

            }

        })
    })


})