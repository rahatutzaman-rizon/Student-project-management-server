const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT | 5000;

app.use(express.json());
app.use(cors());

//xXVjxb8oqcLnNrs0
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb://rizonrahat199:xXVjxb8oqcLnNrs0@ac-jif2aos-shard-00-00.u9sh80h.mongodb.net:27017,ac-jif2aos-shard-00-01.u9sh80h.mongodb.net:27017,ac-jif2aos-shard-00-02.u9sh80h.mongodb.net:27017/?ssl=true&replicaSet=atlas-rzyffr-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const taskCollection = client.db("jobTask").collection("tasks");
    const groupCollection= client.db("group").collection("member");
    // groupCollection.insertOne({
    //   "name":"purno",
    //   "it":"19031",
    //   "group":"1",
    //   "category":"student",


    // })

    app.get("/getstudent",async(req,res)=>{
      const result = await groupCollection.find({group:"2"}).toArray();
      res.send(result);
    })
    
    app.get("/member", async (req, res) => {
        const result = await groupCollection.find().toArray();
        res.send(result);
      })


       app.post('/member',async(req,res)=>{

  const member=req.body;

  //
  const result=await groupCollection.insertOne(member);

  res.send(result);
 })




      // app.get("/member/:id", async (req, res) => {
      //   const id=req.params.id;
      //  const query={
      //   _id : new ObjectId(id)
      //  }
      //   const result = await groupCollection.findOne(query) ;
      //   res.send(result);
      // });
      

      app.get("/member/:groupId", async (req, res) => {
        const groupId = req.params.groupId;
        
        const query = { group: groupId };
        
        const members = await groupCollection.find(query).toArray();
        
        res.send(members);
      });



      //move
app.get('/move/:id',async(req,res)=>{
  const id=req.params.id;
  const query={_id:new ObjectId(id)};
  const mover=await groupCollection.findOne(query);
  res.send(mover)
})



    app.post("/createTask", async (req, res) => {
      const taskData = req?.body;
      const result = await taskCollection.insertOne(taskData);
      res.send(result);
    })

    app.get("/previousTask", async (req, res) => {
      const result = await taskCollection.find().toArray();
      res.send(result);
    })

    app.delete("/taskDelete/:id", async (req, res) => {
      const id = req?.params?.id;
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    })

    app.put("/updateTask/:id", async (req, res) => {
      const updatedData = req?.body;
      const id = req?.params?.id;
      const filter = {_id : new ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set : {
          ...updatedData
        }
      }
      const result = await taskCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    })

    app.put("/statusChange/:id", async (req, res) => {
      const updatedData = req?.body;
      const id = req?.params?.id;
      const filter = {_id : new ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set : {
          ...updatedData
        }
      }
      const result = await taskCollection.updateOne(filter, updateDoc, options);
      res.send(result);
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
