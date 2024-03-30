const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT | 5000;

app.use(express.json());
app.use(cors());

//gpeYJ3jTyAALnHAr
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb://rizonrahat199:gpeYJ3jTyAALnHAr@ac-jif2aos-shard-00-00.u9sh80h.mongodb.net:27017,ac-jif2aos-shard-00-01.u9sh80h.mongodb.net:27017,ac-jif2aos-shard-00-02.u9sh80h.mongodb.net:27017/?ssl=true&replicaSet=atlas-rzyffr-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
  
    
    const teacherCollection= client.db("teacher").collection("one");
    const teacherCollection2= client.db("teacher").collection("two");


    app.get("/1", async (req, res) => {
      const result = await teacherCollection.find().toArray();
      res.send(result);
    })

    app.get("/2", async (req, res) => {
      const result = await teacherCollection2.find().toArray();
      res.send(result);
    })


    app.get('/team1/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)};
      const mover=await teacherCollection.findOne(query);
      
      res.send(mover);
     })
    
    app.get('/team2/:id',async(req,res)=>{
      const id2=req.params.id;
      const query2={_id:new ObjectId(id2)};
      const mover2=await teacherCollection2.findOne(query2);
      res.send(mover2);
   })
    
    










  } finally {
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Job Task Planner server")
})

app.listen(port, () => {
  console.log(`Port number ${port}`);
})