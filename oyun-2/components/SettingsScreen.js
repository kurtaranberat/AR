import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const SettingsScreen = () => {
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
  });

  const readingText = `
    Bir zamanlar küçük bir kasabada yaşayan meraklı bir çocuk vardı. Her gün okula giderken yol üzerindeki ağaçları, kuşları ve böcekleri izlerdi. Bir gün, her zamankinden farklı bir şey gördü: parlak mavi kanatlı, daha önce hiç görmediği bir kelebek. Kelebek, çiçekten çiçeğe dans eder gibi uçuyordu.

    Çocuk kelebeği takip etmeye başladı ve onu izlerken doğanın ne kadar güzel ve şaşırtıcı olduğunu fark etti. O günden sonra, her sabah biraz daha erken kalkmaya ve okul yolunda yeni şeyler keşfetmeye başladı. Bazen yeni açmış bir çiçek, bazen yuvadan yeni çıkmış bir kuş yavrusu görüyordu.

    Bu küçük keşifler, çocuğun hayata bakış açısını değiştirdi. Artık sadece gideceği yere odaklanmak yerine, yolculuğun kendisinden keyif almayı öğrendi. Ve en önemlisi, her günün yeni bir keşif fırsatı olduğunu anladı.
  `;

  const questions = [
    {
      id: 1,
      question: 'Çocuk okul yolunda ne gördüğünde hikaye değişmeye başladı?',
      correctAnswer: 'Mavi kanatlı bir kelebek',
    },
    {
      id: 2,
      question: 'Hikayenin sonunda çocuk hangi önemli dersi öğrendi?',
      correctAnswer: 'Her günün yeni bir keşif fırsatı olduğunu',
    },
  ];

  const checkAnswers = () => {
    let newScore = 0;
    if (answers.question1.toLowerCase().includes('mavi') && 
        answers.question1.toLowerCase().includes('kelebek')) {
      newScore += 1;
    }
    if (answers.question2.toLowerCase().includes('keşif') || 
        answers.question2.toLowerCase().includes('fırsat')) {
      newScore += 1;
    }
    setScore(newScore);
    setShowAnswers(true);
  };

  const resetQuiz = () => {
    setAnswers({ question1: '', question2: '' });
    setScore(0);
    setShowAnswers(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Okuma Metni Kartı */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Okuma Parçası</Text>
          <Text style={styles.readingText}>{readingText}</Text>
        </View>

        {/* Sorular Kartı */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sorular</Text>
          
          {questions.map((q) => (
            <View key={q.id} style={styles.questionContainer}>
              <Text style={styles.question}>{q.id}. {q.question}</Text>
              <TextInput
                style={styles.input}
                placeholder="Cevabınızı buraya yazın..."
                value={answers[`question${q.id}`]}
                onChangeText={(text) => 
                  setAnswers(prev => ({...prev, [`question${q.id}`]: text}))
                }
                multiline
              />
              {showAnswers && (
                <Text style={styles.answerText}>
                  Doğru Cevap: {q.correctAnswer}
                </Text>
              )}
            </View>
          ))}

          {/* Butonlar */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, !showAnswers && styles.primaryButton]} 
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
                Skorunuz: {score}/{questions.length}
              </Text>
              <Text style={styles.scoreMessage}>
                {score === questions.length 
                  ? '🎉 Mükemmel! Tüm soruları doğru cevapladınız!'
                  : score > 0 
                    ? '👍 İyi gidiyorsunuz! Tekrar deneyebilirsiniz.'
                    : '💪 Tekrar denemeye ne dersiniz?'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  readingText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A5568',
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#4A5568',
    backgroundColor: '#F8FAFC',
    minHeight: 50,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#718096',
  },
  primaryButton: {
    backgroundColor: '#4299E1',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scoreContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#EBF8FF',
    borderRadius: 8,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B6CB0',
    textAlign: 'center',
  },
  scoreMessage: {
    marginTop: 8,
    fontSize: 16,
    color: '#2C5282',
    textAlign: 'center',
  },
  answerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#48BB78',
    fontStyle: 'italic',
  },
});

export default SettingsScreen;
