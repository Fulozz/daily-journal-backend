const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const Schema = mongoose.Schema;

const entrieSchema = new Schema({
    content: { type: String, required: true},
    title: { type: String, required: true},
    userId: { type: String, required: true}
    },{
    timestamps: true,
    collection: 'entries'
});



const Entrie = mongoose.model('Entrie', entrieSchema);

module.exports = Entrie;