import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors'
//App Config
const app = express()
const port = process.env.PORT || 8001

app.use(express.json())
app.use(Cors())
//Middleware
const connection_url = "mongodb://127.0.0.1:27017/movies"
mongoose.connect(connection_url, {
    useNewUrlParser: true,
})
//API Endpoints
app.post('/dating/cards',(req,res)=>{
    const dbCard= req.body;
    Cards.create(dbCard).then((data)=>{
        res.status(201).send(data)
    }).catch((err)=>{
        res.status(500).send(err)
        console.log('error ====> ',err)
    })
    
})
app.get('/dating/cards',(req,res)=>{
    Cards.find({}).then((data) => {
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(500).send(err)
    })
})
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))
//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))