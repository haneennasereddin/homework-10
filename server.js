const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const apiRoutes = require("./routes/apiroutes");
const htmlRoutes = require("./routes/htmlroutes");

const PORT = process.env.PORT || 3000;

// statfolder
app.use(express.static(path.join(__dirname, "public")));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//notes-api routes
app.use("/api/notes", apiRoutes);

//html routes
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
