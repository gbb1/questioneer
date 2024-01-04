const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Users, to match game to auth */
const userSchema = new Schema({
  username: String,
  clerk_id: { type: String, unique: true },
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
  players: [playerSchema],
  rounds: [roundSchema],
})

const Users = mongoose.model('Users', userSchema);
const Lobbies = mongoose.model('Lobbies', lobbySchema);

/* --------------------------------------------------------------------- */

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_CONNECTION_KEY}`);
    console.log('MongoDB connected...');
  } catch (error) {
    console.log(`error: ${error}`);
    process.exit(1);
  }
};

const closeDB = () => {
  mongoose.connection.close();
};

connectDB();
closeDB();

module.exports = {
  connectDB,
  closeDB,
  Lobbies,
  Users,
};