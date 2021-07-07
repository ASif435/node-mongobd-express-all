const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))


const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const { ObjectID } = require('mongodb');
const uri = "mongodb+srv://myDb:FOZ5bv91ye1jkTIR@cluster0.okztc.mongodb.net/mongodb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("mongodb").collection("products");
 //read data from database
  app.get('/products',(req,res)=>{
    collection.find({})
    .toArray((err,document)=>{
      res.send(document)
    })
  });

  //update data 
  app.get('/product/:id',(req,res)=>{
    collection.find({_id:ObjectID(req.params.id)})
   .toArray((err,document)=>{
     res.send(document[0])
   })
  })
   //create data to database
    app.post('/addProduct', (req,res)=>{
      const product = req.body;
      collection.insertOne(product)
      .then(res=>{
        console.log('added product')
      })
      res.redirect('/')
  
    });
    //delete data from database
    app.delete('/delete/:id',(req,res)=>{
      const del = req.params.id
      collection.deleteOne({_id: ObjectId(del)})
      .then(result=>{
        console.log('delete-success')
      })
      res.redirect('/')
    })
    //last updating data
    app.patch('/update/:id',(req,res)=>{
      console.log(req.params.id)
      collection.updateOne({_id: ObjectId(req.params.id)},{
        $set: {price:req.body.price,quantity: req.body.quantity}
      })
      .then(result=>{
        console.log(result)
      })
    })
 
});

app.get('/',(req,res)=>{
   res.sendFile(__dirname + '/client-side/index.html')
});
app.listen(4000)