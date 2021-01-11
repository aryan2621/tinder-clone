import express from 'express'
import mongooose from 'mongoose'
import Cards from "./dbCards.js"
import Cors from 'cors'


const app=express()
const port=process.env.PORT||8000;
const connection_url="mongodb+srv://admin:admin@cluster0.j25n7.mongodb.net/tinderdb?retryWrites=true&w=majority"
app.use(Cors())
app.use(express.json())



mongooose.connect(connection_url,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,

})




app.get('/',(req,res)=>{
    res.send('hiiii')
})
app.post('/tinder/cards',(req,res)=>{
    const dbCard=req.body;
    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)

        }
    })
})


app.get('/tinder/cards',(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)

        }
    })

})


app.listen(port,()=>console.log("server is done"))