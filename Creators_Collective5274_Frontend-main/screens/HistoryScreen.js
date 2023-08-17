import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import axios from "axios";
//import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from "@react-navigation/native";

const HistoryScreen = () => {
  const [journalEntries, setJournalEntries] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.2.147:5000/journalentry/fetchJournalEntries"
      );
      setJournalEntries(response.data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    }
  };

  useEffect(() => {
    // Fetch data from MongoDB
    fetchData();
  }, [journalEntries]);

  const renderItem = ({ item }) => {
    const formattedDate = new Date(item.date).toLocaleDateString();
    return (
      <View style={styles.entryContainer}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text>{item.moodEmoji}</Text>
        <Text style={styles.moodText}>Mood: {item.mood}</Text>
        <Text style={styles.entryText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.droidSafeArea}>
        <FlatList
          data={journalEntries.reverse()}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
    marginTop: 2,
  },

  moodText: {
    fontSize: 14,
    color: "green", // Adjust the color as needed
  },

  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  entryContainer: {
    marginTop: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  entryText: {
    fontSize: 14,
    color: "#333",
  },
});

export default HistoryScreen;
