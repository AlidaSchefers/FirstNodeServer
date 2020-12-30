require('dotenv').config() //config is method you call. only do this in one file, main server file. all your middlewears/routers will have access to env var
//only really seen this require().config() with the dotenv package
//The dotenv.config() function from the dotenv npm package will read the .env file, assign the variables to process.env, and return an object (named parsed) containing the content. it will also throw an error if it failed.

const express = require("express") //when want to access a package, use the require(packagename) //this IMPORTS express framework
const server = express() //shorthand for: new express.Express() //this creates the server. //this object is a new instance of express. only after instantiating it can we use the methods like get
const PORT = process.env.PORT || 3000 //want to have a backup in case it comes up undefined
//to use env variable, need to use the syntax above ^^
//process is a global object of NodeJS. only accessible in back-end Node JS

server.use(express.json()) //works with POST request with only JSON body through Postman
//we can send JSOn to server. np routes to accept anything else.

if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan') //morgan is a logging middleware. //logs request details
    server.use(morgan("dev")) //tells express to log via morgan. and morgan to log in the "dev" pre-defined format
}

const firstmiddleware = require("./middleware/firstmiddleware")
const nasaRouter = require("./route/nasa")

server.use("/test",firstmiddleware) //we need to specify the next middleware. 
    //we can specify a path or not. any method/any path. regardless of what request it is, "use" lets us use the middleware 
server.use("/nasa", nasaRouter) //put the middlewares you did not make first/above the ones you made

server.get("/test", (request, response) => {
    response.send("Hello World")
})
//custom route handler. don't want to have route handling here. (why?)

//Listen on a port
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`) //at http://localhost:${PORT}
})