import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import io from "socket.io-client";
import axios from "axios";
import { createBottomTabNavigator } from "react-navigation-tabs";

const backend_server_url = "http://192.168.2.147:5000";
const socket = io.connect(backend_server_url);

export default function ChatScreen({ route }) {
  const { receiverUsername, username } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  const room = [username, receiverUsername].sort().join("-");

  useEffect(() => {
    socket.on("receive-message", (data) => {
      if (data.room === room) {
        setMessages((prevMessages) => [...prevMessages, data.message]);
        console.log(data.message);
      }
    });

    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `${backend_server_url}/api/messages/${username}/${receiverUsername}`
        );
        const sortedMessages = response.data.messages.sort(
          (a, b) => new Date(a.time) - new Date(b.time)
        );
        setMessages(sortedMessages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();

    socket.emit("authenticate-user", { username });
    socket.emit("join-room", { room });

    return () => {
      socket.off("receive-message");
    };
  }, [room, receiverUsername, username]);

  const sendMessage = async () => {
    if (message.trim() === "") {
      return;
    }

    try {
      const newMessage = {
        sender: username,
        text: message,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit("send-message", {
        sender: username,
        receiver: receiverUsername,
        text: message,
        time: new Date().toLocaleTimeString(),
        room,
      });

      setMessages([...messages, newMessage]);
      setMessage("");

      scrollViewRef.current.scrollToEnd({ animated: true });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.messageContainer}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.message,
              msg.sender === username
                ? styles.senderMessage
                : styles.receiverMessage,
            ]}
          >
            <Text style={styles.text}>{msg.text}</Text>
            <Text style={styles.time}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  messageContainer: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: "80%",
  },
  senderMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C5",
  },
  receiverMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 16,
  },
  time: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    padding: 10,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 8,
    backgroundColor: "#F8F8F8",
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#007AFF",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
