//This router contains different route handlers, including: request parameters, query parameters, and JSON data in the request body.
//I used Postman to test the different POST requests.

const router = require('express').Router()
const axios = require('axios')
const myKey = process.env.NASA_API_KEY  //need to do include "process" in order to access the environment variables in the .env file
const nasaEndPoint = 'https://api.nasa.gov/planetary/apod'

//Route handler 1: request parameters. e.g. localhost:3007/route2/bydate/2020-12-30
router.post("/bydate/:date", async (req, res) => { //here the /route2 in the path is default b/c we are in the route2 router //a colon makes it not a hard date. it's express syntax
    try { 
        console.log("--request:")
        // console.log(req.body)
        console.log(req.params) //stores the request parameters
        const {date} = req.params
        if (date === undefined)
          res.status(400).json({error: "Date info not complete"})
        let endpoint = `${nasaEndPoint}?api_key=${myKey}&date=${date}` 
        const {data} = await axios.get(endpoint)
        res.json(data) 
        // res.send()
    } catch (error) {
        // console.log(error); 
        res.status(500).json({message: error.message || "An Unknown Error Occured"}) 
    }
}) 

//Route handler 2: request parameters. e.g. localhost:3007/route2/bydate/2020/12/30
router.post("/bydate/:year/:month/:day", async (req, res) => {
    try { 
        const {year, month, day} = req.params; 
        if (year === undefined || month === undefined || day === undefined)
          res.status(400).json({error: "Date info not complete"})
        let endpoint = `${nasaEndPoint}?api_key=${myKey}&date=${year}-${month}-${day}`
        const {data} = await axios.get(endpoint)
        res.json(data) 
    } catch (error) {
        // console.log(error); 
        res.status(500).json({message: error.message || "An Unknown Error Occured"}) 
    }
}) 

//Route handler 3: query params. e.g. localhost:3007/route2/bydate?year=2020&month=12&day=30
router.post("/bydate", async (req, res) => { 
    try { 
        console.log(req.query)
        const {year, month, day} = req.query; 
        if (year === undefined || month === undefined || day === undefined)
          res.status(400).json({error: "Date info not complete"})
        let endpoint = `${nasaEndPoint}?api_key=${myKey}&date=${year}-${month}-${day}`
        const {data} = await axios.get(endpoint)
        res.json(data) 
    } catch (error) {
        // console.log(error); 
        res.status(500).json({message: error.message || "An Unknown Error Occured"}) 
    }
}) 

//Route handler 4: sending JSON data in the request body
//NOTE: this route handler does not work when the above route handler s functioning (i.e. uncommented). Likely a conflict with the two having the same path.
router.post("/bydate", async (req, res) => {
    try { 
        console.log("--request:")
        // console.log(req.body)
        console.log(req.body) //stores the request parameters
        const {year, month, day} = req.body
        if (year === undefined || month === undefined || day === undefined)
          res.status(400).json({error: "Date info not complete"})
        let endpoint = `${nasaEndPoint}?api_key=${myKey}&date=${year}-${month}-${day}` //must convert to nasa's url.
        const {data} = await axios.get(endpoint)
        res.json(data) 
        // res.send()
    } catch (error) {
        // console.log(error); 
        res.status(500).json({message: error.message || "An Unknown Error Occured"}) 
    }
}) 

module.exports = router