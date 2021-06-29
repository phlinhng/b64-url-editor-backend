// External Dependancies
const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
    user: String,
    pwd: String,
    encrypted: String
});

  module.exports = mongoose.model('Sub', subSchema);