import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Card, List, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"; // Import axios or your preferred HTTP client library

const CalendarScreen = forwardRef((props, ref) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [dataForSelectedDate, setDataForSelectedDate] = useState([]);
  const navigation = useNavigation();

  useImperativeHandle(ref, () => ({
    // You can keep other methods if needed
  }));

  useEffect(() => {
    if (selectedDate) {
      fetchDataForSelectedDate(selectedDate);
    }
  }, [selectedDate]);

  const fetchDataForSelectedDate = async (date) => {
    try {
      const response = await axios.get(
        `http://192.168.2.147:5000/journalentry/fetchdateJournalEntries?selectedDate=${date}`
      );
      setDataForSelectedDate(response.data);
    } catch (error) {
      console.error("Error fetching data for selected date:", error);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleDataItemClick(item.text)}
    >
      <List.Item
        title={item.text}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon={() => <Text style={styles.moodEmoji}>{item.moodEmoji}</Text>}
          />
        )}
      />
    </TouchableOpacity>
  );
  const handleDataItemClick = (description) => {
    // Navigate to DataDetailScreen with the description
    navigation.navigate("DataDetail", { description });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.droidSafeArea}>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={{
            [selectedDate]: { selected: true, marked: true },
          }}
        />
        {selectedDate !== "" && (
          <Card style={styles.card}>
            <Card.Title
              title={`Saved Data for ${selectedDate}`}
              titleStyle={styles.cardTitle}
            />
            <Card.Content>
              <FlatList
                data={dataForSelectedDate}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            </Card.Content>
          </Card>
        )}
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listItem: {
    marginVertical: 5,
  },
  emoji: {
    fontSize: 55,
  },
});

export default CalendarScreen;
