const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { type } = require("os");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  creationDate: String,
});

const Note = mongoose.model("Note", noteSchema);

router.post("/notes", async (req, res) => {
  try {
    const note = new Note(req.body);
    // console.log(note);
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "Unable to create a note" });
  }
});

router.get("/notes/:content", async (req, res) => {
  console.log("search recieved");
  const contentToSearch = req.params.content;

  try {
    const notes = await Note.find({
      title: { $regex: contentToSearch, $options: "i" },
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch notes" });
  }
});

router.put("/notes/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let objectID = mongoose.Types.ObjectId;
    let newID = new objectID(id);
    const note = await Note.findByIdAndUpdate(newID, req.body, {
      new: true,
    });
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update the note" });
  }
});

router.delete("/notes/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let objectID = mongoose.Types.ObjectId;
    let newID = new objectID(id);
    const note = await Note.findByIdAndRemove(newID);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to delete the note" });
  }
});

module.exports = router;
