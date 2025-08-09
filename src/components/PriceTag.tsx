import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {theme, spacing} from '@/utils/theme';

interface PriceTagProps {
  price: number;
  currency: string;
  originalPrice?: number;
  size?: 'small' | 'medium' | 'large';
  showSavings?: boolean;
}

const PriceTag: React.FC<PriceTagProps> = ({
  price,
  currency,
  originalPrice,
  size = 'medium',
  showSavings = false,
}) => {
  const savings = originalPrice ? originalPrice - price : 0;
  const savingsPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  const fontSize = {
    small: 14,
    medium: 18,
    large: 24,
  }[size];

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.price, {fontSize}]}>
        {formatPrice(price)}
      </Text>
      {originalPrice && originalPrice > price && (
        <View style={styles.savingsContainer}>
          <Text style={styles.originalPrice}>
            {formatPrice(originalPrice)}
          </Text>
          {showSavings && (
            <Text style={styles.savings}>
              Save {formatPrice(savings)} ({savingsPercentage}%)
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  price: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  savingsContainer: {
    marginTop: spacing.xs,
  },
  originalPrice: {
    fontSize: 14,
    color: theme.colors.onSurface,
    textDecorationLine: 'line-through',
  },
  savings: {
    fontSize: 12,
    color: theme.colors.success,
    fontWeight: '500',
    marginTop: 2,
  },
});

export default PriceTag;
