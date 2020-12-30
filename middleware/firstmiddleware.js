module.exports = (req, res, next) => {
    console.log("First Middleware Function") 
    if (Math.random() > 0.5) {
        return res.send("Not so fast!")
    }
    next() //assumes that we may go on to another function after this. 
}
//export an anonymous middleware function

//module keyword refers to an object representing the current module. The module object has a key exports, which is an empty object too ({}), until you fill it with module.exports.SMTHSMTH.
//Here, we replace the empty object with a function! And then we can get that value from the key exports in the next file with require(). 