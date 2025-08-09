import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {
  Text,
  Button,
  ProgressBar,
  Chip,
  FAB,
  Modal,
  Portal,
  TextInput,
} from 'react-native-paper';
import {PieChart} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme, spacing} from '@/utils/theme';
import {useAuth} from '@/services/AuthContext';
import Card from '@/components/Card';
import PriceTag from '@/components/PriceTag';
import {Budget, BudgetCategory} from '@/types';

const BudgetScreen: React.FC = () => {
  const {user} = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [showAddModal, setShowAddModal] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories] = useState<BudgetCategory[]>([
    {id: '1', name: 'Groceries', icon: 'shopping-cart', color: '#4CAF50', isEssential: true},
    {id: '2', name: 'Dining Out', icon: 'restaurant', color: '#FF9800', isEssential: false},
    {id: '3', name: 'Transportation', icon: 'directions-car', color: '#2196F3', isEssential: true},
    {id: '4', name: 'Entertainment', icon: 'movie', color: '#9C27B0', isEssential: false},
    {id: '5', name: 'Shopping', icon: 'shopping-bag', color: '#E91E63', isEssential: false},
    {id: '6', name: 'Utilities', icon: 'flash-on', color: '#FF5722', isEssential: true},
    {id: '7', name: 'Healthcare', icon: 'local-hospital', color: '#607D8B', isEssential: true},
    {id: '8', name: 'Savings', icon: 'account-balance', color: '#795548', isEssential: true},
  ]);

  const screenWidth = Dimensions.get('window').width;

  // Mock budget data
  useEffect(() => {
    setBudgets([
      {
        id: '1',
        userId: user?.id || '1',
        category: 'Groceries',
        allocatedAmount: 600,
        spentAmount: 450,
        month: selectedMonth,
        isAdjusted: true,
        inflationRate: 3.2,
      },
      {
        id: '2',
        userId: user?.id || '1',
        category: 'Dining Out',
        allocatedAmount: 300,
        spentAmount: 280,
        month: selectedMonth,
        isAdjusted: false,
      },
      {
        id: '3',
        userId: user?.id || '1',
        category: 'Transportation',
        allocatedAmount: 200,
        spentAmount: 150,
        month: selectedMonth,
        isAdjusted: true,
        inflationRate: 2.8,
      },
      {
        id: '4',
        userId: user?.id || '1',
        category: 'Entertainment',
        allocatedAmount: 150,
        spentAmount: 120,
        month: selectedMonth,
        isAdjusted: false,
      },
      {
        id: '5',
        userId: user?.id || '1',
        category: 'Utilities',
        allocatedAmount: 250,
        spentAmount: 230,
        month: selectedMonth,
        isAdjusted: true,
        inflationRate: 4.1,
      },
      {
        id: '6',
        userId: user?.id || '1',
        category: 'Savings',
        allocatedAmount: 800,
        spentAmount: 800,
        month: selectedMonth,
        isAdjusted: false,
      },
    ]);
  }, [selectedMonth, user?.id]);

  const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocatedAmount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spentAmount, 0);
  const totalRemaining = totalAllocated - totalSpent;

  const pieData = budgets
    .filter(budget => budget.spentAmount > 0)
    .map(budget => {
      const category = categories.find(cat => cat.name === budget.category);
      return {
        name: budget.category,
        population: budget.spentAmount,
        color: category?.color || theme.colors.primary,
        legendFontColor: theme.colors.onSurface,
        legendFontSize: 12,
      };
    });

  const chartConfig = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Fetch latest budget data
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getBudgetStatus = (budget: Budget) => {
    const percentage = (budget.spentAmount / budget.allocatedAmount) * 100;
    if (percentage >= 90) return 'danger';
    if (percentage >= 75) return 'warning';
    return 'good';
  };

  const getBudgetStatusColor = (status: string) => {
    switch (status) {
      case 'danger': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      default: return theme.colors.success;
    }
  };

  const renderBudgetItem = (budget: Budget) => {
    const category = categories.find(cat => cat.name === budget.category);
    const percentage = (budget.spentAmount / budget.allocatedAmount) * 100;
    const remaining = budget.allocatedAmount - budget.spentAmount;
    const status = getBudgetStatus(budget);

    return (
      <Card key={budget.id} style={styles.budgetCard}>
        <View style={styles.budgetHeader}>
          <View style={styles.categoryInfo}>
            <View style={[styles.categoryIcon, {backgroundColor: category?.color + '20'}]}>
              <Icon name={category?.icon || 'category'} size={24} color={category?.color} />
            </View>
            <View style={styles.categoryDetails}>
              <Text variant="titleMedium" style={styles.categoryName}>
                {budget.category}
              </Text>
              {budget.isAdjusted && budget.inflationRate && (
                <Chip 
                  icon="trending-up" 
                  compact 
                  style={styles.inflationChip}
                  textStyle={styles.inflationText}>
                  Adjusted +{budget.inflationRate}%
                </Chip>
              )}
            </View>
          </View>
          <View style={styles.budgetAmounts}>
            <PriceTag
              price={budget.spentAmount}
              currency={user?.currency || 'USD'}
              size="medium"
            />
            <Text variant="bodySmall" style={styles.budgetTotal}>
              of {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: user?.currency || 'USD',
              }).format(budget.allocatedAmount)}
            </Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <ProgressBar
            progress={percentage / 100}
            color={getBudgetStatusColor(status)}
            style={styles.progressBar}
          />
          <View style={styles.progressLabels}>
            <Text variant="bodySmall" style={styles.progressText}>
              {percentage.toFixed(1)}% used
            </Text>
            <Text 
              variant="bodySmall" 
              style={[styles.remainingText, {color: remaining >= 0 ? theme.colors.success : theme.colors.error}]}>
              {remaining >= 0 ? '+' : ''}{new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: user?.currency || 'USD',
              }).format(remaining)} remaining
            </Text>
          </View>
        </View>

        {status === 'danger' && (
          <View style={styles.warningSection}>
            <Icon name="warning" size={16} color={theme.colors.error} />
            <Text style={styles.warningText}>Budget exceeded! Consider adjusting spending.</Text>
          </View>
        )}
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Budget Overview */}
        <Card style={styles.overviewCard}>
          <Text variant="headlineSmall" style={styles.overviewTitle}>
            January 2024 Budget
          </Text>
          
          <View style={styles.overviewStats}>
            <View style={styles.statItem}>
              <Text variant="bodySmall" style={styles.statLabel}>Total Budget</Text>
              <PriceTag
                price={totalAllocated}
                currency={user?.currency || 'USD'}
                size="large"
              />
            </View>
            <View style={styles.statItem}>
              <Text variant="bodySmall" style={styles.statLabel}>Spent</Text>
              <PriceTag
                price={totalSpent}
                currency={user?.currency || 'USD'}
                size="medium"
              />
            </View>
            <View style={styles.statItem}>
              <Text variant="bodySmall" style={styles.statLabel}>Remaining</Text>
              <PriceTag
                price={totalRemaining}
                currency={user?.currency || 'USD'}
                size="medium"
              />
            </View>
          </View>

          {pieData.length > 0 && (
            <PieChart
              data={pieData}
              width={screenWidth - 64}
              height={200}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          )}
        </Card>

        {/* AI Insights */}
        <Card>
          <View style={styles.insightsHeader}>
            <Icon name="lightbulb" size={24} color={theme.colors.secondary} />
            <Text variant="titleMedium" style={styles.insightsTitle}>
              AI Budget Insights
            </Text>
          </View>
          
          <View style={styles.insightsList}>
            <View style={styles.insightItem}>
              <Text style={styles.insightText}>
                🎯 You're on track to save $120 more this month by reducing dining out by 15%
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Text style={styles.insightText}>
                📈 Grocery prices increased 3.2% - your budget was automatically adjusted
              </Text>
            </View>
            <View style={styles.insightItem}>
              <Text style={styles.insightText}>
                ⚡ Switch to a cheaper utility plan to save $25/month
              </Text>
            </View>
          </View>
        </Card>

        {/* Budget Categories */}
        <View style={styles.categoriesHeader}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Budget Categories
          </Text>
          <Button mode="text" onPress={() => {}}>
            Adjust All
          </Button>
        </View>

        {budgets.map(renderBudgetItem)}
      </ScrollView>

      {/* Add Budget FAB */}
      <FAB
        icon="add"
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
      />

      {/* Add Budget Modal */}
      <Portal>
        <Modal
          visible={showAddModal}
          onDismiss={() => setShowAddModal(false)}
          contentContainerStyle={styles.modalContent}>
          <AddBudgetForm onClose={() => setShowAddModal(false)} />
        </Modal>
      </Portal>
    </View>
  );
};

