const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/dist"));
app.get("*", (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port}`);
});
