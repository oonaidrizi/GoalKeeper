import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, FlatList, Button, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

// Simulate a task list (in a real app, this would come from state or a backend)
const initialTasks = [
  { id: '1', title: 'You can add tasks here!', completed: false, important: false },
  { id: '2', title: 'Mark the tasks done', completed: true, important: false },
  { id: '3', title: 'And add the tasks important!', completed: false, important: true },
];

export default function HomeScreen() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState(''); // State for the input field

  // Function to render task items
  const renderTask = ({ item }: { item: { id: string, title: string, completed: boolean, important: boolean } }) => (
    <View style={styles.taskItem}>
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>
        {item.title}
      </Text>
      {/* Important button */}
      <TouchableOpacity
        style={styles.importantButton}
        onPress={() => toggleImportant(item.id)}
      >
        <Text style={styles.importantText}>
          {item.important ? '⭐' : '☆'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: (tasks.length + 1).toString(),
        title: newTask,
        completed: false,
        important: false, // New tasks are not important by default
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  // Function to toggle the "important" status of a task
  const toggleImportant = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, important: !task.important } : task
      )
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/checklist.jpg')}
        style={styles.reactLogo}
      />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">GoalKeeper!</ThemedText>
        <ThemedText type="subtitle">Your Tasks:</ThemedText>
      </ThemedView>

      {/* Input field for new task */}
      <TextInput
        style={styles.input}
        placeholder="Enter your task here"
        value={newTask}
        onChangeText={setNewTask}
      />

      {/* Button to add the new task */}
      <Button title="Add Task" onPress={addTask} />

      {/* FlatList to display tasks */}
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.taskList}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  taskList: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    width: '100%',
  },
  importantButton: {
    padding: 8,
  },
  importantText: {
    fontSize: 18,
  },
});
