const { User, Lobby } = require('./index.js');

const testCreateUser = async () => {
  return new Promise((resolve, reject) => {
    const testUser = new User({
      username: 'Test User',
      clerk_id: 'asdf'
    })

    testUser.save()
      .then((user) => User.find({ _id: user._id }))
      .then((res) => {
        console.log(res)
      })
      .catch(err => console.log(err))
  })
}

module.exports = {
  testCreateUser,
}