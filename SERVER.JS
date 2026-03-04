const express = require("express")

const stripe = require("stripe")("sk_test_51T7GJKKfRM5287PS6Hbw4Df5WWCPzCqGAfqwp3cGg3IvHbRpw6FrLM0iDKcSNA1RNEWZUbBgfjpvv8qgdlsTPNcZ005R1TEOWP")

const app = express()

app.use(express.static("."))

app.use(express.json())

app.post("/create-checkout-session",async(req,res)=>{

const product = req.body.product

const session = await stripe.checkout.sessions.create({

payment_method_types:["card"],

line_items:[{

price_data:{
currency:"usd",
product_data:{name:product},
unit_amount:200
},

quantity:1

}],

mode:"payment",

success_url:`http://localhost:3000/success.html?product=${product}`,

cancel_url:`http://localhost:3000/cancel.html`

})

res.json({id:session.id})

})

app.listen(3000)