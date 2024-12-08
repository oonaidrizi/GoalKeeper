import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTasks } from '@/context/TaskContext';

export default function ImportantScreen() {
  const { tasks } = useTasks();

  const importantTasks = tasks.filter((task) => task.important);

  const renderTask = ({ item }: { item: { id: string, title: string } }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Important Tasks</Text>
      <FlatList
        data={importantTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
});