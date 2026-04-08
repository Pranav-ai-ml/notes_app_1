let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editId = null;

const grid = document.getElementById("notesGrid");
const searchInput = document.getElementById("searchInput");

function saveToStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function render(filter = "") {
  grid.innerHTML = "";

  const filtered = notes.filter(note =>
    note.title.toLowerCase().includes(filter.toLowerCase()) ||
    note.desc.toLowerCase().includes(filter.toLowerCase()) ||
    note.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()))
  );

  filtered.forEach(note => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.desc}</p>
      <div class="tags">
        ${note.tags.map(tag => `<span class="tag" onclick="filterTag('${tag}')">${tag}</span>`).join("")}
      </div>
      <div class="actions">
        <button onclick="openEdit(${note.id})">Edit</button>
        <button onclick="deleteNote(${note.id})">Delete</button>
      </div>
    `;

    grid.appendChild(card);
  });
}

function addNote() {
  const title = document.getElementById("noteTitle").value;
  const desc = document.getElementById("noteDesc").value;
  const tags = document.getElementById("noteTags").value.split(",").map(t => t.trim());

  if (!title) return;

  notes.push({
    id: Date.now(),
    title,
    desc,
    tags
  });

  saveToStorage();
  render();

  document.getElementById("noteTitle").value = "";
  document.getElementById("noteDesc").value = "";
  document.getElementById("noteTags").value = "";
}

function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  saveToStorage();
  render();
}

function openEdit(id) {
  editId = id;
  const note = notes.find(n => n.id === id);

  document.getElementById("editTitle").value = note.title;
  document.getElementById("editDesc").value = note.desc;

  document.getElementById("editModal").style.display = "flex";
}

function saveEdit() {
  const note = notes.find(n => n.id === editId);

  note.title = document.getElementById("editTitle").value;
  note.desc = document.getElementById("editDesc").value;

  saveToStorage();
  closeModal();
  render();
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

function filterTag(tag) {
  render(tag);
}

searchInput.addEventListener("input", e => {
  render(e.target.value);
});

render();
