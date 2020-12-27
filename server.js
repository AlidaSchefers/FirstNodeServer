
const express = require("express") //when want to access a package, use the require(packagename)
    //express is a node package/library.
//we need an instance of it.
//Init express
const server = express()//this is literally creating the server.
//new express.Express()    
//this object is a new instance of express. only after enstanitating it can we use the methods like get
const PORT = 3000

const morgan = require('morgan') //logging middleware
const firstmiddleware = require("./middleware/firstmiddleware")
server.use("/test",firstmiddleware) //we need to specify the next middleware. 
    //we can specify a path or not. any method/andy path. regardless of what request it is, use the middleware 
server.use(morgan("dev")) //logs what the requests are
    // Create your endpoints/route handlers

const nasaRouter = require("./route/nasa")
server.use("/nasa", nasaRouter)
//put the middlewares you did not make first/above the ones you made

server.get("/test", (request, response) => {
    response.send("Hello World")
})
//custom route handler. don't want to have route handling here.

console.log(new Date())
//Listen on a port
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

