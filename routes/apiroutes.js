const fs = require("fs");

const router = require("express").Router();
const notes = require("../db/db.json");

//all notes
router.get("/", (req, res) => {
  let existingNotes = JSON.parse(fs.readFileSync("../db/db.json", "utf-8"));

  res.json(existingNotes);
});

//make note
router.post("/", (req, res) => {
  let existingNotes;
  const newNote = req.body;
  console.log(newNote);

  fs.readFile("../db/db.json", function (err, data) {
    if (err) {
      throw err;
    }
    existingNotes = JSON.parse(data);

    existingNotes.push(newNote);
    console.log(existingNotes);

    fs.writeFile("./db/db.json", JSON.stringify(existingNotes), (err) =>
      err ? console.log(err) : console.log("Done")
    );
  });

  res.send(existingNotes);

});

// delete
router.delete("/:id", (req, res) => {
  let existingNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));

  let foundID = parseInt(req.params.id);
  console.log(foundID);
  let updatedNotes = existingNotes.filter(
    (checkNotes) => checkNotes.id !== foundID
  );

  fs.writeFileSync("./db/db.json", JSON.stringify(updatedNotes), "utf-8");

  res.json(updatedNotes);
  console.log(updatedNotes);
});

module.exports = router;
