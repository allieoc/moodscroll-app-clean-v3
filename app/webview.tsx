import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';

export default function WebviewPage() {
  const { url } = useLocalSearchParams();

  if (!url || typeof url !== 'string') {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: decodeURIComponent(url) }}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator style={styles.loader} size="large" color="#555" />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
