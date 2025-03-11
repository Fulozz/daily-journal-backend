const Entrie = require('../models/entrie.model')

exports.createEntrie = async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        const entrie = new Entrie({
            title,
            content,
            userId: userId
        });
        await entrie.save();
        res.status(201).json({ message: 'Entrie created successfully!', entrie });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.returnAllEntries = async (req, res) => {
    const userId = req.userData._id;;
    if(!userId) {
        return res.status(400).json({ message: 'User id is required!' });
    }
    try {
        const entries = await Entrie.find({ userId: userId});
        res.status(200).json(entries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.returnEntrieById = async (req, res) => {
    try {
        const { entrieId } = req.params;
        const entrie = await Entrie.findOne({ _id: entrieId, userId: req.userId });
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
        const { title, content, userId } = req.body;
        const entrie = await Entrie.findOne({ _id: entrieId, user: req.userId });
        if (!entrie) {
            return res.status(404).json({ message: 'Entrie not found!' });
        }
        entrie.title = title;
        entrie.content = content;
        await entrie.save();
        res.status(200).json({ message: 'Entrie updated successfully!', entrie });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteEntrie = async (req, res) => {
    try {
        const userId = req.userData._id;
        const  entrieId = req.params.entrieId;
        const entrie = await Entrie.findOne({ _id: entrieId, user: userId });
        if (!entrie) {
            return res.status(404).json({ message: 'Entrie not found!' });
        }

        const entrieDelete = await entrie.findOneAndDelete({ _id: entrieId, userId: userId});
        if(entrieDelete){
            return res.status(200).json({ message: 'Entrie deleted successfully!', entrie });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}