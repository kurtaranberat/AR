import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationsScreen = () => {
  const [chores, setChores] = useState([
    { id: 1, task: 'Yatağımı Topladım', completed: false, icon: 'bed-empty' },
    { id: 2, task: 'Odamı Temizledim', completed: false, icon: 'broom' },
    { id: 3, task: 'Oyuncaklarımı Topladım', completed: false, icon: 'toy-brick' },
    { id: 4, task: 'Çiçekleri Suladım', completed: false, icon: 'flower' },
    { id: 5, task: 'Sofrayı Hazırladım', completed: false, icon: 'silverware-fork-knife' },
    { id: 6, task: 'Kıyafetlerimi Düzenledim', completed: false, icon: 'hanger' },
    { id: 7, task: 'Kitaplarımı Yerleştirdim', completed: false, icon: 'bookshelf' },
  ]);

  const [completedCount, setCompletedCount] = useState(0);
  const [bounceAnimation] = useState(new Animated.Value(1));

  const toggleTask = (id) => {
    const updatedChores = chores.map(chore => {
      if (chore.id === id) {
        return { ...chore, completed: !chore.completed };
      }
      return chore;
    });
    setChores(updatedChores);
    
    // Animasyon ve sayaç güncelleme
    const newCount = updatedChores.filter(chore => chore.completed).length;
    setCompletedCount(newCount);
    
    Animated.sequence([
      Animated.spring(bounceAnimation, {
        toValue: 1.2,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnimation, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetTasks = () => {
    const resetChores = chores.map(chore => ({
      ...chore,
      completed: false,
    }));
    setChores(resetChores);
    setCompletedCount(0);
  };

  // Her gün otomatik sıfırlama için
  useEffect(() => {
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
      {/* Başlık ve Özet */}
      <View style={styles.header}>
        <Text style={styles.title}>Günlük Ev İşleri</Text>
        <Animated.View style={[styles.scoreContainer, { transform: [{ scale: bounceAnimation }] }]}>
          <Text style={styles.scoreText}>
            {completedCount}/{chores.length}
          </Text>
          <Text style={styles.scoreLabel}>Tamamlandı</Text>
        </Animated.View>
      </View>

      {/* Görevler Listesi */}
      <ScrollView style={styles.taskList}>
        {chores.map((chore) => (
          <TouchableOpacity
            key={chore.id}
            style={[
              styles.taskItem,
              chore.completed && styles.taskCompleted
            ]}
            onPress={() => toggleTask(chore.id)}
          >
            <View style={styles.taskContent}>
              <Icon 
                name={chore.icon} 
                size={24} 
                color={chore.completed ? '#48BB78' : '#718096'} 
              />
              <Text style={[
                styles.taskText,
                chore.completed && styles.taskTextCompleted
              ]}>
                {chore.task}
              </Text>
            </View>
            <View style={[
              styles.checkbox,
              chore.completed && styles.checkboxCompleted
            ]}>
              {chore.completed && (
                <Icon name="check" size={20} color="#FFFFFF" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sıfırlama Butonu */}
      <TouchableOpacity style={styles.resetButton} onPress={resetTasks}>
        <Text style={styles.resetButtonText}>Listeyi Sıfırla</Text>
      </TouchableOpacity>

      {/* Motivasyon Mesajı */}
      {completedCount === chores.length && (
        <View style={styles.congratsContainer}>
          <Text style={styles.congratsText}>
            🎉 Harika! Tüm görevleri tamamladın!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  scoreContainer: {
    backgroundColor: '#EBF8FF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B6CB0',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#4A5568',
    marginTop: 4,
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#4A5568',
    marginLeft: 12,
  },
  taskCompleted: {
    backgroundColor: '#F0FFF4',
  },
  taskTextCompleted: {
    color: '#48BB78',
    textDecorationLine: 'line-through',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#48BB78',
    borderColor: '#48BB78',
  },
  resetButton: {
    backgroundColor: '#FC8181',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  congratsContainer: {
    backgroundColor: '#F0FFF4',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  congratsText: {
    fontSize: 16,
    color: '#48BB78',
    fontWeight: '600',
  },
});

export default NotificationsScreen;
