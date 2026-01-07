function addStudent() {
  const nameInput = document.getElementById("name");
  const rollInput = document.getElementById("roll");
  const emailInput = document.getElementById("email");
  const deptInput = document.getElementById("dept");

  fetch("http://localhost:3000/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameInput.value,
      roll: rollInput.value,
      email: emailInput.value,
      dept: deptInput.value
    })
  })
  .then(() => {
    loadStudents();
    nameInput.value = "";
    rollInput.value = "";
    emailInput.value = "";
    deptInput.value = "";
  });
}

function loadStudents() {
  fetch("http://localhost:3000/students")
    .then(res => res.json())
    .then(data => {
        
      cards.innerHTML = "";
      data.forEach(s => {
        cards.innerHTML += `
  <div class="card">
    <p><b>Name:</b> ${s.name}</p>
    <p><b>Roll:</b> ${s.roll}</p>
    <button class="view-btn" onclick="viewStudent(${s.id})">View</button>
    <button class="edit-btn" onclick="editStudent(${s.id})">Edit</button>
    <button class="delete-btn" onclick="deleteStudent(${s.id})">Delete</button>
  </div>
`;

      });
    });
}

function viewStudent(id) {
  fetch("http://localhost:3000/students")
    .then(res => res.json())
    .then(data => {
      const s = data.find(st => st.id === id);
      alert(
        `Name: ${s.name}\nRoll: ${s.roll}\nEmail: ${s.email}\nDept: ${s.dept}`
      );
    });
}

function editStudent(id) {
  const newName = prompt("Enter new name");
  fetch(`http://localhost:3000/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName })
  }).then(() => loadStudents());
}

function deleteStudent(id) {
  fetch(`http://localhost:3000/students/${id}`, {
    method: "DELETE"
  }).then(() => loadStudents());
}

loadStudents();