// This is a very simple node application

const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.send("I am an endpoint man!")
    
})

app.listen(7777, () => {
    console.log("Listening on the port 7777");
});

