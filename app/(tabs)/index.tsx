import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import BlobBackground from '@/components/BlobBackground'; // adjust path if needed

export default function OnboardingScreen() {
  const handleSelectMood = (mood: string) => {
    router.push(`/moods/${mood}`);
  };

  return (
    <View style={styles.container}>
      <BlobBackground />

      <Text style={styles.title}>How are you feeling today?</Text>

      <Pressable style={styles.button} onPress={() => handleSelectMood('focused')}>
        <Text style={styles.buttonText}>🧠 Focused</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => handleSelectMood('mellow')}>
        <Text style={styles.buttonText}>🌈 Mellow</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => handleSelectMood('listen')}>
        <Text style={styles.buttonText}>🎧 Ready to Listen</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // fallback if blobs don’t cover
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
    zIndex: 1,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 28,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    zIndex: 1,
  },
  buttonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: '500',
  },
});
