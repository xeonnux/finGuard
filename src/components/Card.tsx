import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {theme, shadows, spacing} from '@/utils/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof spacing;
  shadow?: keyof typeof shadows;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'md',
  shadow = 'small',
}) => {
  return (
    <View
      style={[
        styles.card,
        {padding: spacing[padding]},
        shadows[shadow],
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
    marginVertical: spacing.xs,
  },
});

export default Card;
