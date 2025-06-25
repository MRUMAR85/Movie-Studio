import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  text?: string;
  color?: string;
  style?: any;
}

const PlaceholderImage = ({
  width = 100,
  height = 100,
  backgroundColor = '#323240',
  text = 'Placeholder',
  color = 'white',
  style = {},
}: PlaceholderImageProps) => {
  return (
    <View 
      style={[
        styles.container, 
        { width, height, backgroundColor },
        style,
      ]}
    >
      <Text style={[styles.text, { color }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default PlaceholderImage; 