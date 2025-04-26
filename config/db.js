// config/db.js - Database configuration
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb://rizonrahat199:gpeYJ3jTyAALnHAr@ac-jif2aos-shard-00-00.u9sh80h.mongodb.net:27017,ac-jif2aos-shard-00-01.u9sh80h.mongodb.net:27017,ac-jif2aos-shard-00-02.u9sh80h.mongodb.net:27017/?ssl=true&replicaSet=atlas-rzyffr-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Collections
const collections = {};

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    // Initialize collections
    collections.teacherCollection1 = client.db("teacher").collection("one");
    collections.teacherCollection2 = client.db("teacher").collection("two");
    collections.teacherCollection3 = client.db("teacher").collection("three");
    collections.teacherCollection4 = client.db("teacher").collection("four");
    collections.teacherCollection5 = client.db("teacher").collection("five");
    collections.teacherCollection6 = client.db("teacher").collection("six");
    collections.teacherCollection7 = client.db("teacher").collection("seven");
    collections.excelCollection = client.db("mydatabase").collection("exceldata");
    
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = { connectDB, client, collections, ObjectId };