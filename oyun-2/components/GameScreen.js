import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const shapes = [
  { id: 1, name: 'circle', icon: 'circle', color: '#FF6B6B', displayName: 'Daire' },
  { id: 2, name: 'square', icon: 'square', color: '#4ECDC4', displayName: 'Kare' },
  { id: 3, name: 'triangle', icon: 'triangle', color: '#45B7D1', displayName: 'Üçgen' },
  { id: 4, name: 'star', icon: 'star', color: '#96CEB4', displayName: 'Yıldız' },
  { id: 5, name: 'heart', icon: 'heart', color: '#FF8B94', displayName: 'Kalp' },
];

const GameScreen = () => {
  const [score, setScore] = useState(0);
  const [currentShape, setCurrentShape] = useState(null);
  const [nextShape, setNextShape] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [animation] = useState(new Animated.Value(1));

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const nextRandomShape = shapes[Math.floor(Math.random() * shapes.length)];
    setCurrentShape(randomShape);
    setNextShape(nextRandomShape);
    setFeedback('');
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleGuess = (shapeName) => {
    if (shapeName === nextShape.name) {
      setScore(score + 1);
      setFeedback('Doğru! 🎉');
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      setTimeout(startNewRound, 1000);
    } else {
      setFeedback('Tekrar dene! 🤔');
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  if (!currentShape || !nextShape) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Puan: {score}</Text>
      
      <View style={styles.shapeContainer}>
        <Text style={styles.currentShapeText}>Şu anki şekil:</Text>
        <Animated.View style={{ transform: [{ scale: animation }] }}>
          <Icon name={currentShape.icon} size={80} color={currentShape.color} />
        </Animated.View>
      </View>

      <Text style={styles.question}>Bir sonraki şekil ne olacak?</Text>
      <Text style={[styles.feedback, { color: feedback.includes('Doğru') ? '#4ECDC4' : '#FF6B6B' }]}>
        {feedback}
      </Text>

      <View style={styles.buttonContainer}>
        {shapes.map((shape) => (
          <TouchableOpacity
            key={shape.id}
            style={[styles.button, { backgroundColor: shape.color }]}
            onPress={() => handleGuess(shape.name)}
          >
            <Icon name={shape.icon} size={24} color="#FFF" />
            <Text style={styles.buttonText}>{shape.displayName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  shapeContainer: {
    height: 180,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    elevation: 5,
    marginBottom: 20,
  },
  currentShapeText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#666',
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  feedback: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    height: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 5,
    marginBottom: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
});

export default GameScreen;
