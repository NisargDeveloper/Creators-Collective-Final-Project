// MakeJournalScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import axios from "axios"; // Import axios to make API requests
import { useNavigation, useRoute } from "@react-navigation/native";
// Create an instance of axios with the base URL
/*const api = axios.create({
  baseURL: 'http://192.168.2.30',
});*/

const MakeJournalScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { moodEmoji, mood, selectedDate } = route.params;
  //const { fetchData } = route.params;
  const [journalText, setJournalText] = useState("");

  const handleSaveJournal = async () => {
    try {
      // Make an API call to the backend to save the journal entry
      const response = await axios.post(
        "http://192.168.2.147:5000/journalentry/saveJournalEntry",
        {
          moodEmoji: moodEmoji,
          mood: mood,
          selectedDate: selectedDate,
          journalText: journalText,
        }
      );
      /*Call the fetchData function here to refresh the history screen
      if (fetchData) {
        fetchData();
      }*/
      // Handle the response (e.g., show success message)
      console.log(response.data.message);

      // Navigate back to the previous screen after saving the journal entry
      navigation.navigate("History");
    } catch (error) {
      // Handle the error (e.g., show error message)
      console.error("Journal Entry Save Error:", error);
    }
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss(); // Dismiss the keyboard when user taps on the screen
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.heading}>How are you feeling? {mood}</Text>
        <TextInput
          style={styles.journalInput}
          multiline
          placeholder="Write your thoughts, feelings, and activities here..."
          value={journalText}
          onChangeText={setJournalText}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveJournal}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  journalInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "blue",
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MakeJournalScreen;
