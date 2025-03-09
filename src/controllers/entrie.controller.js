const Entrie = require('../models/entrie.model')

exports.createEntrie = async (req, res) => {
    try {
        const { title, description, data, userId } = req.body;
        const entrie = new Entrie({
            title,
            description,
            data,
            user: req.userData._id
        });
        await entrie.save();
        res.status(201).json({ message: 'Entrie created successfully!', entrie });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.returnAllEntries = async (req, res) => {
    try {
        const entries = await Entrie.find({ user: req.userData._id });
        res.status(200).json(entries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.returnEntrieById = async (req, res) => {
    try {
        const { entrieId } = req.params;
        const entrie = await Entrie.findOne({ _id: entrieId, user: req.userData._id });
        if (!entrie) {
            return res.status(404).json({ message: 'Entrie not found!' });
        }
        res.status(200).json(entrie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateEntrie = async (req, res) => {
    try {
        const { entrieId } = req.params;
        const { title, description, data } = req.body;
        const entrie = await Entrie.findOne({ _id: entrieId, user: req.userData._id });
        if (!entrie) {
            return res.status(404).json({ message: 'Entrie not found!' });
        }
        entrie.title = title;
        entrie.description = description;
        entrie.data = data;
        await entrie.save();
        res.status(200).json({ message: 'Entrie updated successfully!', entrie });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteEntrie = async (req, res) => {
    try {
        const { entrieId } = req.params;
        const entrie = await Entrie.findOneAndDelete ({ _id: entrieId, user: req.userData._id });
        if (!entrie) {
            return res.status(404).json({ message: 'Entrie not found!' });
        }
        res.status(200).json({ message: 'Entrie deleted successfully!', entrie });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
