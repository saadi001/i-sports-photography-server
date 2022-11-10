const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();


// middleware 
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.biy4zxs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
     try{
          const serviceCollection = client.db('isportsDB').collection('services');
          const reviewCollection = client.db('isportsDB').collection('reviews')

          app.get('/services', async(req, res)=>{
               const query = {}
               const cursor = serviceCollection.find(query);
               const services = await cursor.toArray()
               res.send(services);
          })

          app.get('/services/:id', async(req, res)=>{
               const id = req.params.id;
               const query = {_id: ObjectId(id)}
               const service = await serviceCollection.findOne(query)
               res.send(service)
          })

          app.post('/reviews', async(req, res)=>{
               const review = req.body;
               const result = await reviewCollection.insertOne(review);
               res.send(result);
          })
     }
     finally{
          
     }

}
run().catch(err => console.error(err))


app.get('/', (req, res)=>{
     res.send('i sports photography server running')
})

app.listen(port, ()=>{
     console.log( `server is running at port ${port}`)
})