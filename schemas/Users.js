const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose

const schema = {
  userid: {
    type: String,
    require: true,
    unique: true
  },
  username: {
    type: String,
    require: true,
  },
  userpw: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
const userSchema = new Schema(schema)

userSchema.pre('save', async function (next) {
  try {
    this.userpw = await bcrypt.hash(this.userpw, 8)
    next()
  }
  catch(err) {
    next(err)
  }
})


module.exports = mongoose.model('Users', userSchema)