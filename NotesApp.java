import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import java.io.*;
import java.util.ArrayList;

public class NotesApp extends Application {

    private static final int MAX_NOTES = 20;
    private static final String FILE_NAME = "notes.txt";

    private ArrayList<String> notes = new ArrayList<>();

    private TextArea notesDisplay; // needs to be accessible everywhere

    @Override
    public void start(Stage stage) {

        loadNotes();

        Label titleLabel = new Label("My Notes");
        titleLabel.setStyle("-fx-font-size: 22px; -fx-font-weight: bold;");

        // Input for adding notes
        TextField noteInput = new TextField();
        noteInput.setPromptText("Enter a note...");
        noteInput.setPrefWidth(260);

        // Input for deleting notes
        TextField deleteInput = new TextField();
        deleteInput.setPromptText("Enter number to delete...");
        deleteInput.setPrefWidth(260);

        // Display area
        notesDisplay = new TextArea();
        notesDisplay.setPrefHeight(180);
        notesDisplay.setEditable(false);
        notesDisplay.setWrapText(true);

        // Buttons
        Button addButton = new Button("Add Note");
        Button deleteButton = new Button("Delete Note");

        addButton.setPrefWidth(200);
        deleteButton.setPrefWidth(200);

        // ------------------ BUTTON LOGIC ------------------

        // ADD
        addButton.setOnAction(e -> {
            String note = noteInput.getText().trim();

            if (note.isBlank()) {
                notesDisplay.setText("⚠️ Note cannot be empty.");
                return;
            }

            if (notes.size() >= MAX_NOTES) {
                notesDisplay.setText("⚠️ Max limit reached (20 notes).");
                return;
            }

            notes.add(note);
            saveNotes();
            noteInput.clear();

            refreshDisplay();
        });

        // DELETE
        deleteButton.setOnAction(e -> {
            String input = deleteInput.getText().trim();

            int index;
            try {
                index = Integer.parseInt(input);
            } catch (Exception ex) {
                notesDisplay.setText("⚠️ Enter a valid number.");
                return;
            }

            if (index < 1 || index > notes.size()) {
                notesDisplay.setText("⚠️ Invalid note number.");
                return;
            }

            notes.remove(index - 1);
            saveNotes();
            deleteInput.clear();

            refreshDisplay();
        });

        // ------------------ LAYOUT ------------------

        VBox layout = new VBox(12);
        layout.setPadding(new Insets(20));
        layout.setAlignment(Pos.CENTER);

        layout.getChildren().addAll(
                titleLabel,
                noteInput,
                addButton,
                deleteInput,
                deleteButton,
                notesDisplay
        );

        Scene scene = new Scene(layout, 350, 450);

        stage.setTitle("Notes App");
        stage.setScene(scene);
        stage.setResizable(false);
        stage.show();

        refreshDisplay();
    }

    // ------------------ DISPLAY ------------------

    private void refreshDisplay() {
        if (notes.isEmpty()) {
            notesDisplay.setText("No notes yet.");
            return;
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < notes.size(); i++) {
            sb.append(i + 1).append(". ").append(notes.get(i)).append("\n");
        }

        notesDisplay.setText(sb.toString());
    }

    // ------------------ FILE LOAD ------------------

    private void loadNotes() {
        File file = new File(FILE_NAME);

        if (!file.exists()) return;

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (!line.isBlank()) {
                    notes.add(line);
                }
            }
        } catch (IOException e) {
            System.out.println("Error loading notes.");
        }
    }

    // ------------------ FILE SAVE ------------------

    private void saveNotes() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_NAME))) {
            for (String note : notes) {
                writer.write(note);
                writer.newLine();
            }
        } catch (IOException e) {
            System.out.println("Error saving notes.");
        }
    }

    public static void main(String[] args) {
        launch(args);
    }
}
