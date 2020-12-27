module.exports = (req, res, next) => {
    console.log("First Middleware Function") 
    if (Math.random() > 0.5) {
        return res.send("Not so fast!")
    }
    next() //assumes that we may go on to another function after this. 
}
//export an anonymous middleware function