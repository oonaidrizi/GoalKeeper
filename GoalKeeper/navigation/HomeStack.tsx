import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../app/index';
import EditTaskScreen from '../app/EditTaskScreen';

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
