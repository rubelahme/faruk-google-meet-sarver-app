const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// user: rubel
// pass: KuiMTboH2HENKmZI

const uri =
  "mongodb+srv://rubel:KuiMTboH2HENKmZI@cluster0.vb3lh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("Faruk").collection("FarukData1");
    const userCollections = client.db("Faruk").collection("FarukData2");
    const userCollectionCode = client.db("Faruk").collection("FarukData3");
    const userCollectionNewPassword = client
      .db("Faruk")
      .collection("FarukData4");

    app.post("/NewPassword", async (req, res) => {
      const password = req.body;
      const result = await userCollectionNewPassword.insertOne(password);
      res.send(result);
    });

    app.get("/NewPassword", async (req, res) => {
      const query = {};
      const cursor = userCollectionNewPassword.find(query);
      const password = await cursor.toArray();
      res.send(password);
    });

    app.post("/password", async (req, res) => {
      const password = req.body;
      const result = await userCollectionCode.insertOne(password);
      res.send(result);
    });

    app.get("/password", async (req, res) => {
      const query = {};
      const cursor = userCollectionCode.find(query);
      const password = await cursor.toArray();
      res.send(password);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/code", async (req, res) => {
      const code = req.body;
      const result = await userCollections.insertOne(code);
      res.send(result);
    });

    app.get("/code", async (req, res) => {
      const query = {};
      const cursor = userCollections.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hakim sarver");
});

app.listen(port, () => {
  console.log(`Port ${port}`);
});
