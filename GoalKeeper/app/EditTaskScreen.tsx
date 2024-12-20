import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/HomeStack';

type EditTaskScreenRouteProp = RouteProp<HomeStackParamList, 'EditTaskScreen'>;

export default function EditTaskScreen() {
  const route = useRoute<EditTaskScreenRouteProp>();
  const { taskId, taskTitle } = route.params;

  // State to manage the task title being edited
  const [editedTitle, setEditedTitle] = useState(taskTitle);

  const handleSave = () => {
    // This only logs the change on console
    console.log(`Task ID: ${taskId} - New Title: ${editedTitle}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Task</Text>

      {/* Editable task title */}
      <TextInput
        style={styles.input}
        value={editedTitle}
        onChangeText={setEditedTitle}
        placeholder="Edit task title"
      />

      {/* Save button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskId: {
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
  },
});
