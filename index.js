const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer');
const port = process.env.PORT | 5000;

app.use(express.json());
app.use(cors());

//nodemailer
const transporter = nodemailer.createTransport({
 
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "rizonrahat199@gmail.com",
    pass: "yufj bcis enjn camg",
  },
});


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
    const teacherCollection3= client.db("teacher").collection("three");
    const teacherCollection4= client.db("teacher").collection("four");
    const teacherCollection5= client.db("teacher").collection("five");
    const teacherCollection6= client.db("teacher").collection("six");
    const teacherCollection7= client.db("teacher").collection("seven");
   
    //one
      app.get("/1", async (req, res) => {
      const result = await teacherCollection.find().toArray();
      res.send(result);
    })

     app.get('/team1/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)};
      const move1=await teacherCollection.findOne(query);
      
      res.send(move1);
     })
    
   //add and send email 
   app.put("/add-task/team1/:id", async (req, res) => {
    const task = req.body;
    const id = req.params.id;
    const result = await teacherCollection.updateOne(
      { _id: new ObjectId(id) },
      { $push: { tasks: task } }
    );

    // Send email with task data
    const project = await teacherCollection.findOne({ _id: new ObjectId(id) });
    const emailRecipients = project.members.map((member) => member.mail);

    const mailOptions = {
      from: "rizonrahat199@gmail.com", // Replace with your Gmail email
      to: "redwantamim525@gmail.com",
      subject: `New Task Added: ${task.title}`,
      text: `
        A new task has been added:
       email: ${emailRecipients}
        Title: ${task.title}
        Description: ${task.description}
        Start Date: ${task.start_date}
        Deadline: ${task.deadline}
        Status: ${task.status}
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.send(result);
  });


   //delete
       app.delete("/delete-task/team1/:id/:taskNumber", async (req, res) => {
        try {
          const { id, taskNumber } = req.params;
      
          const result = await teacherCollection.updateOne(
            { _id: new ObjectId(id) },
            { $pull: { tasks: { number: parseInt(taskNumber) } } }
          );
      
          if (result.modifiedCount > 0) {
            res.sendStatus(200);
          } else {
            res.status(404).send("Task not found");
          }
        } catch (err) {
          console.error(err);
          res.status(500).send("Internal server error");
        }
      });

      //update task
      app.put("/update-task-status/team1/:id/:taskNumber", async (req, res) => {
        try {
          const { id, taskNumber } = req.params;
          const { status } = req.body;
          const result = await teacherCollection.updateOne(
            { _id: new ObjectId(id), "tasks.number": parseInt(taskNumber) },
            { $set: { "tasks.$.status": status } }
          );
          if (result.modifiedCount > 0) {
            res.sendStatus(200);
          } else {
            res.status(404).send("Task not found");
          }
        } catch (err) {
          console.error(err);
          res.status(500).send("Internal server error");
        }
      });

          
             //two
      app.get("/2", async (req, res) => {
        const result = await teacherCollection2.find().toArray();
        res.send(result);
      })
  
       app.get('/team2/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:new ObjectId(id)};
        const move2=await teacherCollection2.findOne(query);
        
        res.send(move2);
       })
      
      app.put("/add-task/team2/:id", async(req,res)=>{
      const task = req.body;
      const id = req.params.id;
      const result = await teacherCollection2.updateOne(
       {_id: new ObjectId(id)},
      {$push: {tasks: task}}
       )
      res.send(result);
       })
  
     //delete
         app.delete("/delete-task/team2/:id/:taskNumber", async (req, res) => {
          try {
            const { id, taskNumber } = req.params;
        
            const result = await teacherCollection2.updateOne(
              { _id: new ObjectId(id) },
              { $pull: { tasks: { number: parseInt(taskNumber) } } }
            );
        
            if (result.modifiedCount > 0) {
              res.sendStatus(200);
            } else {
              res.status(404).send("Task not found");
            }
          } catch (err) {
            console.error(err);
            res.status(500).send("Internal server error");
          }
        });
  
        //update task
        app.put("/update-task-status/team2/:id/:taskNumber", async (req, res) => {
          try {
            const { id, taskNumber } = req.params;
            const { status } = req.body;
            const result = await teacherCollection2.updateOne(
              { _id: new ObjectId(id), "tasks.number": parseInt(taskNumber) },
              { $set: { "tasks.$.status": status } }
            );
            if (result.modifiedCount > 0) {
              res.sendStatus(200);
            } else {
              res.status(404).send("Task not found");
            }
          } catch (err) {
            console.error(err);
            res.status(500).send("Internal server error");
          }
        });
  

        


           //three
      app.get("/3", async (req, res) => {
        const result = await teacherCollection3.find().toArray();
        res.send(result);
      })
  
       app.get('/team3/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:new ObjectId(id)};
        const move3=await teacherCollection3.findOne(query);
        
        res.send(move3);
       })
      
      app.put("/add-task/team3/:id", async(req,res)=>{
      const task = req.body;
      const id = req.params.id;
      const result = await teacherCollection3.updateOne(
       {_id: new ObjectId(id)},
      {$push: {tasks: task}}
       )
      res.send(result);
       })
  
     //delete
         app.delete("/delete-task/team3/:id/:taskNumber", async (req, res) => {
          try {
            const { id, taskNumber } = req.params;
        
            const result = await teacherCollection3.updateOne(
              { _id: new ObjectId(id) },
              { $pull: { tasks: { number: parseInt(taskNumber) } } }
            );
        
            if (result.modifiedCount > 0) {
              res.sendStatus(200);
            } else {
              res.status(404).send("Task not found");
            }
          } catch (err) {
            console.error(err);
            res.status(500).send("Internal server error");
          }
        });
  
        //update task
        app.put("/update-task-status/team3/:id/:taskNumber", async (req, res) => {
          try {
            const { id, taskNumber } = req.params;
            const { status } = req.body;
            const result = await teacherCollection3.updateOne(
              { _id: new ObjectId(id), "tasks.number": parseInt(taskNumber) },
              { $set: { "tasks.$.status": status } }
            );
            if (result.modifiedCount > 0) {
              res.sendStatus(200);
            } else {
              res.status(404).send("Task not found");
            }
          } catch (err) {
            console.error(err);
            res.status(500).send("Internal server error");
          }
        });
  

        
           //four
      app.get("/4", async (req, res) => {
        const result = await teacherCollection4.find().toArray();
        res.send(result);
      })
  
       app.get('/team4/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:new ObjectId(id)};
        const move4=await teacherCollection4.findOne(query);
        
        res.send(move4);
       })
      
      app.put("/add-task/team4/:id", async(req,res)=>{
      const task = req.body;
      const id = req.params.id;
      const result = await teacherCollection4.updateOne(
       {_id: new ObjectId(id)},
      {$push: {tasks: task}}
       )
      res.send(result);
       })
  
     //delete
         app.delete("/delete-task/team4/:id/:taskNumber", async (req, res) => {
          try {
            const { id, taskNumber } = req.params;
        
            const result = await teacherCollection4.updateOne(
              { _id: new ObjectId(id) },
              { $pull: { tasks: { number: parseInt(taskNumber) } } }
            );
        
            if (result.modifiedCount > 0) {
              res.sendStatus(200);
            } else {
              res.status(404).send("Task not found");
            }
          } catch (err) {
            console.error(err);
            res.status(500).send("Internal server error");
          }
        });
  
        //update task
        app.put("/update-task-status/team4/:id/:taskNumber", async (req, res) => {
          try {
            const { id, taskNumber } = req.params;
            const { status } = req.body;
            const result = await teacherCollection4.updateOne(
              { _id: new ObjectId(id), "tasks.number": parseInt(taskNumber) },
              { $set: { "tasks.$.status": status } }
            );
            if (result.modifiedCount > 0) {
              res.sendStatus(200);
            } else {
              res.status(404).send("Task not found");
            }
          } catch (err) {
            console.error(err);
            res.status(500).send("Internal server error");
          }
        });
  

        

           //five
      app.get("/5", async (req, res) => {
        const result = await teacherCollection5.find().toArray();
        res.send(result);
      })
  
       app.get('/team5/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:new ObjectId(id)};
        const move5=await teacherCollection5.findOne(query);
        
        res.send(move5);
       })
      
      app.put("/add-task/team5/:id", async(req,res)=>{
      const task = req.body;
      const id = req.params.id;
      const result = await teacherCollection5.updateOne(
       {_id: new ObjectId(id)},
      {$push: {tasks: task}}
       )
      res.send(result);
       })
  
     //delete
         app.delete("/delete-task/team5/:id/:taskNumber", async (req, res) => {
          try {
            const { id, taskNumber } = req.params;
        
            const result = await teacherCollection5.updateOne(
              { _id: new ObjectId(id) },
              { $pull: { tasks: { number: parseInt(taskNumber) } } }
            );
        
            if (result.modifiedCount > 0) {
              res.sendStatus(200);
            } else {
              res.status(404).send("Task not found");
            }
          } catch (err) {
            console.error(err);
            res.status(500).send("Internal server error");
          }
        });
  
        //update task
        app.put("/update-task-status/team5/:id/:taskNumber", async (req, res) => {
          try {
            const { id, taskNumber } = req.params;
            const { status } = req.body;
            const result = await teacherCollection5.updateOne(
              { _id: new ObjectId(id), "tasks.number": parseInt(taskNumber) },
              { $set: { "tasks.$.status": status } }
            );
            if (result.modifiedCount > 0) {
              res.sendStatus(200);
            } else {
              res.status(404).send("Task not found");
            }
          } catch (err) {
            console.error(err);
            res.status(500).send("Internal server error");
          }
        });
  

        

           //six
      app.get("/6", async (req, res) => {
        const result = await teacherCollection6.find().toArray();
        res.send(result);
      })
  
       app.get('/team6/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:new ObjectId(id)};
        const move6=await teacherCollection6.findOne(query);
        
        res.send(move6);
       })
      
      app.put("/add-task/team6/:id", async(req,res)=>{
      const task = req.body;
      const id = req.params.id;
      const result = await teacherCollection6.updateOne(
       {_id: new ObjectId(id)},
      {$push: {tasks: task}}
       )
      res.send(result);
       })
  
     //delete
         app.delete("/delete-task/team6/:id/:taskNumber", async (req, res) => {
          try {
            const { id, taskNumber } = req.params;
        
            const result = await teacherCollection6.updateOne(
              { _id: new ObjectId(id) },
              { $pull: { tasks: { number: parseInt(taskNumber) } } }
            );
        
            if (result.modifiedCount > 0) {
              res.sendStatus(200);
            } else {
              res.status(404).send("Task not found");
            }
          } catch (err) {
            console.error(err);
            res.status(500).send("Internal server error");
          }
        });
  
        //update task
        app.put("/update-task-status/team6/:id/:taskNumber", async (req, res) => {
          try {
            const { id, taskNumber } = req.params;
            const { status } = req.body;
            const result = await teacherCollection6.updateOne(
              { _id: new ObjectId(id), "tasks.number": parseInt(taskNumber) },
              { $set: { "tasks.$.status": status } }
            );
            if (result.modifiedCount > 0) {
              res.sendStatus(200);
            } else {
              res.status(404).send("Task not found");
            }
          } catch (err) {
            console.error(err);
            res.status(500).send("Internal server error");
          }
        });
  

        
           //seven
      app.get("/7", async (req, res) => {
        const result = await teacherCollection7.find().toArray();
        res.send(result);
      })
  
       app.get('/team7/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:new ObjectId(id)};
        const move7=await teacherCollection7.findOne(query);
        
        res.send(move7);
       })
      
      app.put("/add-task/team7/:id", async(req,res)=>{
      const task = req.body;
      const id = req.params.id;
      const result = await teacherCollection7.updateOne(
       {_id: new ObjectId(id)},
      {$push: {tasks: task}}
       )
        res.send(result);
       })
  
     //delete
         app.delete("/delete-task/team7/:id/:taskNumber", async (req, res) => {
          try {
            const { id, taskNumber } = req.params;
        
            const result = await teacherCollection7.updateOne(
              { _id: new ObjectId(id) },
              { $pull: { tasks: { number: parseInt(taskNumber) } } }
            );
        
            if (result.modifiedCount > 0) {
              res.sendStatus(200);
            } else {
              res.status(404).send("Task not found");
            }
          } catch (err) {
            console.error(err);
            res.status(500).send("Internal server error");
          }
        });
  
        //update task
        app.put("/update-task-status/team7/:id/:taskNumber", async (req, res) => {
          try {
            const { id, taskNumber } = req.params;
            const { status } = req.body;
            const result = await teacherCollection7.updateOne(
              { _id: new ObjectId(id), "tasks.number": parseInt(taskNumber) },
              { $set: { "tasks.$.status": status } }
            );
            if (result.modifiedCount > 0) {
              res.sendStatus(200);
            } else {
              res.status(404).send("Task not found");
            }
          } catch (err) {
            console.error(err);
            res.status(500).send("Internal server error");
          }
        });
  
  






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