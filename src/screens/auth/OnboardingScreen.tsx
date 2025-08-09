import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Text, TextInput, Button, SegmentedButtons, Chip} from 'react-native-paper';

import {theme, spacing} from '@/utils/theme';
import {useAuth} from '@/services/AuthContext';
import Card from '@/components/Card';

const OnboardingScreen: React.FC = () => {
  const {updateUser} = useAuth();
  
  const [formData, setFormData] = useState({
    location: '',
    currency: 'USD',
    monthlyIncome: '',
    categories: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  const currencies = [
    {value: 'USD', label: 'USD ($)'},
    {value: 'EUR', label: 'EUR (€)'},
    {value: 'GBP', label: 'GBP (£)'},
    {value: 'CAD', label: 'CAD ($)'},
    {value: 'AUD', label: 'AUD ($)'},
  ];

  const availableCategories = [
    'Groceries',
    'Dining Out',
    'Entertainment',
    'Transportation',
    'Shopping',
    'Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Fitness',
  ];

  const handleComplete = async () => {
    if (!formData.location) {
      Alert.alert('Error', 'Please enter your location');
      return;
    }

    setLoading(true);
    try {
      await updateUser({
        location: formData.location,
        currency: formData.currency,
        monthlyIncome: formData.monthlyIncome ? parseFloat(formData.monthlyIncome) : undefined,
      });
    } catch (error) {
      Alert.alert('Setup Failed', 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Let's Set Up Your Profile
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Help us personalize your money-saving experience
        </Text>
      </View>

      <Card>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Location & Currency
        </Text>
        
        <TextInput
          label="Location (City, Country)"
          value={formData.location}
          onChangeText={(value) => updateFormData('location', value)}
          mode="outlined"
          placeholder="e.g., New York, USA"
          style={styles.input}
        />

        <View style={styles.currencyContainer}>
          <Text variant="bodyMedium" style={styles.fieldLabel}>
            Preferred Currency
          </Text>
          <SegmentedButtons
            value={formData.currency}
            onValueChange={(value) => updateFormData('currency', value)}
            buttons={currencies}
            style={styles.segmentedButtons}
          />
        </View>
      </Card>

      <Card>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Income (Optional)
        </Text>
        <Text variant="bodySmall" style={styles.fieldDescription}>
          This helps us provide better budget recommendations
        </Text>
        
        <TextInput
          label="Monthly Income"
          value={formData.monthlyIncome}
          onChangeText={(value) => updateFormData('monthlyIncome', value)}
          mode="outlined"
          keyboardType="numeric"
          placeholder="0"
          left={<TextInput.Affix text={formData.currency === 'USD' ? '$' : formData.currency} />}
          style={styles.input}
        />
      </Card>

      <Card>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Spending Categories
        </Text>
        <Text variant="bodySmall" style={styles.fieldDescription}>
          Select categories you spend money on regularly
        </Text>

        <View style={styles.categoriesContainer}>
          {availableCategories.map(category => (
            <Chip
              key={category}
              selected={formData.categories.includes(category)}
              onPress={() => toggleCategory(category)}
              style={[
                styles.categoryChip,
                formData.categories.includes(category) && styles.selectedChip,
              ]}>
              {category}
            </Chip>
          ))}
        </View>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleComplete}
          loading={loading}
          disabled={loading}
          style={styles.completeButton}>
          Complete Setup
        </Button>
        
        <Button
          mode="text"
          onPress={handleComplete}
          disabled={loading}>
          Skip for Now
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    color: theme.colors.onBackground,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.onSurface,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  fieldLabel: {
    marginBottom: spacing.sm,
    color: theme.colors.onSurface,
  },
  fieldDescription: {
    color: theme.colors.onSurface,
    marginBottom: spacing.md,
    opacity: 0.7,
  },
  input: {
    marginBottom: spacing.md,
    backgroundColor: theme.colors.surface,
  },
  currencyContainer: {
    marginTop: spacing.sm,
  },
  segmentedButtons: {
    marginTop: spacing.sm,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  categoryChip: {
    marginBottom: spacing.sm,
  },
  selectedChip: {
    backgroundColor: theme.colors.primary + '20',
  },
  buttonContainer: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
    gap: spacing.sm,
  },
  completeButton: {
    paddingVertical: spacing.xs,
  },
});

export default OnboardingScreen;
