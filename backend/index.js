//This code importing external modules
//and setting the environment variables.

const express = require("express"),
  app = express(),
  port = process.env.PORT || 8080,
  cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

//code sets up our express application
//and returns a message back to console once our application is running.

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.listen(port, () => console.log("Backend server live on " + port));

//code returns a message once a GET request to the specified route is made.

app.get("/", (req, res) => {
  res.send({ message: "Connected to Backend server!" });
});

//code makes a call the addItem function once a POST request to the specified route is made.

app.post("/add/item", addItem);

//code takes in a request body from the Todo List Application which represents a todo item.
// The body is then converted into a new json object called newTask to represent the new todo item.
// The new json object is finally appended to a json list located in a file called database.json to represent our todos list.

function addItem(request, response) {
  let id = request.body.jsonObject.id;
  let task = request.body.jsonObject.task;
  let curDate = request.body.jsonObject.currentDate;
  let dueDate = request.body.jsonObject.dueDate;
  var newTask = {
    ID: id,
    Task: task,
    Current_date: curDate,
    Due_date: dueDate,
  };
  const jsonString = JSON.stringify(newTask);

  var data = fs.readFileSync("database.json");
  var json = JSON.parse(data);
  json.push(newTask);
  fs.writeFile("database.json", JSON.stringify(json), function (err, result) {
    if (err) {
      console.log("error", err);
    } else {
      console.log("Successfully wrote to file");
    }
  });
  response.send(200);
}
