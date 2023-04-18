const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5010;

// using env file
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

/* HOME ROUTE */
app.get("/", async (req, res) => {
  res.send("Guidant server is running");
});

app.listen(port, () => {
  console.log("connected to server");
});

/* MONGODB setup*/

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yfdgs6q.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

/* mongodb operation */

async function run() {
  const teacherDataCollection = client.db("guidant").collection("teachersData");
  const appointingCollection = client
    .db("guidant")
    .collection("appointingData");
  try {
    /* **********************************/
    /* CRUD operation of teacher's Data */
    /* **********************************/

    /* get all data */
    app.get("/teachersData", async (req, res) => {
      const query = {}; //search query
      const response = await teacherDataCollection.find(query).toArray();
      res.send(response);
    });
    /* get all data ends*/

    /* get single data */
    app.get("/singleTeacher/", async (req, res) => {
      const id = req.query.id;

      const query = { id: id }; //search query
      const response = await teacherDataCollection.findOne(query);
      res.send(response);
    });
    /* get single data ends*/

    /* **********************************/
    /* CRUD operation of appointing Data */
    /* **********************************/

    /* get all data */
    app.get("/appointingData", async (req, res) => {
      const query = {}; //search query
      const response = await appointingCollection.find(query).toArray();
      res.send(response);
    });
    /* get all data ends*/

    /* get all data */
    app.post("/postAppointing", async (req, res) => {
      const doc = req.body;

      const response = await appointingCollection.insertOne(doc);
      console.log(`A document was inserted with the _id: ${doc?.id}`);
    });
    /* get all data ends*/
  } catch (error) {
    console.log(err);
  }
}

run().catch(console.dir);

client.connect((err) => {
  /* collection name */
  const collection = client.db("guidant").collection("teachersData");

  /*  */
  client.close();
});
