import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MakeJournalScreen from "./MakeJournalScreen";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const SelectMoodScreen = () => {
  const navigation = useNavigation();
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString(); // Convert to string or any other format you prefer

  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [markedDates, setMarkedDates] = useState({
    [formattedDate]: { selected: true, marked: true },
  });

  const handleMoodSelect = async (moodName) => {
    try {
      console.log("Selected Date:", selectedDate);

      // Find the selected mood object by its name
      const selectedMood = moods.find((m) => m.name === moodName);

      if (selectedMood) {
        const selectedEmoji = selectedMood.emoji;

        // Make an API call to the backend to save the selected mood
        const response = await axios.post(
          "http://192.168.2.147:5000/mood/saveMoodEntry",
          {
            mood: moodName,
            moodEmoji: selectedEmoji,
            date: selectedDate,
          }
        );

        // Handle the response (e.g., show success message)
        if (response.data && response.data.message) {
          console.log(response.data.message);
          navigation.navigate("MakeJournal", {
            moodEmoji: selectedEmoji,
            mood: moodName,
            selectedDate: selectedDate,
          });
        } else {
          console.log("Unknown response from the backend:", response.data);
        }
      }
    } catch (error) {
      // Handle the error (e.g., show error message)
      console.error("Mood Save Error:", error);
    }
  };

  // Function to handle date selection from the calendar
  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);

    // Update markedDates object to show the selected date
    setMarkedDates({ [date.dateString]: { selected: true, marked: true } });
  };

  // Define mood emojis and their names
  const moods = [
    { emoji: "😄", name: "Happy" },
    { emoji: "😢", name: "Sad" },
    { emoji: "😠", name: "Angry" },
    { emoji: "😴", name: "Tired" },
    { emoji: "😟", name: "Anxious" },
    { emoji: "😖", name: "Stressed" },
    { emoji: "😎", name: "Confident" },
    { emoji: "🙏", name: "Hopeful" },
    { emoji: "😔", name: "Lonely" },
    { emoji: "🤩", name: "Excited" },
    { emoji: "💪", name: "Motivated" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Select Your Mood Today</Text>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={markedDates} // Pass the markedDates object to the Calendar component
          theme={{
            todayTextColor: "blue", // Set the color of the current date dot
            selectedDayBackgroundColor: "#2ecc71", // Set the color of the selected date dot
            selectedDayTextColor: "#ffffff", // Set the text color of the selected date dot
          }}
        />
      </View>
      <View style={styles.selectedDateContainer}>
        <Text style={styles.sectionHeading}>Selected Date</Text>
        <Text style={styles.selectedDateText}>{selectedDate}</Text>
      </View>
      <View style={styles.currentTimeContainer}>
        <Text style={styles.sectionHeading}>Current Time</Text>
        <Text style={styles.currentTimeText}>
          {new Date().toLocaleTimeString()}
        </Text>
      </View>
      <View style={styles.moodContainer}>
        <Text style={styles.sectionHeading}>Select Mood</Text>
        <View style={styles.moodItemsContainer}>
          {moods.map((mood, index) => (
            <TouchableOpacity
              key={index}
              style={styles.moodButton}
              onPress={() => handleMoodSelect(mood.name)} // Pass the mood name to handleMoodSelect
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodName}>{mood.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  selectedDateContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  selectedDateText: {
    fontSize: 16,
    color: "#333",
  },
  currentTimeContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  currentTimeText: {
    fontSize: 16,
    color: "#333",
  },
  moodContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  moodItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  moodButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  moodEmoji: {
    fontSize: 30,
  },
  moodName: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
});

export default SelectMoodScreen;
