# 📝 Notes App (JavaFX)

A simple desktop Notes App built using Java and JavaFX.
This app allows users to add, view, and delete notes with persistent storage.

---

## 🚀 Features

* ➕ Add notes
* 📋 View all notes
* ❌ Delete notes
* 💾 Automatic saving to file (`notes.txt`)
* ⚠️ Input validation (no empty notes, max 20 notes)

---

## 🛠️ Tech Stack

* Java
* JavaFX
* File Handling (BufferedReader / BufferedWriter)

---

## 📂 Project Structure

```
NotesApp/
│
├── NotesApp.java
└── notes.txt (auto-created)
```

---

## ▶️ How to Run

### 1. Install Requirements

* Java JDK 17 or above
* JavaFX SDK (same version as your Java)

---

### 2. Compile

```
javac --module-path javafx-sdk/lib --add-modules javafx.controls NotesApp.java
```

---

### 3. Run

```
java --module-path javafx-sdk/lib --add-modules javafx.controls NotesApp
```

---

## 🧠 How It Works

* Notes are stored in an `ArrayList<String>`
* Data is saved to `notes.txt` after every change
* On startup, notes are loaded from the file
* UI is built using JavaFX (`VBox`, `TextField`, `TextArea`, `Button`)

---

## ⚠️ Notes

* `notes.txt` will be created automatically when the app runs
* Do not delete the file while the app is running
* Maximum limit: 20 notes

---

## 🔮 Future Improvements

* ✏️ Edit notes
* 🔍 Search functionality
* 🏷️ Tags for notes
* 🎨 Improved UI design

---

## 👨‍💻 Author

Built as a beginner project to learn JavaFX and file handling.
