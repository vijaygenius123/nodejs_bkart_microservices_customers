const express = require('express')


const app = express()

app.get('/', (req, res) => {
    res.send("Hello From Customers Microservice");
});


app.listen(4001, () => {
    console.log("Up & Running! Customers Microservice");
})
