import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../app/index'; // Adjust path to your Home screen
import EditTaskScreen from '../app/EditTaskScreen'; // Adjust path to your Edit screen

// Define the parameter list for the stack navigator
export type HomeStackParamList = {
  HomeScreen: undefined;
  EditTaskScreen: { taskId: string; taskTitle: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      {/* Home screen */}
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* Edit Task screen */}
      <Stack.Screen
        name="EditTaskScreen"
        component={EditTaskScreen}
        options={{ title: 'Edit Task' }}
      />
    </Stack.Navigator>
  );
}
