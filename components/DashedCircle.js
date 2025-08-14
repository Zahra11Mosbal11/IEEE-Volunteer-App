import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function DashedCircle() {
  const size = 70; // قطر الدائرة
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = 6; // نسبة التقدم (0 إلى 1)

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* الخلفية */}
        <Circle
          stroke="#CEE8FA"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={[15, 10]} // 15px خط - 10px فراغ
        />

        {/* التقدم */}
        <Circle
          stroke="#00629B"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={[15, 10]}
          strokeDashoffset={circumference * (1 - progress)}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* النص في الوسط */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{Math.round(progress * 10)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
