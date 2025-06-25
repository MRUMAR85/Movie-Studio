import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
  View
} from 'react-native';
import Theme from '../utils/Theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}) => {
  // Get button container style based on variant, size and state
  const getButtonStyle = () => {
    let buttonStyle: StyleProp<ViewStyle> = [
      styles.button,
      styles[`${variant}Button`],
      styles[`${size}Button`],
      fullWidth && styles.fullWidth,
      disabled && styles.disabledButton,
    ];
    
    return buttonStyle;
  };
  
  // Get button text style based on variant and state
  const getTextStyle = () => {
    let buttonTextStyle: StyleProp<TextStyle> = [
      styles.text,
      styles[`${variant}Text`],
      styles[`${size}Text`],
      disabled && styles.disabledText,
    ];
    
    return buttonTextStyle;
  };
  
  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' || variant === 'ghost' ? Theme.colors.primary : 'white'} 
          size="small" 
        />
      ) : (
        <>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadius.base,
  },
  
  // Variant Styles - Container
  primaryButton: {
    backgroundColor: Theme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: Theme.colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  
  // Variant Styles - Text
  primaryText: {
    color: Theme.colors.text.primary,
  },
  secondaryText: {
    color: Theme.colors.text.primary,
  },
  outlineText: {
    color: Theme.colors.primary,
  },
  ghostText: {
    color: Theme.colors.primary,
  },
  
  // Size Styles - Container
  smallButton: {
    height: 36,
    paddingHorizontal: Theme.spacing.md,
  },
  mediumButton: {
    height: 48,
    paddingHorizontal: Theme.spacing.xl,
  },
  largeButton: {
    height: 56,
    paddingHorizontal: Theme.spacing.xl,
  },
  
  // Size Styles - Text
  smallText: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: '500' as const,
  },
  mediumText: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: '600' as const,
  },
  largeText: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: '600' as const,
  },
  
  // State Styles
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.8,
  },
  
  // Layout Styles
  fullWidth: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
  leftIcon: {
    marginRight: Theme.spacing.sm,
  },
  rightIcon: {
    marginLeft: Theme.spacing.sm,
  },
});

export default Button; 