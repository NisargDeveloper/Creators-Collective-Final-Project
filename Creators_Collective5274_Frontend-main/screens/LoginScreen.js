import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useUserContext } from "./UserContext"; //for API calls
import DashboardTabs from "./DashboardScreen";
const LoginScreen = () => {
  // const [username, setUsername] = useState("");
  const { username, setUsername } = useUserContext();
  const [password, setPassword] = useState("");

  const navigation = useNavigation(); // Initialize the navigation hook

  const handleLogin = async () => {
    try {
      // Make API call to the backend for login
      const response = await axios.post(
        "http://192.168.2.147:5000/user/login",
        {
          username,
          password,
        }
      );

      // Handle successful login here (e.g., save token and navigate to another screen)
      // navigation.navigate('SelectMood');
      // navigation.navigate("Dashboard");
      setUsername(username);
      navigation.navigate("Dashboard", { username });
    } catch (error) {
      // Handle login error
      if (error.response) {
        // The request was made, and the server responded with a status code
        if (error.response.status === 401) {
          Alert.alert("Error", "Invalid username or password");
        } else {
          Alert.alert("Error", "An error occurred. Please try again later.");
        }
      } else if (error.request) {
        // The request was made, but no response was received
        Alert.alert(
          "Error",
          "No response from the server. Please try again later."
        );
      } else {
        // Something else happened while setting up the request
        Alert.alert("Error", "An error occurred. Please try again later.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Diary Journal</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>
          Don't have an account? Register here.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText2}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "blue",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText2: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    color: "blue",
    marginTop: 10,
  },
});

export default LoginScreen;
