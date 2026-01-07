const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let students = []; // temporary storage
let idCounter = 1;

app.post("/students", (req, res) => {
  const student = { id: idCounter++, ...req.body };
  students.push(student);
  res.status(201).json(student);
});
app.get("/students", (req, res) => {
  res.json(students);
});
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.map(s =>
    s.id === id ? { ...s, ...req.body } : s
  );
  res.json({ message: "Updated successfully" });
});
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: "Deleted successfully" });
});
app.listen(3000, () => {
  console.log("Server running on port 5000");
});