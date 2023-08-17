import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios"; // Import axios for API calls

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleRegister = () => {
    // Implement registration logic here
    // For now, we will make an API call to the backend for registration
    axios
      .post("http://192.168.2.147:5000/user/register", {
        username,
        password,
        email,
        age,
        gender,
      })
      .then((response) => {
        // Handle the registration success (e.g., show success message)
        // For now, we will just navigate back to the LoginScreen
        navigation.goBack();
      })
      .catch((error) => {
        // Handle the registration error (e.g., show error message)
        console.error("Registration Error:", error);

        if (error.response) {
          // Check if it's a validation error
          if (error.response.data.errors && error.response.data.errors.gender) {
            // Show an alert with the validation error message
            alert(error.response.data.errors.gender.message);
          } else if (error.response.data.code === 11000) {
            // Show an alert for duplicate email
            alert(
              "This email is already registered. Please use a different email."
            );
          } else {
            // Show a generic error message for other errors
            alert("Registration failed. Please try again later.");
          }
        } else if (error.response && error.response.status === 400) {
          // Username already exists, show user-friendly error message
          Alert.alert(
            "Error",
            "Username already exists. Please choose a different username."
          );
        } else {
          // Show a generic error message if the server didn't respond
          alert(
            "Unable to connect to the server. Please check your internet connection."
          );
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Email" // New field for email
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Age" // New field for age
        keyboardType="numeric"
        value={age}
        onChangeText={(text) => setAge(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender" // New field for gender
        value={gender}
        onChangeText={(text) => setGender(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>
          Already have an account? Login here.
        </Text>
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
  linkText: {
    color: "blue",
    marginTop: 10,
  },
});

export default RegisterScreen;
