//=========================================
//Get the required module =================
//=========================================
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]

})

module.exports = mongoose.model('User', userSchema)