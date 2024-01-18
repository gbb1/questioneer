const { User, Lobby } = require("./index.js");

const createNewUser = async (userData) => {
  const { clerk_id, email } = userData;

  const newUser = await User.findOneAndUpdate(
    { clerk_id },
    { email, created: new Date() },
    { upsert: true, new: true }
  );
};

const testCreateUser = async () => {
  return new Promise((resolve, reject) => {
    const testUser = new User({
      username: "Test User",
      clerk_id: "asdf",
    });

    testUser
      .save()
      .then((user) => User.find({ _id: user._id }))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  });
};

const findUserById = async (clerk_id) => {
  return User.findOne({ clerk_id })
    .then(async (data) => {
      const lobbies = await Lobby.find({ _id: { $in: data.lobbies } }).sort({ created: 'desc' })
      data.lobbies = lobbies;
      return data
    })
    .catch((err) => console.log(err));
};

const createGuest = async (userData) => {
  const { username } = userData;
  const unique_id = generateGuestId();

  console.log(unique_id)

  const newUser = await User.findOneAndUpdate(
    { clerk_id: unique_id },
    { username, created: new Date() },
    { upsert: true, new: true }
  );

  return { id: newUser.clerk_id, username };
};


const setUsername = async (userData) => {
  const { id, username } = userData;
  // console.log(unique_id, username)
  if (!username) return

  const newUser = await User.findOneAndUpdate(
    { clerk_id: id },
    { username },
    { new: true })
}

const generateGuestId = () => {
  const pattern = "xxxxxxxx";
  return pattern.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return "G-" + v.toString(16).toUpperCase();
  });
};


// const getUserData = async (userData) => {
//   const { id } = userData


// }

module.exports = {
  testCreateUser,
  findUserById,
  createNewUser,
  createGuest,
  setUsername,
};
