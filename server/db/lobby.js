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

const createNewLobby = async (unique_id) => {
  let lobby_id = generateLobbyId().toUpperCase();
  let existing = await Lobby.findOne({ lobby_id })

  while (existing) {
    let lobby_id = generateLobbyId().toUpperCase();
    let existing = await Lobby.findOne({ lobby_id })
  }

  return new Promise((resolve, reject) => {
    findUserById(unique_id)
      .then(async (data) => {

        const newLobby = new Lobby({
          lobby_id,
          admin: data._id,
          created: new Date(),
        })

        const lobby = await newLobby.save()
        resolve(lobby)
      })
      .catch((err) => {
        new Error(err)
        console.log(err)
        reject(err)
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

const joinLobby = async (player_id, lobby_id) => {
  return new Promise((resolve, reject) => {
    let user_id;
    User.findOne({ clerk_id: player_id }).select('_id')
      .then(data => {
        user_id = data._id;
        return Lobby.findOneAndUpdate({ lobby_id }, { $push: { members: user_id } }, { upsert: true, new: true })
      })
      .then((lobby) => {
        const lobby_key = lobby._id
        return User.findOneAndUpdate({ _id: user_id }, { $push: { lobbies: lobby_key } }, { upsert: false, new: true })
      })
      .then(res => {
        console.log('res', res)
        resolve(res)
      })
      .catch((err) => reject(err))
  })
}


const leaveLobby = async (player_id, lobby_id) => {
  return new Promise((resolve, reject) => {
    let lobby_id;
    let user_id
    User.findOne({ clerk_id: player_id }).select('_id')
      .then(data => {
        console.log('player', data)
        user_id = data._id
        return Lobby.findOneAndUpdate({ lobby_id }, { $pull: { members: user_id } }, { upsert: true, new: true })
      })
      .then((lobby) => {
        console.log('Lobby after left', lobby)
        lobby_id = lobby._id;
        if (lobby.members.length === 0) {
          console.log('here', lobby_id)
          return Lobby.deleteOne({ _id: lobby_id})
        }
      })
      .then((res) => {
        console.log(res)
        return User.findOneAndUpdate({ _id: user_id }, { $pull: { lobbies: lobby_id }}, { upsert: true, new: true })
      })
      .then(res => {
        console.log('res', res)
        // Lobby.save()
        // User.save()
        resolve("deleted")
      })
      .catch((err) => reject(err))
  })
}

// Lobby.deleteOne({ lobby_id: "F0DD" }).then((res) => console.log(res))

Lobby.deleteMany({ members: [] }).then((res) => console.log('cleaned!', res))


const leaveLobby2 = async (player_id, lobby_id) => {
  return new Promise(async (resolve, reject) => {
    // let lobby_id;
    // let user_id

  //   const lobbyIdData = await Lobby.findOneAndUpdate({ lobby_id: lobby_id }).select('_id')
  //   console.log('1', lobbyIdData)
  //   const userData = await User.findOneAndUpdate({ lobbies: lobbyIdData._id }, { $pullAll: { "lobbies": [lobbyIdData._id] } }, { upsert: true, new: true })
  //   console.log('2', userData)
  //   const lobbyAfterDelete = await Lobby.findOneAndUpdate({ _id: lobbyIdData._id }, { $pullAll: { members: [userData._id] } }, { upsert: true, new: true })
  //   let finalRes = null
  //   if (lobbyAfterDelete.members.length === 0) {
  //     finalRes = await Lobby.deleteOne({ _id: lobby._id })
  //   }

  //   resolve(finalRes)
  // })
    Lobby.findOne({ lobby_id })
      .then((lobby) => {
        // console.log(lobby)
        return User.findOneAndUpdate({ clerk_id: player_id }, { $pull: { lobbies: lobby._id } }, { new: true })
      })
      .then((user) => {
        console.log(user)
        return Lobby.findOneAndUpdate({ lobby_id }, { $pull: { members: user._id } }, { new: true } )
      })
      .then((lobby) => {
        console.log(lobby)
        if (lobby?.members?.length === 0) {
          return Lobby.deleteOne({ _id: Lobby._id })
        } else {
          return Lobby.findOneAndUpdate({ _id: Lobby._id }, { admin: lobby.members[0] }, { new: true } )
        }
      })
      .then((res) => {
        console.log(res)
        resolve(res)
      })
      .catch((err) => reject(err))

    // Lobby.findOneAndUpdate({ lobby_id: lobby_id }).select('_id')
    //   .then((data) => {
    //     lobby_id = data._id
    //     console.log('lobid', data._id)
    //     return User.findOneAndUpdate({ lobbies: data._id }, { $pull: { lobbies: data._id } }, { upsert: true, new: true })
    //   })
    //   .then((res) => {
    //     user_id = res._id
    //     console.log("user id", res._id)
    //     return Lobby.findOneAndUpdate({ lobby_id: lobby_id }, { $pull: { members: res._id } }, { upsert: true, new: true })
    //   })
    //   .then(async (lobby) => {
    //     return new Promise((resolve) => {
    //       console.log('lobby', lobby, lobby?.members)
    //       let out = null
    //       if (lobby?.members?.length === 0) {
    //          resolve(Lobby.deleteOne({ _id: lobby._id }))
    //       } else {
    //         resolve(out);
    //       }
    //     })
    //   })
    //   .then((res) => {
    //     console.log('OUT', res)
    //     resolve("deleted")
    //   })
    //   .catch((err) => reject(err))
  })
}

module.exports = {
  createLobby,
  getLobbies,
  createNewLobby,
  joinLobby,
  leaveLobby,
  leaveLobby2,
}