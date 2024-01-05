const { User, Lobby } = require("./index.js");

const createNewUser = async (userData) => {
  const { clerk_id, email } = userData;

  const newUser = await User.findOneAndUpdate(
    { clerk_id },
    { email },
    { upsert: true, new: true }
  )

  // return new Promise((resolve, reject) => {
  //   const newUser = new User({
  //     clerk_id,
  //     email,
  //     created: new Date(),
  //   });

  //   newUser.save().catch((err) => console.log(err));
  // });
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
    .then((data) => data)
    .catch((err) => new Error(err));
};

module.exports = {
  testCreateUser,
  findUserById,
  createNewUser,
};