const AddBudgetForm: React.FC<{onClose: () => void}> = ({onClose}) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    // TODO: Add budget category
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <View style={styles.modalForm}>
      <Text variant="headlineSmall" style={styles.modalTitle}>
        Add Budget Category
      </Text>

      <TextInput
        label="Category Name"
        value={category}
        onChangeText={setCategory}
        mode="outlined"
        style={styles.modalInput}
      />

      <TextInput
        label="Monthly Budget"
        value={amount}
        onChangeText={setAmount}
        mode="outlined"
        keyboardType="numeric"
        left={<TextInput.Affix text="$" />}
        style={styles.modalInput}
      />

      <View style={styles.modalButtons}>
        <Button mode="outlined" onPress={onClose} style={styles.modalButton}>
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleAdd}
          loading={loading}
          style={styles.modalButton}>
          Add Category
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  overviewCard: {
    margin: spacing.md,
    marginBottom: spacing.sm,
  },
  overviewTitle: {
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: theme.colors.onSurface,
    marginBottom: spacing.xs,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  insightsTitle: {
    marginLeft: spacing.sm,
  },
  insightsList: {
    gap: spacing.sm,
  },
  insightItem: {
    backgroundColor: theme.colors.secondary + '10',
    padding: spacing.md,
    borderRadius: 8,
  },
  insightText: {
    color: theme.colors.onSurface,
    lineHeight: 20,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  budgetCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryName: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  inflationChip: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.warning + '20',
  },
  inflationText: {
    color: theme.colors.warning,
    fontSize: 10,
  },
  budgetAmounts: {
    alignItems: 'flex-end',
  },
  budgetTotal: {
    color: theme.colors.onSurface,
    marginTop: 2,
  },
  progressSection: {
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: spacing.xs,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    color: theme.colors.onSurface,
  },
  remainingText: {
    fontWeight: '500',
  },
  warningSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.error + '10',
    padding: spacing.sm,
    borderRadius: 6,
    marginTop: spacing.sm,
  },
  warningText: {
    color: theme.colors.error,
    marginLeft: spacing.xs,
    fontSize: 12,
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
    backgroundColor: theme.colors.primary,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    margin: spacing.md,
    borderRadius: 16,
  },
  modalForm: {
    padding: spacing.xl,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  modalInput: {
    marginBottom: spacing.md,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  modalButton: {
    flex: 1,
  },
});

export default BudgetScreen;
