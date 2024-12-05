import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, FlatList, Button, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Icon from 'react-native-vector-icons/FontAwesome';

// Pre-made task list
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

      <TouchableOpacity
        onPress={() => toggleCompleted(item.id)} // Toggle completion on task press
      >
        <Text style={[styles.taskText, item.completed && styles.completedTask]}>
          {item.title}
        </Text>
      </TouchableOpacity>

      {/* Icons container */}
      <View style={styles.iconsContainer}>
        {/* Important button */}
        <TouchableOpacity
          style={styles.importantButton}
          onPress={() => toggleImportant(item.id)}
        >
          <Text style={styles.importantText}>
            {item.important ? '⭐' : '☆'}
          </Text>
        </TouchableOpacity>

        {/* Delete button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(item.id)}
        >
          <Icon name="trash" size={16} color="#fff" />
        </TouchableOpacity>

      </View>

    </View>
  );

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: (tasks.length + 1).toString(),
        title: newTask,
        completed: false,
        important: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Function to toggle the "important" status of a task
  const toggleImportant = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, important: !task.important } : task
      )
    );
  };

  // Function to toggle the "completed" status of a task
  const toggleCompleted = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
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
        <ThemedText type="title" style={styles.titleText}>GoalKeeper</ThemedText>
      </ThemedView>

      {/* Input field for new task */}
      <TextInput
        style={styles.input}
        placeholder="Enter your task here"
        value={newTask}
        onChangeText={setNewTask}
      />

      {/* Button to add the new task */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={addTask}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>

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
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    marginBottom: 20,
  },  
  titleText: {
    padding: 15,
    fontSize: 33,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  addButton: {
    backgroundColor: '#339FFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
    width: '70%',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  importantButton: {
    padding: 8,
  },
  importantText: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
});
