import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import {Text, Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {theme, spacing} from '@/utils/theme';

const {height} = Dimensions.get('window');

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.secondary]}
      style={styles.container}>
      <View style={styles.content}>
        {/* App Icon/Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>💰</Text>
          </View>
        </View>

        {/* App Title and Tagline */}
        <View style={styles.titleContainer}>
          <Text variant="headlineLarge" style={styles.title}>
            FinGuard
          </Text>
          <Text variant="headlineSmall" style={styles.subtitle}>
            AI Cost of Living Companion
          </Text>
          <Text variant="bodyLarge" style={styles.tagline}>
            Beat inflation, every day.
          </Text>
        </View>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          <FeatureItem 
            icon="📊" 
            title="AI Price Watcher"
            description="Track prices and find better deals automatically"
          />
          <FeatureItem 
            icon="💡" 
            title="Smart Budgeting"
            description="Dynamic budget adjustments based on real inflation"
          />
          <FeatureItem 
            icon="🔄" 
            title="Bill Optimization"
            description="Find better deals and switch with one tap"
          />
          <FeatureItem 
            icon="🎯" 
            title="What Can I Afford?"
            description="AI suggestions that fit your available budget"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Register' as never)}
            style={styles.primaryButton}
            labelStyle={styles.primaryButtonText}>
            Get Started Free
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Login' as never)}
            labelStyle={styles.secondaryButtonText}>
            Already have an account? Sign In
          </Button>
        </View>

        {/* Premium Badge */}
        <View style={styles.pricingContainer}>
          <Text style={styles.pricingText}>
            Premium: $4.99-$7.99/month • Cancel anytime
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({icon, title, description}) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <View style={styles.featureText}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    marginTop: spacing.xs,
  },
  tagline: {
    color: 'white',
    textAlign: 'center',
    opacity: 0.8,
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
  featuresContainer: {
    marginBottom: spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: spacing.md,
    borderRadius: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  featureDescription: {
    color: 'white',
    opacity: 0.8,
    fontSize: 14,
    marginTop: 2,
  },
  buttonContainer: {
    marginBottom: spacing.md,
  },
  primaryButton: {
    backgroundColor: 'white',
    marginBottom: spacing.md,
    paddingVertical: spacing.xs,
  },
  primaryButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 14,
  },
  pricingContainer: {
    alignItems: 'center',
  },
  pricingText: {
    color: 'white',
    opacity: 0.7,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
