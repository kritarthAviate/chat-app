const app = require("./app");

const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}`);
});
