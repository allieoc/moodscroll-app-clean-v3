import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ListenPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🎧 Tuned In</Text>
      <Text style={styles.paragraph}>Podcasts and videos just for you.</Text>
      {/* Add your media cards or players here */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1A1A2E',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    marginTop: 32,
  },
  paragraph: {
    fontSize: 18,
    color: '#cccccc',
    textAlign: 'center',
  },
});
