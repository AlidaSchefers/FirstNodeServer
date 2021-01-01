//this route will handle our api calls
//use a piece of express (branch off) but don't instantiate a new express //this is a ROUTER CLASS
const router = require("express").Router() //create new instance of a router
const axios = require('axios')

const nasaEndPoint = 'https://api.nasa.gov/planetary/apod'
const myKey = process.env.NASA_API_KEY  //need to do include "process" in order to access the environment variables in the .env file

//@path: POST /nasa/bydate
//@access: public
//@desc: get a nasa apod post by a given date
router.post("/bydate", async (req, res) => { //here the /nasa in the path is default b/c we are in the nasa router
    try {
        console.log(req.body)
        const {year, month, day} = req.body; //object de-structuring  //e.g. const year = req.body.year //accesses object and finds the key and assign value
        //can do defaults in same line too: const {year=2020, month, day} = req.body;
        if (year === undefined || month === undefined || day === undefined)
          res.status(400).json({error: "Date info not complete"})
        //to add: check if date is valid
        let endpoint = `${nasaEndPoint}?api_key=${myKey}&date=${year}-${month}-${day}` //query parameters can be ordered any way, so we could assign `${nasaEndPoint}?date=${year}-${month}-${day}&api_key=${myKey}` instead
        const {data} = await axios.get(endpoint) //with await, no need to have try-catch. otherwise it would be redundant. btw await is a promise
        //using dot notation at the end of a method like that (e.g. await axios.get(endpoint).data) doesn't work and is difficult to read.
        res.json(data) //when in JS, don't need to stringify JSON keys, but in a raw JSON, do need "" (cannot use '')
    } catch (error) {
        console.log(error); //only gonna show up in our server console log
        res.status(500).json({message: error.message || "An Unknown Error Occured"})
    }
    next()
}) 
//if don't want to use promises, you can use the words "async" and "await". (btw what are these called? keywords?)
//if one line needs to be syncronous and the rest asyncronous, first use async at the beginning (like in the router.post paras above) and then use await on the syncronous line (here in line 22)

module.exports = router


//-------------- old code --------------
// let todayDateInitialForm = new Date()
// const todayDateFinalForm = todayDateInitialForm.toISOString().slice(0,10)

// module.exports = (req, res, next) => {
//     axios.get(`https://api.nasa.gov/planetary/apod?api_key=${myKey}&date=${todayDateFinalForm}`)
//     .then(response => {
//         console.log(response.data.url)
//         // res.send(response.data.url) //does not work.
//         // console.log("axios test")
//         // const imageURL = response.data.url
//     })
//     .catch(error => {
//         console.log(error);})
//     next() //assumes that we may go on to another function after this. 
// }

// axios.default.get()
//some packages you need to include .default

// router.get("/today", (req, res) => {
//     let todayDateInitialForm = new Date()
//     const todayDateFinalForm = todayDateInitialForm.toISOString().slice(0,10)
//     res.send(todayDateFinalForm)
//     // res.send(imageURL)
//     // next() //previously this line was necessary for "Hello World" to display at '/test'. but not anymore?
//     axios.get(`https://api.nasa.gov/planetary/apod?api_key=${myKey}&date=${todayDateFinalForm}`)
//     .then(response => {
//         console.log(response.data.url)
//         res.send(response)
//         // const imageURL = response.data.url
//     })
    
//     .catch(error => {
//         console.log(error);
//     });
// })