import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as RSSParser from 'react-native-rss-parser';

export default function MellowPage() {
    

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>☁️ Mellow Mood</Text>
      {/* {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        stories.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description?.slice(0, 120)}...</Text>
          </View>
        ))
      )} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#A0C4FF',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    marginTop: 32,
  },
  card: {
    backgroundColor: '#ffffff88',
    padding: 16,
    borderRadius: 16,
    marginVertical: 8,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  desc: {
    fontSize: 14,
    color: '#555',
  },
});
