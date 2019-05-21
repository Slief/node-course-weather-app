// console.log('Client side JS file is loaded')

// to start app goto directory and type:
// C:\Dev\node-course\web-server\src> nodemon app.js

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const alertOne = document.querySelector('#alert-1');
const alertTwo = document.querySelector('#alert-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    alertOne.textContent = '';
    alertTwo.textContent = '';
    const location = search.value;

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {

            // console.log(data)
            
            //  data    {forecast: "Heavy rain and windy starting in the evening. It i…low of 53.26 degrees. There is 0% chance of rain.", location: "Overland Park, Kansas 66221, United States", address: "66221"}
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location 
                messageTwo.textContent = data.forecast
                // console.log(data.alerts)
                if (data.alertHeader) {
                    alertOne.textContent = data.alertHeader;
                    alertTwo.textContent = data.alertText;
                }
            }
        })
    })
    // console.log(location)
})
