const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {Customer} = require('./models/Customer')

const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://customers_user:customers_password@cluster0.cbckc.mongodb.net/customers?retryWrites=true&w=majority",
    {useUnifiedTopology: true},
    () => {
        console.log("DB Is Connected");
    })

app.get('/', (req, res) => {
    res.send("Hello From Customers Microservice");
});

app.post('/customers', (req, res) => {
    const newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }

    const customer = new Customer(newCustomer)

    customer.save()
        .then(() => {
            res.send("New Customer Created")
        })
        .catch(err => {
            throw err
        })
})

app.get('/customers', (req, res) => {
    Customer.find()
        .then(customers => {
            res.json(customers)
        })
        .catch(err => {
            throw err
        })
})



app.listen(4001, () => {
    console.log("Up & Running! Customers Microservice");
})
