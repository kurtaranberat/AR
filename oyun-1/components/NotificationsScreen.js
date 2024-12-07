import React, { useState, useEffect, Suspense } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
} from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { OrbitControls } from '@react-three/drei/native';

const TaskModel = ({ position, color, scale = 1, rotation = [0, 0, 0], completed }) => {
  const meshRef = React.useRef();

  useEffect(() => {
    if (meshRef.current && completed) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial
        color={color}
        opacity={completed ? 0.8 : 0.4}
        transparent
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  );
};

const NotificationsScreen = () => {
  const [chores, setChores] = useState([
    { id: 1, task: 'Yatağımı Topladım', completed: false, color: '#FF6B6B' },
    { id: 2, task: 'Odamı Temizledim', completed: false, color: '#4ECDC4' },
    { id: 3, task: 'Oyuncaklarımı Topladım', completed: false, color: '#45B7D1' },
    { id: 4, task: 'Çiçekleri Suladım', completed: false, color: '#96CEB4' },
    { id: 5, task: 'Sofrayı Hazırladım', completed: false, color: '#FF8B94' },
    { id: 6, task: 'Kıyafetlerimi Düzenledim', completed: false, color: '#9B59B6' },
    { id: 7, task: 'Kitaplarımı Yerleştirdim', completed: false, color: '#3498DB' },
  ]);

  const [completedCount, setCompletedCount] = useState(0);

  const toggleTask = (id) => {
    const updatedChores = chores.map(chore => {
      if (chore.id === id) {
        return { ...chore, completed: !chore.completed };
      }
      return chore;
    });
    setChores(updatedChores);
    setCompletedCount(updatedChores.filter(chore => chore.completed).length);
  };

  const resetTasks = () => {
    const resetChores = chores.map(chore => ({
      ...chore,
      completed: false,
    }));
    setChores(resetChores);
    setCompletedCount(0);
  };

  useEffect(() => {
    // Her gün gece yarısında görevleri sıfırla
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow - now;
    
    const timer = setTimeout(resetTasks, timeUntilMidnight);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* 3D Görev Görselleştirmesi */}
      <View style={styles.canvasContainer}>
        <Canvas style={styles.canvas}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            {chores.map((chore, index) => (
              <TaskModel
                key={chore.id}
                position={[
                  Math.cos(index * (Math.PI * 2) / chores.length) * 3,
                  Math.sin(index * (Math.PI * 2) / chores.length) * 3,
                  0
                ]}
                color={chore.color}
                scale={chore.completed ? 1.2 : 1}
                completed={chore.completed}
              />
            ))}
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
          </Suspense>
        </Canvas>
      </View>

      {/* Başlık ve Özet */}
      <View style={styles.header}>
        <Text style={styles.title}>3D Görev Dünyası</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            {completedCount}/{chores.length}
          </Text>
          <Text style={styles.scoreLabel}>Tamamlandı</Text>
        </View>
      </View>

      {/* Görevler Listesi */}
      <ScrollView style={styles.taskList}>
        {chores.map((chore) => (
          <TouchableOpacity
            key={chore.id}
            style={[
              styles.taskItem,
              { backgroundColor: chore.color + '20' },
              chore.completed && styles.taskCompleted
            ]}
            onPress={() => toggleTask(chore.id)}
          >
            <View style={styles.taskContent}>
              <View style={[styles.checkbox, { borderColor: chore.color }]}>
                {chore.completed && (
                  <View style={[styles.checkboxInner, { backgroundColor: chore.color }]} />
                )}
              </View>
              <Text style={[
                styles.taskText,
                chore.completed && styles.taskTextCompleted
              ]}>
                {chore.task}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  canvasContainer: {
    height: 300,
    backgroundColor: '#000',
    marginBottom: 20,
  },
  canvas: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4299E1',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#718096',
  },
  taskList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  taskItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  taskCompleted: {
    opacity: 0.8,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  taskText: {
    fontSize: 16,
    color: '#2D3748',
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#A0AEC0',
  },
});

export default NotificationsScreen;
