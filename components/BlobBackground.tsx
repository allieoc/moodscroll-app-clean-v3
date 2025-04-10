import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

export default function BlobBackground() {
  return (
    <Svg style={StyleSheet.absoluteFill} viewBox="0 0 400 800">
      <Defs>
        <RadialGradient id="grad1" cx="50%" cy="30%" r="50%">
          <Stop offset="0%" stopColor="#a0c4ff" stopOpacity="0.6" />
          <Stop offset="100%" stopColor="#a0c4ff" stopOpacity="0" />
        </RadialGradient>
        <RadialGradient id="grad2" cx="30%" cy="70%" r="50%">
          <Stop offset="0%" stopColor="#ffc6ff" stopOpacity="0.5" />
          <Stop offset="100%" stopColor="#ffc6ff" stopOpacity="0" />
        </RadialGradient>
        <RadialGradient id="grad3" cx="80%" cy="50%" r="40%">
          <Stop offset="0%" stopColor="#bdb2ff" stopOpacity="0.5" />
          <Stop offset="100%" stopColor="#bdb2ff" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      <Circle cx="200" cy="100" r="250" fill="url(#grad1)" />
      <Circle cx="200" cy="300" r="400" fill="url(#grad2)" />
      <Circle cx="200" cy="400" r="400" fill="url(#grad3)" />
    </Svg>
  );
}
