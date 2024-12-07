import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanResponder, Dimensions } from 'react-native';
import Svg, { Path, Line } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');
const CANVAS_WIDTH = screenWidth - 40;
const CANVAS_HEIGHT = 400;
const CENTER_X = CANVAS_WIDTH / 2;

const ProfileScreen = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  const [score, setScore] = useState(0);

  // Yarım kelebek şekli için path
  const butterflyTemplate = `
    M ${CENTER_X},50
    C ${CENTER_X - 30},70 ${CENTER_X - 60},90 ${CENTER_X - 40},120
    C ${CENTER_X - 20},150 ${CENTER_X - 50},180 ${CENTER_X},200
  `;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      if (locationX <= CENTER_X) return;
      
      const newPath = `M ${locationX} ${locationY}`;
      setCurrentPath(newPath);
    },
    onPanResponderMove: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      if (locationX <= CENTER_X || !currentPath) return;

      setCurrentPath(prevPath => `${prevPath} L ${locationX} ${locationY}`);
    },
    onPanResponderRelease: () => {
      if (currentPath) {
        setPaths([...paths, currentPath]);
        setCurrentPath('');
      }
    },
  });

  const clearDrawing = () => {
    setPaths([]);
    setCurrentPath('');
  };

  const checkSymmetry = () => {
    if (paths.length > 0) {
      setScore(score + 1);
      alert('Tebrikler! Simetriyi tamamladınız! 🎉');
      clearDrawing();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simetri Çizim Oyunu</Text>
      <Text style={styles.score}>Puan: {score}</Text>
      
      <View style={styles.canvasContainer}>
        <Svg
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={styles.canvas}
          {...panResponder.panHandlers}
        >
          {/* Orta çizgi */}
          <Line
            x1={CENTER_X}
            y1={0}
            x2={CENTER_X}
            y2={CANVAS_HEIGHT}
            stroke="#DDD"
            strokeWidth="2"
          />

          {/* Template şekil (sol taraf) */}
          <Path
            d={butterflyTemplate}
            stroke="#FF69B4"
            strokeWidth="3"
            fill="none"
          />

          {/* Kullanıcının çizimleri */}
          {paths.map((path, index) => (
            <Path
              key={index}
              d={path}
              stroke="#FF69B4"
              strokeWidth="3"
              fill="none"
            />
          ))}
          {currentPath ? (
            <Path
              d={currentPath}
              stroke="#FF69B4"
              strokeWidth="3"
              fill="none"
            />
          ) : null}
        </Svg>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={clearDrawing}>
          <Text style={styles.buttonText}>Temizle</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={checkSymmetry}>
          <Text style={styles.buttonText}>Kontrol Et</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.instruction}>
        Sol taraftaki şeklin simetrisini sağ tarafa çizin!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  canvasContainer: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    backgroundColor: '#FFF',
    borderRadius: 15,
    elevation: 5,
    overflow: 'hidden',
  },
  canvas: {
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  button: {
    backgroundColor: '#FF69B4',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  instruction: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default ProfileScreen;
