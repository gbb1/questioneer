/**
 *
 */
/*
  const gameSchema = new Schema({
    created: Date,
    players: [playerSchema],
    rounds: [roundSchema],
  })

  const roundSchema = new Schema({
    round_number: Number,
    questions: [questionSchema],
  })

  const questionSchema = new Schema({
    poster_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    question: String,
    answers: [answerSchema],
  })
*/

const { User, Lobby, Game, Round, Question, Answer, Score } = require("./index.js");
const { ObjectId } = require('mongodb')

/**
 * Start new game
 */

const startNewGame = async (lobby_id) => {
  const lobby = await Lobby.findOne({ lobby_id });

  const firstRound = new Round({
    round_number: 1,
    questions: [],
    scores: [],
  });

  const newGame = new Game({
    created: new Date(),
    players: lobby.members,
    rounds: [firstRound],
  });

  lobby.games.push(newGame);

  await lobby.save();
};

/**
 * Start a the next round
 */
const startNextRound = async (lobby_id) => {
  const lobby = await Lobby.findOne({ lobby_id });
  const currGame = lobby.games[lobby.games.length - 1]
  const currRound = currGame.rounds[currGame.rounds.length - 1].round_number + 1

  const nextRound = new Round({
    round_number: currRound,
    questions: [],
    scores: [],
  });

  currGame.rounds.push(nextRound);

  await lobby.save();
};



// startNextRound("B5A1").then(console.log("testing start new game")).catch(err => console.log(err));
/**
 * Create Question
 */

const addNewQuestion = async (user_id, lobby_id, question_text) => {
  const user = await User.findOne({ clerk_id: user_id });
  const lobby = await Lobby.findOne({ lobby_id });
  const currGame = lobby.games[lobby.games.length - 1]
  const currRound = currGame.rounds[currGame.rounds.length - 1]

  const question = new Question({
    poster_id: user._id,
    question: question_text,
    answers:[],
  })

  currRound.questions.push(question)

  await lobby.save();
  return question._id
};


/**
 * Add an answer to a question with a wager
*/
const addAnswer = async (user_id, lobby_id, question_id, answer_text, wager = 0) => {
  const user = await User.findOne({ clerk_id: user_id });
  const lobby = await Lobby.findOne({ lobby_id });
  const currGame = lobby.games[lobby.games.length - 1]
  const currRound = currGame.rounds[currGame.rounds.length - 1]

  const question = currRound.questions.find(x => x._id.toString() === question_id)

  const answer = new Answer({
    poster_id: user._id,
    answer: answer_text,
    wager: wager,
    votes: [],
  })

  question.answers?.push(answer)

  await lobby.save()
  return answer._id
}


/**
 * Add a vote to a question
 */
const addVote = async (user_id, lobby_id, question_id, answer_id) => {
  const user = await User.findOne({ clerk_id: user_id });
  const lobby = await Lobby.findOne({ lobby_id });
  const currGame = lobby.games[lobby.games.length - 1]
  const currRound = currGame.rounds[currGame.rounds.length - 1]

  const question = currRound.questions.find(x => x._id.toString() === question_id)
  const answer = question.answers.find(x => x._id.toString() === answer_id)

  answer?.votes.push(user._id)
  return answer?.votes
}

/**
 *
 */
const calcRoundScore = async (lobby_id) => {
  const lobby = await Lobby.findOne({ lobby_id });
  const currGame = lobby.games[lobby.games.length - 1]
  const currRound = currGame.rounds[currGame.rounds.length - 1]

  const voteMax = currGame.players.length

  let scoreTotals = {}
  for (let member of currGame.players) {
    scoreTotals[member.toString()] = 0
  }
  console.log(scoreTotals)

  for (let round of currGame.rounds) {
    for (let question of round.questions) {
      const sorted = question.answers.sort((a, b) => b.votes.length - a.votes.length)

      for (let answer of sorted) {
        if (answer.votes.length === voteMax) {
          if (answer.wager === 0) {
            scoreTotals[answer.poster_id.toString()] += 100 * answer.votes.length * 2;
          } else {
            scoreTotals[answer.poster_id.toString()] += 100 * answer.votes.length * 2 + wager;
          }
        } else {
          if (answer.wager === 0) {
            scoreTotals[answer.poster_id.toString()] += 100 * answer.votes.length;
          }
        }
      }
    }
  }

  let promises = []
  let scoreBoard = []

  for (let member in scoreTotals) {
    const promise = new Promise(async (resolve) => {
      const player = await User.findOne({ _id: member })
      scoreBoard.push({
        username: player.username,
        score: scoreTotals[member],
      })
      resolve()
    })
    promises.push(promise)
  }

  return Promise.all(promises).then((res) => scoreBoard).catch((err) => console.log(err))
}
// addNewQuestion("user_2aeLUssKJHs6tN7tFhDyScvXsvz", "B5A1", 'test question').then((res) => console.log(res)).catch((err) => console.log(err))
// addAnswer("user_2aeLUssKJHs6tN7tFhDyScvXsvz", "B5A1", '65af14bad1e1745bbcdb38fb',  'test answer', 120).then((res) => console.log(res)).catch((err) => console.log(err))

// calcRoundScore('B5A1').then((res) => console.log(res))

module.exports = {
  startNewGame,
};
