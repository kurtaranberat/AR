import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButterflyScreen from './components/ButterflyScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <ButterflyScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
