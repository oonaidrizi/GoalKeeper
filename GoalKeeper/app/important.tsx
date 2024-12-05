import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ImportantScreen({ route }: { route: any }) {
  const { tasks } = route.params; // Get important tasks passed from the HomeScreen

  const renderTask = ({ item }: { item: { id: string, title: string } }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.title}</Text>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Important tasks</ThemedText>
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
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
});