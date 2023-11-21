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


app.post('/api/register', async (req, res, next) =>
{
  var error = '';
  const { email, user, pass, confirm } = req.body;
  
  const db = client.db("test");
  const emailCheck = await db.collection('users').find({email:email}).toArray();
  if (emailCheck.length > 0)
    res.status(201).json({error:'Email already in use'});
  else
  {
    const userCheck = await db.collection('users').find({user:user}).toArray();
    if (userCheck.length > 0)
      res.status(202).json({error:'Username already in use'});
    else
    {
      await db.collection('users').insertOne({"email":email, "user":user, "pass":pass, "userID":0});
      res.status(200).json({error:''});
    }
  }
});
app.post('/api/login', async (req, res, next) =>
{
  var error = '';
  const { email, password } = req.body;

  const db = client.db("test");
  const results = await db.collection('users').find({email:email.toLowerCase(),pass:password}).toArray();

  var id = -1;
  var un = '';

  if (results.length > 0)
  {
    id = results[0].userID;
    un = results[0].user;
  }

  var ret = { id:id, username:un, error:''};
  res.status(200).json(ret);

});
app.post('/api/post', async (req, res, next)=>{
  var error = '';
  const {title, content, author } = req.body;
  const db = client.db("test");
  const result = await db.collection('posts').insertOne({ title, content, author});
  
  var ret = {title:title, error:''};
  res.status(200).json(ret);
});
app.put('/api/edit', async (req, res, next) => {
  const postId = req.params.id;
  const { title, content, author } = req.body;

  const db = client.db("test");
  const result = await db.collection('posts').updateOne(
    { _id: ObjectId(postId) },
    { $set: { title, content, author } }
  );

  if (result.modifiedCount > 0) {
    res.status(200).json({ error: '', message: 'Post updated successfully' });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Delete post
app.delete('/api/delete', async (req, res, next) => {
  const postId = req.params.id;

  const db = client.db("test");
  const result = await db.collection('posts').deleteOne({ _id: ObjectId(postId) });

  if (result.deletedCount > 0) {
    res.status(200).json({ error: '', message: 'Post deleted successfully' });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

app.listen(5000); // start Node + Express server on port 5000
