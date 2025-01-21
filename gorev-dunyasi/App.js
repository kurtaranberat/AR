import React from 'react';
import { View, StyleSheet } from 'react-native';
import TaskScreen from './components/TaskScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <TaskScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
