const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {Customer} = require('./models/Customer')

const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI,
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

app.get('/customer/:id', (req, res) => {
    Customer.findById(req.params.id)
        .then(customer => {
            if (customer)
                res.json(customer)
            else
                res.sendStatus(404)
        })
        .catch(err => {
            throw  err
        })
})

app.delete('/customer/:id', (req, res) => {
   Customer.findOneAndDelete(req.params.id)
       .then(() => {
            console.log("Removed Customer")
           res.sendStatus(200)
       })
       .catch(err => {
           throw err
       })
})



app.listen(4001, () => {
    console.log("Up & Running! Customers Microservice");
})
