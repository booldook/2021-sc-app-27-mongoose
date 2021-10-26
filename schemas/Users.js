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

userSchema.statics.login = async function(_id, _pw) {
  try {
    const user = await this.findOne({ userid: _id })
    const rs = await bcrypt.compare(_pw, user.userpw)
    return rs ? user : null
  }
  catch(err) {
    throw new Error(err)
  }
}

userSchema.statics.findByName = async function(_name) {
  try {
    return await this.find({ username: _name })
  }
  catch(err) {
    throw new Error(err)
  }
}


module.exports = mongoose.model('Users', userSchema)