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
  try {
    /* **********************************/
    /* CRUD operation of teacher's Data */
    /* **********************************/
    const teacherDataCollection = client
      .db("guidant")
      .collection("teachersData");

    /* get all data */
    app.get("/teachersData", async (req, res) => {
      const query = {}; //search query
      const response = await teacherDataCollection.find(query).toArray();
      res.send(response);
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
