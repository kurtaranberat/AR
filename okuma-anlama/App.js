import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReadingScreen from './components/ReadingScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <ReadingScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
