import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {Text, Button, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LineChart} from 'react-native-chart-kit';

import {theme, spacing} from '@/utils/theme';
import {useAuth} from '@/services/AuthContext';
import Card from '@/components/Card';
import PriceTag from '@/components/PriceTag';

const HomeScreen: React.FC = () => {
  const {user} = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [monthlySavings, setMonthlySavings] = useState(247.50);
  const [inflationRate, setInflationRate] = useState(3.2);

  const screenWidth = Dimensions.get('window').width;

  // Mock data for savings chart
  const savingsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [120, 180, 210, 195, 230, 247],
        color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: theme.colors.surface,
    backgroundGradientFrom: theme.colors.surface,
    backgroundGradientTo: theme.colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(66, 66, 66, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: theme.colors.primary,
    },
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Fetch latest data
    setTimeout(() => setRefreshing(false), 1000);
  };

  const quickActions = [
    {
      title: 'What Can I Afford?',
      icon: 'search',
      color: theme.colors.accent,
      onPress: () => {}, // TODO: Navigate to affordability mode
    },
    {
      title: 'Add Price Alert',
      icon: 'notifications',
      color: theme.colors.secondary,
      onPress: () => {}, // TODO: Navigate to price alerts
    },
    {
      title: 'Review Budget',
      icon: 'account-balance-wallet',
      color: theme.colors.primary,
      onPress: () => {}, // TODO: Navigate to budget screen
    },
  ];

  const recentAlerts = [
    {
      id: '1',
      product: 'Organic Milk',
      store: 'Whole Foods',
      currentPrice: 4.99,
      targetPrice: 4.50,
      savings: 0.49,
    },
    {
      id: '2',
      product: 'iPhone 15 Case',
      store: 'Amazon',
      currentPrice: 24.99,
      targetPrice: 20.00,
      savings: 4.99,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* Welcome Header */}
      <Card style={styles.welcomeCard}>
        <Text variant="headlineSmall" style={styles.welcomeText}>
          Welcome back, {user?.name || 'User'}! 👋
        </Text>
        <Text variant="bodyMedium" style={styles.tagline}>
          Beat inflation, every day.
        </Text>
      </Card>

      {/* Monthly Savings Overview */}
      <Card>
        <View style={styles.savingsHeader}>
          <View>
            <Text variant="titleMedium">This Month's Savings</Text>
            <PriceTag 
              price={monthlySavings} 
              currency={user?.currency || 'USD'} 
              size="large" 
            />
          </View>
          <Chip 
            icon="trending-up" 
            style={styles.inflationChip}
            textStyle={styles.inflationText}>
            Inflation: {inflationRate}%
          </Chip>
        </View>

        <LineChart
          data={savingsData}
          width={screenWidth - 64}
          height={200}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </Card>

      {/* Quick Actions */}
      <Card>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Quick Actions
        </Text>
        <View style={styles.actionsContainer}>
          {quickActions.map((action, index) => (
            <Button
              key={index}
              mode="outlined"
              onPress={action.onPress}
              icon={action.icon}
              style={[styles.actionButton, {borderColor: action.color}]}
              labelStyle={{color: action.color}}>
              {action.title}
            </Button>
          ))}
        </View>
      </Card>

      {/* Recent Price Alerts */}
      <Card>
        <View style={styles.sectionHeader}>
          <Text variant="titleMedium">Recent Price Alerts</Text>
          <Button mode="text" onPress={() => {}}>
            View All
          </Button>
        </View>

        {recentAlerts.map(alert => (
          <View key={alert.id} style={styles.alertItem}>
            <View style={styles.alertInfo}>
              <Text variant="bodyLarge" style={styles.productName}>
                {alert.product}
              </Text>
              <Text variant="bodySmall" style={styles.storeName}>
                {alert.store}
              </Text>
            </View>
            <View style={styles.priceInfo}>
              <PriceTag 
                price={alert.currentPrice} 
                currency={user?.currency || 'USD'} 
                size="small" 
              />
              <View style={styles.savingsInfo}>
                <Icon name="trending-down" size={16} color={theme.colors.success} />
                <Text style={styles.savingsText}>
                  Save ${alert.savings.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: spacing.md,
  },
  welcomeCard: {
    backgroundColor: theme.colors.primary,
    marginBottom: spacing.md,
  },
  welcomeText: {
    color: theme.colors.onPrimary,
    fontWeight: 'bold',
  },
  tagline: {
    color: theme.colors.onPrimary,
    marginTop: spacing.xs,
    opacity: 0.9,
  },
  savingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  inflationChip: {
    backgroundColor: theme.colors.warning + '20',
  },
  inflationText: {
    color: theme.colors.warning,
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: 16,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  actionsContainer: {
    gap: spacing.sm,
  },
  actionButton: {
    marginVertical: spacing.xs,
  },
  alertItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline + '20',
  },
  alertInfo: {
    flex: 1,
  },
  productName: {
    fontWeight: '500',
  },
  storeName: {
    color: theme.colors.onSurface,
    marginTop: 2,
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  savingsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  savingsText: {
    color: theme.colors.success,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default HomeScreen;
