import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';
import { Canvas } from '@react-three/fiber/native';

function TextBlock({ position, text, color }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[4, 0.8, 0.2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Scene({ activeText, showAnswer }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Soru metni */}
      <TextBlock 
        position={[0, 1, 0]} 
        text={activeText} 
        color={showAnswer ? "#4ECDC4" : "#FF69B4"} 
      />
    </>
  );
}

export default function SettingsScreen() {
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
  });
  const [activeQuestion, setActiveQuestion] = useState(0);

  const readingText = `
    Bir zamanlar küçük bir kasabada yaşayan meraklı bir çocuk vardı. 
    Her gün okula giderken yol üzerindeki ağaçları, kuşları ve böcekleri izlerdi. 
    Bir gün, her zamankinden farklı bir şey gördü: parlak mavi kanatlı, 
    daha önce hiç görmediği bir kelebek. Kelebek, çiçekten çiçeğe dans eder gibi uçuyordu.
    Çocuk kelebeği dikkatle izledi ve onun hareketlerini not almaya başladı.
    Bu deneyim, çocuğun doğaya olan ilgisini daha da artırdı ve onu küçük bir bilim insanı gibi
    gözlem yapmaya teşvik etti.
  `;

  const questions = [
    {
      id: 1,
      text: 'Çocuk okul yolunda ne gördüğünde hikaye değişmeye başladı?',
      correctAnswer: 'Mavi kanatlı bir kelebek gördüğünde',
    },
    {
      id: 2,
      text: 'Çocuk kelebeği gördükten sonra ne yapmaya başladı?',
      correctAnswer: 'Kelebeğin hareketlerini not almaya başladı',
    },
    {
      id: 3,
      text: 'Bu deneyim çocuğu nasıl etkiledi?',
      correctAnswer: 'Doğaya olan ilgisini artırdı ve gözlem yapmaya teşvik etti',
    },
  ];

  const checkAnswers = () => {
    let newScore = 0;
    const answerChecks = {
      question1: (ans) => ans.toLowerCase().includes('mavi') && ans.toLowerCase().includes('kelebek'),
      question2: (ans) => ans.toLowerCase().includes('not') && ans.toLowerCase().includes('hareket'),
      question3: (ans) => ans.toLowerCase().includes('doğa') || ans.toLowerCase().includes('gözlem'),
    };

    Object.entries(answers).forEach(([key, value]) => {
      if (answerChecks[key](value)) {
        newScore += 10;
      }
    });

    setScore(newScore);
    setShowAnswers(true);
    setActiveQuestion(0);
  };

  const resetQuiz = () => {
    setAnswers({ question1: '', question2: '', question3: '' });
    setScore(0);
    setShowAnswers(false);
    setActiveQuestion(0);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>3D Okuma Anlama Oyunu</Text>
        
        {/* 3D Görselleştirme */}
        <View style={styles.canvasContainer}>
          <Canvas style={styles.canvas}>
            <Scene 
              activeText={questions[activeQuestion]?.text || ''} 
              showAnswer={showAnswers}
            />
          </Canvas>
        </View>

        {/* Okuma Metni */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Okuma Parçası</Text>
          <Text style={styles.readingText}>{readingText}</Text>
        </View>

        {/* Sorular */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sorular</Text>
          
          {questions.map((question, index) => (
            <View key={question.id} style={styles.questionContainer}>
              <Text style={styles.questionText}>
                {question.id}. {question.text}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Cevabınızı buraya yazın..."
                value={answers[`question${question.id}`]}
                onChangeText={(text) => {
                  setAnswers(prev => ({
                    ...prev,
                    [`question${question.id}`]: text
                  }));
                  setActiveQuestion(index);
                }}
                multiline
              />
              {showAnswers && (
                <Text style={styles.answerText}>
                  Doğru Cevap: {question.correctAnswer}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Kontrol Butonları */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, showAnswers ? styles.resetButton : styles.checkButton]} 
            onPress={showAnswers ? resetQuiz : checkAnswers}
          >
            <Text style={styles.buttonText}>
              {showAnswers ? 'Yeniden Başla' : 'Cevapları Kontrol Et'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Skor Gösterimi */}
        {showAnswers && (
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>
              Puanınız: {score}/30
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  canvasContainer: {
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  canvas: {
    flex: 1,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  readingText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkButton: {
    backgroundColor: '#4ECDC4',
  },
  resetButton: {
    backgroundColor: '#FF69B4',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  answerText: {
    color: '#4ECDC4',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
