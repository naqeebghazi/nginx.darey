// This is a very simple node application

const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.send("I am an endpoint man!")
    
})

app.listen(777, () => {
    console.log("listening on port 7777");
});

