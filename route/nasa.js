//this route will handle our api calls
//use a piece of express (branch off) but don't instantiate a new express
//this is a ROUTER CLASS
const router = require("express").Router() //create new instance of a router
const axios = require('axios') //there are currently some errors with axios

const myKey = 'cUU3PA1YbAaGq0efdLLkQNKFaMYWIJSyWo8PefbF'

let todayDateInitialForm = new Date()
const todayDateFinalForm = todayDateInitialForm.toISOString().slice(0,10)

axios.get(`https://api.nasa.gov/planetary/apod?api_key=${myKey}&date=${todayDateFinalForm}`)
    .then(response => {
        console.log(response.data.url)
    })
    .catch(error => {
        console.log(error);
      });

router.get("/today", (req, res) => {
    let todayDateInitialForm = new Date()
    const todayDateFinalForm = todayDateInitialForm.toISOString().slice(0,10)
    res.send(todayDateFinalForm)
    // next() //previously this line was necessary for "Hello World" to display at '/test'. but not anymore?
})

module.exports = router