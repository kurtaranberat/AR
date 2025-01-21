import React, { useState, useEffect, Suspense } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { OrbitControls } from '@react-three/drei/native';
import * as THREE from 'three';

const shapes = [
  { id: 1, name: 'sphere', displayName: 'Küre', geometry: 'sphere' },
  { id: 2, name: 'cube', displayName: 'Küp', geometry: 'box' },
  { id: 3, name: 'cone', displayName: 'Koni', geometry: 'cone' },
  { id: 4, name: 'cylinder', displayName: 'Silindir', geometry: 'cylinder' },
  { id: 5, name: 'torus', displayName: 'Halka', geometry: 'torus' },
];

const Shape3D = ({ geometry, color }) => {
  let GeometryComponent;
  const props = { args: [1, 1, 1] };

  switch (geometry) {
    case 'sphere':
      GeometryComponent = THREE.SphereGeometry;
      props.args = [1, 32, 32];
      break;
    case 'box':
      GeometryComponent = THREE.BoxGeometry;
      break;
    case 'cone':
      GeometryComponent = THREE.ConeGeometry;
      props.args = [1, 2, 32];
      break;
    case 'cylinder':
      GeometryComponent = THREE.CylinderGeometry;
      props.args = [1, 1, 2, 32];
      break;
    case 'torus':
      GeometryComponent = THREE.TorusGeometry;
      props.args = [1, 0.4, 16, 100];
      break;
    default:
      GeometryComponent = THREE.BoxGeometry;
  }

  return (
    <mesh rotation={[0, Date.now() * 0.001, 0]}>
      <primitive object={new GeometryComponent(...props.args)} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const GameScreen = () => {
  const [score, setScore] = useState(0);
  const [currentShape, setCurrentShape] = useState(null);
  const [nextShape, setNextShape] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const nextRandomShape = shapes[Math.floor(Math.random() * shapes.length)];
    setCurrentShape(randomShape);
    setNextShape(nextRandomShape);
    setFeedback('');
  };

  const handleGuess = (shapeName) => {
    if (shapeName === nextShape.name) {
      setScore(score + 1);
      setFeedback('Doğru! 🎉');
      setTimeout(startNewRound, 1000);
    } else {
      setFeedback('Tekrar dene! 🤔');
    }
  };

  if (!currentShape || !nextShape) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Puan: {score}</Text>
      
      <View style={styles.canvasContainer}>
        <Canvas style={styles.canvas}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <Shape3D 
              geometry={currentShape.geometry} 
              color={new THREE.Color(Math.random(), Math.random(), Math.random())} 
            />
            <OrbitControls />
          </Suspense>
        </Canvas>
      </View>

      <Text style={styles.question}>Bir sonraki şekil ne olacak?</Text>
      <Text style={[styles.feedback, { color: feedback.includes('Doğru') ? '#4ECDC4' : '#FF6B6B' }]}>
        {feedback}
      </Text>

      <View style={styles.buttonContainer}>
        {shapes.map((shape) => (
          <TouchableOpacity
            key={shape.id}
            style={[styles.button, { backgroundColor: shape.id % 2 === 0 ? '#4ECDC4' : '#FF6B6B' }]}
            onPress={() => handleGuess(shape.name)}
          >
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
    backgroundColor: '#F7F7F7',
    padding: 20,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  canvasContainer: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  canvas: {
    flex: 1,
  },
  question: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  feedback: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    margin: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameScreen;
