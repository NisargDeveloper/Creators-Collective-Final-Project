import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import DashboardTabs from "./screens/DashboardScreen";
import SelectMoodScreen from "./screens/SelectMoodScreen";
import MakeJournalScreen from "./screens/MakeJournalScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { UserProvider } from "./screens/UserContext";
import DataDetailScreen from "./screens/DataDetailScreen";
const Stack = createStackNavigator();
import ChatScreen from "./screens/ChatScreen";
import UsersListScreen from "./screens/UserListScreen";
// import { UserProvider } from "./screens/UserContext";

// const Tab = createBottomTabNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UsersList" component={UsersListScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};
const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" headerShown="false">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="Dashboard"
            component={DashboardTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SelectMood" component={SelectMoodScreen} />
          <Stack.Screen name="MakeJournal" component={MakeJournalScreen} />
          <Stack.Screen name="Chat" component={ChatStack} />
          <Stack.Screen name="DataDetail" component={DataDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
