const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path')
require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uri = process.env.MONGO_CONNECTION_KEY

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// const connectMongo = async () => {
//   await client.connect();
//   await client.db("admin").command({ ping: 1 });
//   console.log("Pinged your deployment. You successfully connected to MongoDB!");
// }

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


/* Users, to match game to auth */
const userSchema = new Schema({
  username: String,
  clerk_id: { type: String, unique: true },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lobby' }],
})

/* Answers to game questions */
const answerSchema = new Schema({
  poster_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answer: String,
  wager: Number,
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

/* Game questions */
const questionSchema = new Schema({
  poster_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  question: String,
  answers: [answerSchema],
})

/* Game rounds */
const roundSchema = new Schema({
  round_number: Number,
  questions: [questionSchema],
})

/* Game players */
const playerSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: Number,
  session_id: String,
  username: String,
})

/* Game lobby */
const lobbySchema = new Schema({
  lobby_id: { type: String, unique: true },
  created: Date,
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: [true, 'Admin required'] },
  players: [playerSchema],
  rounds: [roundSchema],
})

const User = mongoose.model('User', userSchema);
const Lobby = mongoose.model('Lobby', lobbySchema);

/* --------------------------------------------------------------------- */

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected...');
  } catch (error) {
    console.log(`error: ${error}`);
    process.exit(1);
  }
};

const closeDB = () => {
  mongoose.connection.close();
};

module.exports = {
  connectDB,
  closeDB,
  Lobby,
  User,
};