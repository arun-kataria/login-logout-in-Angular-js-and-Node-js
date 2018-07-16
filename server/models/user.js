var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    objectId = mongoose.Schema.ObjectId;

var userSchema = new Schema({
    _id: { type: objectId, auto: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, default:'User', trim: true  },
    userName: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true }
}, {
    versionKey: false
});

var user = mongoose.model('users', userSchema);

module.exports = user;