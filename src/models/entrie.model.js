const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const Schema = mongoose.Schema;

const entrieSchema = new Schema({
    description: { type: String, required: true},
    title: { type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},{
    timestamps: true,
    collection: 'entries'
});



const Entrie = mongoose.model('Entrie', entrieSchema);

module.exports = Entrie;