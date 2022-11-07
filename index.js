const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
mongoose.connect("mongodb://localhost:27017/api_web_tech_assignment",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    , () => {
        console.log("DB connected")
    })
//product schema

const productSchema = new mongoose.Schema({
    Product_id: String,
    Product_type: String,
    Product_name: String,
    Product_price: Number,
    Available_quantity: Number
})
const ProductTable = new mongoose.model("ProductTable", productSchema)//product model
//customer schema
const customerSchema = ({
    customer_id: String,
    customer_name: String,
    email: String,
    balance: Number
})
//order schema

const Customertable = new mongoose.model("CusromerTable", customerSchema)
//routes
app.get("/", (req, res) => {
    res.send("web api")
})
var proId="PRD"+Math.floor(Math.random()*5000)
var price=Math.floor(Math.random()*8000)
// console.log(proId)
app.post("/product", (req, res) => {
    const products = new ProductTable({
        Product_id: proId,
        Product_type: req.body.Product_type,
        Product_name: req.body.Product_name,
        Product_price:price,
        Available_quantity: req.body.Available_quantity
    })

    products.save(err => {
        if (err) {
            res.send(err)
        } else {
            res.send({ message: "Product Table is created!" })
        }
    })
})

const cusId="CT"+Math.floor(Math.random()*1000)
app.post("/customer",(req,res)=>{
    const customers=new Customertable({
        customer_id:cusId,
        customer_name:req.body.customer_name,
        email:req.body.email,
        balance:req.body.balance
    })
    customers.save(err=>{
        if(err){
            res.send(err)
            console.log(err)
        }else{
            res.send({message:"customer Table is created"})
        }
    })
})
app.listen(4500, () => {
    console.log("port at 4500")
})