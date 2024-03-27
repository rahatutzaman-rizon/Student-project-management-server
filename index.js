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
    const taskCollection = client.db("jobTask").collection("tasks");
    const groupCollection= client.db("group").collection("member");
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
    
    




//put method 
app.put("/taskUpdate/:id",async(req,res)=>{

  const tasks=req.body;
  const id = req.params.id;

  console.log(tasks);
  const result=await teacherCollection.findOneAndUpdate(
    
      
{ team: id },
{ $push: { tasks: tasks} },
    
  );
  res.send(result)

})



    // app.get('/1/:id',async(req,res)=>{
    //   const id=req.params.id;
    //   const query={_id:new ObjectId(id)};
    //   const mover=await teacherCollection.findOne(query);
    //   res.send(mover)
    // })
    

    // app.post('/1/:id',async(req,res)=>{
  
    
    //   const member=req.body;
   
      
    //   const result=await teacherCollection.insertOne(member);
    
    //   res.send(result);

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