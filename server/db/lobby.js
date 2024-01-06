const { User, Lobby } = require('./index.js');
const { findUserById } = require('./users.js');

const generateLobbyId = () => {
  const pattern = 'xxxx';
  return pattern.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16).toUpperCase();
  });
}

const createLobby = async (clerk_id) => {
  const lobby_id = generateLobbyId().toUpperCase();

  return new Promise((resolve, reject) => {
    findUserById(clerk_id)
      .then(async (data) => {

        const newLobby = new Lobby({
          lobby_id,
          admin: data._id,
          created: new Date(),
        })

        await newLobby.save()
      })
      .catch((err) => {
        new Error(err)
        console.log(err)
      })
  })
}

const getLobbies = async (unique_id) => {
  return new Promise((resolve, reject) => {
    User.findOne({ clerk_id: unique_id }).select('lobbies')
      .then(({ lobbies }) => {
        return Lobby.find({ _id: { $in: lobbies }})
      })
      .then((lobbyData) => {
        console.log(lobbyData)
        resolve(lobbyData)
      })
      .catch((err) => reject(err))
  })
}

module.exports = {
  createLobby,
  getLobbies,
}