const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://COPdatabase:EjHV8xZLAVVNO22N@cluster0.siytudi.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(url);
client.connect();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) =>
{
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader(
'Access-Control-Allow-Headers',
'Origin, X-Requested-With, Content-Type, Accept, Authorization'
);
res.setHeader(
'Access-Control-Allow-Methods',
'GET, POST, PATCH, DELETE, OPTIONS'
);
next();
});

app.post('/api/login', async (req, res, next) =>
{
  var error = '';
  const { email, password } = req.body;

  const db = client.db("test");
  const results = await db.collection('users').find({email:email,password:password}).toArray();

  var id = -1;
  var un = '';

  if (results.length > 0)
  {
    id = results[0].userID;
    un = results[0].username;
  }

  var ret = { id:id, username:un, error:''};
  res.status(200).json(ret);

});

app.listen(5000); // start Node + Express server on port 5000
