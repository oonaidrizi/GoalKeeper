import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemedView } from '@/components/ThemedView';
import { useTasks } from '@/context/TaskContext';

export default function ImportantScreen() {
  const { tasks, setTasks } = useTasks();

  const importantTasks = tasks.filter((task) => task.important);

  const renderTask = ({ item }: { item: { id: string; title: string; completed: boolean; important: boolean } }) => (
    <View style={styles.taskCard}>

      <View style={styles.taskContent}>
        <Text style={[styles.taskTitle, item.completed && styles.completedTask]}>
          {item.title}
        </Text>

        <View style={styles.taskActions}>
          <TouchableOpacity onPress={() => toggleCompleted(item.id)}>
            <Icon name="check-circle" size={20} color={item.completed ? '#4CAF50' : '#ccc'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleImportant(item.id)} style={styles.starIcon}>
            <Icon name={item.important ? 'star' : 'star-o'} size={20} color="#FFC107" />
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );

  const toggleImportant = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, important: !task.important } : task))
    );
  };

  const toggleCompleted = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.headerText}>⭐ Important Tasks ⭐</Text>

      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          {importantTasks.length} {importantTasks.length === 1 ? 'task' : 'tasks'} marked as important
        </Text>
      </View>

      {importantTasks.length > 0 ? (
        <FlatList
          data={importantTasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.taskList}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Icon name="tasks" size={50} color="#ccc" />
          <Text style={styles.emptyStateText}>No important tasks yet!</Text>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: '#F5F5F5',
    color: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '500',
  },
  taskList: {
    paddingBottom: 20,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  taskContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginLeft: 15,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    color: '#778',
    marginTop: 10,
    textAlign: 'center',
  },
});
