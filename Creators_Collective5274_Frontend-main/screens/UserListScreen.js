import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "./UserContext";

const backend_server_url = "http://192.168.2.147:5000";

export default function UserListScreen({ route }) {
  const { username: loggedInUsername } = useUserContext();
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("This is from the login screen" + loggedInUsername);
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backend_server_url}/api/users`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => {
              navigation.navigate("ChatScreen", {
                receiverUsername: item.username,
                username: loggedInUsername,
              });
            }}
          >
            <Text style={styles.username}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  username: {
    fontSize: 18,
  },
});
