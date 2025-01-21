import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, PanResponder, Dimensions } from 'react-native';
import { Canvas } from '@react-three/fiber/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CANVAS_WIDTH = SCREEN_WIDTH - 40;
const CANVAS_HEIGHT = SCREEN_HEIGHT * 0.6;

// Önceden tanımlanmış kelebek noktaları (sağ kanat)
const BUTTERFLY_TEMPLATE = [
  [1.5, 0.5, 0],   // Üst kanat başlangıç
  [2.0, 1.0, 0],
  [2.5, 1.2, 0],
  [2.8, 1.0, 0],
  [2.5, 0.5, 0],
  [2.0, 0.2, 0],   // Üst kanat bitiş
  [1.5, 0.0, 0],   // Alt kanat başlangıç
  [2.0, -0.5, 0],
  [2.3, -0.8, 0],
  [2.0, -1.0, 0],
  [1.5, -0.8, 0],
  [1.2, -0.3, 0],  // Alt kanat bitiş
];

function DrawingPoint({ position, color, size = 0.1 }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function ButterflyLine({ points, color }) {
  return points.map((point, index) => (
    <DrawingPoint 
      key={`point-${index}`} 
      position={point} 
      color={color}
      size={0.05}
    />
  ));
}

function Scene({ userPoints, templatePoints }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Orta çizgi (vücut) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 3, 0.1]} />
        <meshStandardMaterial color="#666" />
      </mesh>

      {/* Şablon (sağ kanat) */}
      <ButterflyLine points={templatePoints} color="#ddd" />

      {/* Kullanıcının çizimi (sol kanat) */}
      {userPoints.map((point, index) => (
        <DrawingPoint 
          key={`user-${index}`} 
          position={point} 
          color="#FF69B4"
        />
      ))}
    </>
  );
}

const ButterflyScreen = () => {
  const [points, setPoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [score, setScore] = useState(0);
  const canvasRef = useRef(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      handleTouch(locationX, locationY);
      setIsDrawing(true);
    },

    onPanResponderMove: (evt) => {
      if (isDrawing) {
        const { locationX, locationY } = evt.nativeEvent;
        handleTouch(locationX, locationY);
      }
    },

    onPanResponderRelease: () => {
      setIsDrawing(false);
    }
  });

  const handleTouch = (x, y) => {
    // Canvas koordinatlarına dönüştürme
    const normalizedX = ((x - (CANVAS_WIDTH / 2)) / (CANVAS_WIDTH / 2)) * 4;
    const normalizedY = -((y - (CANVAS_HEIGHT / 2)) / (CANVAS_HEIGHT / 2)) * 4;

    // Sadece sol tarafta çizime izin ver
    if (normalizedX >= 0) return;

    const newPoint = [normalizedX, normalizedY, 0];

    // Minimum mesafe kontrolü
    const shouldAddPoint = points.length === 0 || 
      Math.hypot(points[points.length - 1][0] - newPoint[0], 
                 points[points.length - 1][1] - newPoint[1]) > 0.2;

    if (shouldAddPoint) {
      setPoints(prev => [...prev, newPoint]);
    }
  };

  const checkSymmetry = () => {
    if (points.length < 5) {
      alert('Lütfen daha fazla nokta çizin!');
      return;
    }

    let symmetryScore = 0;
    const maxScore = BUTTERFLY_TEMPLATE.length * 10;

    // Her şablon noktası için en yakın kullanıcı noktasını bul
    BUTTERFLY_TEMPLATE.forEach(templatePoint => {
      const mirroredX = -templatePoint[0];
      const targetY = templatePoint[1];

      // En yakın kullanıcı noktasını bul
      let minDistance = Infinity;
      points.forEach(userPoint => {
        const distance = Math.hypot(
          userPoint[0] - mirroredX,
          userPoint[1] - targetY
        );
        minDistance = Math.min(minDistance, distance);
      });

      // Mesafeye göre puan ver
      if (minDistance < 0.3) {
        symmetryScore += 10;
      } else if (minDistance < 0.5) {
        symmetryScore += 5;
      }
    });

    const percentage = (symmetryScore / maxScore) * 100;
    setScore(Math.round(percentage));

    alert(`Simetri Puanı: ${Math.round(percentage)}%`);
  };

  const clearDrawing = () => {
    setPoints([]);
    setScore(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kelebek Çizim Oyunu</Text>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Puan: {score}</Text>
      </View>

      <View 
        style={styles.canvasContainer} 
        ref={canvasRef}
        {...panResponder.panHandlers}
      >
        <Canvas style={styles.canvas}>
          <Scene 
            userPoints={points} 
            templatePoints={BUTTERFLY_TEMPLATE}
          />
        </Canvas>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Sol kanadı çizerek kelebeği tamamlayın
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={checkSymmetry}
        >
          <Text style={styles.buttonText}>Kontrol Et</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.clearButton]} 
          onPress={clearDrawing}
        >
          <Text style={styles.buttonText}>Temizle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
  canvasContainer: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  canvas: {
    flex: 1,
  },
  instructions: {
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#FF69B4',
    padding: 15,
    borderRadius: 10,
    width: '40%',
  },
  clearButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ButterflyScreen;
