import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
import {
  Text,
  Button,
  Chip,
  FAB,
  Modal,
  Portal,
  TextInput,
  SegmentedButtons,
  Card as PaperCard,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme, spacing} from '@/utils/theme';
import {useAuth} from '@/services/AuthContext';
import Card from '@/components/Card';
import PriceTag from '@/components/PriceTag';
import {Bill, BillRecommendation} from '@/types';

const BillsScreen: React.FC = () => {
  const {user} = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('current');
  const [showAddModal, setShowAddModal] = useState(false);
  const [bills, setBills] = useState<Bill[]>([]);
  const [recommendations, setRecommendations] = useState<BillRecommendation[]>([]);

  // Mock data
  useEffect(() => {
    setBills([
      {
        id: '1',
        userId: user?.id || '1',
        name: 'Electricity Bill',
        category: 'utilities',
        amount: 120.50,
        currency: 'USD',
        provider: 'ConEd',
        dueDate: new Date('2024-02-15'),
        frequency: 'monthly',
        isActive: true,
      },
      {
        id: '2',
        userId: user?.id || '1',
        name: 'Internet Plan',
        category: 'internet',
        amount: 79.99,
        currency: 'USD',
        provider: 'Verizon Fios',
        dueDate: new Date('2024-02-20'),
        frequency: 'monthly',
        isActive: true,
      },
      {
        id: '3',
        userId: user?.id || '1',
        name: 'Car Insurance',
        category: 'insurance',
        amount: 150.00,
        currency: 'USD',
        provider: 'State Farm',
        dueDate: new Date('2024-02-28'),
        frequency: 'monthly',
        isActive: true,
      },
      {
        id: '4',
        userId: user?.id || '1',
        name: 'Netflix',
        category: 'subscription',
        amount: 15.49,
        currency: 'USD',
        provider: 'Netflix',
        dueDate: new Date('2024-02-10'),
        frequency: 'monthly',
        isActive: true,
      },
      {
        id: '5',
        userId: user?.id || '1',
        name: 'Spotify Premium',
        category: 'subscription',
        amount: 9.99,
        currency: 'USD',
        provider: 'Spotify',
        dueDate: new Date('2024-02-05'),
        frequency: 'monthly',
        isActive: true,
      },
    ]);

    setRecommendations([
      {
        id: '1',
        billId: '2',
        provider: 'Xfinity',
        newAmount: 59.99,
        potentialSavings: 20.00,
        switchingBonus: 50.00,
        rating: 4.2,
        description: 'Similar speed, better price. Installation included.',
        switchUrl: 'https://xfinity.com/deals',
      },
      {
        id: '2',
        billId: '3',
        provider: 'Geico',
        newAmount: 125.00,
        potentialSavings: 25.00,
        rating: 4.5,
        description: 'Same coverage, 15% discount for good drivers.',
      },
      {
        id: '3',
        billId: '1',
        provider: 'Green Energy Co',
        newAmount: 95.00,
        potentialSavings: 25.50,
        rating: 4.3,
        description: '100% renewable energy, competitive rates.',
      },
    ]);
  }, [user?.id]);

  const totalMonthlyBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const totalPotentialSavings = recommendations.reduce((sum, rec) => sum + rec.potentialSavings, 0);

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Fetch latest bills and recommendations
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'utilities': return 'flash-on';
      case 'internet': return 'wifi';
      case 'insurance': return 'security';
      case 'subscription': return 'subscriptions';
      default: return 'receipt';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'utilities': return '#FF5722';
      case 'internet': return '#2196F3';
      case 'insurance': return '#4CAF50';
      case 'subscription': return '#9C27B0';
      default: return theme.colors.primary;
    }
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderBillItem = ({item: bill}: {item: Bill}) => {
    const daysUntilDue = getDaysUntilDue(bill.dueDate);
    const isOverdue = daysUntilDue < 0;
    const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;

    const recommendation = recommendations.find(rec => rec.billId === bill.id);

    return (
      <Card style={styles.billCard}>
        <View style={styles.billHeader}>
          <View style={styles.billInfo}>
            <View style={[styles.categoryIcon, {backgroundColor: getCategoryColor(bill.category) + '20'}]}>
              <Icon 
                name={getCategoryIcon(bill.category)} 
                size={24} 
                color={getCategoryColor(bill.category)} 
              />
            </View>
            <View style={styles.billDetails}>
              <Text variant="titleMedium" style={styles.billName}>
                {bill.name}
              </Text>
              <Text variant="bodySmall" style={styles.billProvider}>
                {bill.provider}
              </Text>
              <View style={styles.billMeta}>
                <Chip 
                  compact 
                  style={[
                    styles.dueChip,
                    isOverdue && styles.overdueBadge,
                    isDueSoon && styles.dueSoonBadge,
                  ]}>
                  {isOverdue 
                    ? `Overdue ${Math.abs(daysUntilDue)} days`
                    : isDueSoon 
                    ? `Due in ${daysUntilDue} days`
                    : `Due ${bill.dueDate.toLocaleDateString()}`
                  }
                </Chip>
              </View>
            </View>
          </View>
          
          <View style={styles.billAmount}>
            <PriceTag
              price={bill.amount}
              currency={bill.currency}
              size="medium"
            />
            <Text variant="bodySmall" style={styles.frequency}>
              {bill.frequency}
            </Text>
          </View>
        </View>

        {recommendation && (
          <View style={styles.recommendationSection}>
            <View style={styles.recommendationHeader}>
              <Icon name="lightbulb" size={16} color={theme.colors.secondary} />
              <Text style={styles.recommendationTitle}>Better Deal Available</Text>
            </View>
            
            <View style={styles.recommendationContent}>
              <View style={styles.providerInfo}>
                <Text style={styles.newProvider}>{recommendation.provider}</Text>
                <View style={styles.rating}>
                  <Icon name="star" size={12} color={theme.colors.warning} />
                  <Text style={styles.ratingText}>{recommendation.rating}</Text>
                </View>
              </View>
              
              <View style={styles.savingsInfo}>
                <PriceTag
                  price={recommendation.newAmount}
                  currency={bill.currency}
                  originalPrice={bill.amount}
                  size="small"
                  showSavings
                />
                {recommendation.switchingBonus && (
                  <Text style={styles.bonus}>
                    +${recommendation.switchingBonus} bonus
                  </Text>
                )}
              </View>
            </View>
            
            <Text style={styles.recommendationDescription}>
              {recommendation.description}
            </Text>
            
            <View style={styles.recommendationActions}>
              <Button 
                mode="outlined" 
                compact 
                onPress={() => {}}>
                Learn More
              </Button>
              <Button 
                mode="contained" 
                compact 
                onPress={() => {}}>
                Switch Now
              </Button>
            </View>
          </View>
        )}
      </Card>
    );
  };

  const renderRecommendationItem = ({item: rec}: {item: BillRecommendation}) => {
    const bill = bills.find(b => b.id === rec.billId);
    if (!bill) return null;

    return (
      <Card style={styles.recommendationCard}>
        <View style={styles.recHeader}>
          <View style={styles.recIcon}>
            <Icon name="trending-down" size={24} color={theme.colors.success} />
          </View>
          <View style={styles.recInfo}>
            <Text variant="titleMedium">Save on {bill.name}</Text>
            <Text variant="bodySmall" style={styles.recProvider}>
              Switch to {rec.provider}
            </Text>
          </View>
          <View style={styles.recSavings}>
            <Text style={styles.savingsAmount}>
              Save ${rec.potentialSavings}/mo
            </Text>
            <View style={styles.rating}>
              <Icon name="star" size={14} color={theme.colors.warning} />
              <Text style={styles.ratingText}>{rec.rating}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.recDescription}>{rec.description}</Text>

        <View style={styles.recActions}>
          <Button mode="outlined" compact onPress={() => {}}>
            Details
          </Button>
          <Button mode="contained" compact onPress={() => {}}>
            Switch Now
          </Button>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <Card style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text variant="bodySmall" style={styles.statLabel}>Monthly Bills</Text>
            <PriceTag
              price={totalMonthlyBills}
              currency={user?.currency || 'USD'}
              size="large"
            />
          </View>
          <View style={styles.statItem}>
            <Text variant="bodySmall" style={styles.statLabel}>Potential Savings</Text>
            <Text style={styles.savingsText}>
              ${totalPotentialSavings.toFixed(2)}/mo
            </Text>
          </View>
        </View>
      </Card>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <SegmentedButtons
          value={selectedTab}
          onValueChange={setSelectedTab}
          buttons={[
            {value: 'current', label: 'Current Bills'},
            {value: 'recommendations', label: 'Recommendations'},
          ]}
        />
      </View>

      {/* Content */}
      {selectedTab === 'current' ? (
        <FlatList
          data={bills}
          renderItem={renderBillItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Icon name="receipt-long" size={64} color={theme.colors.onSurface} />
              <Text variant="headlineSmall" style={styles.emptyTitle}>
                No bills added
              </Text>
              <Text variant="bodyMedium" style={styles.emptySubtitle}>
                Add your bills to start finding better deals
              </Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={recommendations}
          renderItem={renderRecommendationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Icon name="lightbulb-outline" size={64} color={theme.colors.onSurface} />
              <Text variant="headlineSmall" style={styles.emptyTitle}>
                No recommendations yet
              </Text>
              <Text variant="bodyMedium" style={styles.emptySubtitle}>
                Add bills to get personalized money-saving recommendations
              </Text>
            </View>
          }
        />
      )}

      {/* Add Bill FAB */}
      <FAB
        icon="add"
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
      />

      {/* Add Bill Modal */}
      <Portal>
        <Modal
          visible={showAddModal}
          onDismiss={() => setShowAddModal(false)}
          contentContainerStyle={styles.modalContent}>
          <AddBillForm onClose={() => setShowAddModal(false)} />
        </Modal>
      </Portal>
    </View>
  );
};

const AddBillForm: React.FC<{onClose: () => void}> = ({onClose}) => {
  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    amount: '',
    category: 'utilities',
    dueDate: '',
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    {value: 'utilities', label: 'Utilities'},
    {value: 'internet', label: 'Internet'},
    {value: 'insurance', label: 'Insurance'},
    {value: 'subscription', label: 'Subscription'},
    {value: 'other', label: 'Other'},
  ];

  const handleAdd = async () => {
    setLoading(true);
    // TODO: Add bill to database
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  return (
    <ScrollView style={styles.modalForm}>
      <Text variant="headlineSmall" style={styles.modalTitle}>
        Add New Bill
      </Text>

      <TextInput
        label="Bill Name"
        value={formData.name}
        onChangeText={(value) => updateFormData('name', value)}
        mode="outlined"
        style={styles.modalInput}
      />

      <TextInput
        label="Provider/Company"
        value={formData.provider}
        onChangeText={(value) => updateFormData('provider', value)}
        mode="outlined"
        style={styles.modalInput}
      />

      <TextInput
        label="Monthly Amount"
        value={formData.amount}
        onChangeText={(value) => updateFormData('amount', value)}
        mode="outlined"
        keyboardType="numeric"
        left={<TextInput.Affix text="$" />}
        style={styles.modalInput}
      />

      <View style={styles.categorySection}>
        <Text variant="bodyMedium" style={styles.fieldLabel}>
          Category
        </Text>
        <SegmentedButtons
          value={formData.category}
          onValueChange={(value) => updateFormData('category', value)}
          buttons={categories}
        />
      </View>

      <TextInput
        label="Due Date"
        value={formData.dueDate}
        onChangeText={(value) => updateFormData('dueDate', value)}
        mode="outlined"
        placeholder="DD/MM/YYYY"
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
          Add Bill
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  statsCard: {
    margin: spacing.md,
    marginBottom: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: theme.colors.onSurface,
    marginBottom: spacing.xs,
  },
  savingsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.success,
  },
  tabContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 100,
  },
  billCard: {
    marginBottom: spacing.md,
  },
  billHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  billInfo: {
    flexDirection: 'row',
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
  billDetails: {
    flex: 1,
  },
  billName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  billProvider: {
    color: theme.colors.onSurface,
    marginBottom: spacing.sm,
  },
  billMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueChip: {
    alignSelf: 'flex-start',
  },
  overdueBadge: {
    backgroundColor: theme.colors.error + '20',
  },
  dueSoonBadge: {
    backgroundColor: theme.colors.warning + '20',
  },
  billAmount: {
    alignItems: 'flex-end',
  },
  frequency: {
    color: theme.colors.onSurface,
    marginTop: 2,
  },
  recommendationSection: {
    backgroundColor: theme.colors.secondary + '10',
    padding: spacing.md,
    borderRadius: 8,
    marginTop: spacing.sm,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  recommendationTitle: {
    marginLeft: spacing.xs,
    fontWeight: '600',
    color: theme.colors.secondary,
  },
  recommendationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  providerInfo: {
    flex: 1,
  },
  newProvider: {
    fontWeight: '600',
    marginBottom: 2,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 2,
    fontSize: 12,
    color: theme.colors.onSurface,
  },
  savingsInfo: {
    alignItems: 'flex-end',
  },
  bonus: {
    fontSize: 12,
    color: theme.colors.success,
    marginTop: 2,
  },
  recommendationDescription: {
    fontSize: 14,
    color: theme.colors.onSurface,
    marginBottom: spacing.md,
  },
  recommendationActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  recommendationCard: {
    marginBottom: spacing.md,
  },
  recHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  recIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  recInfo: {
    flex: 1,
  },
  recProvider: {
    color: theme.colors.onSurface,
    marginTop: 2,
  },
  recSavings: {
    alignItems: 'flex-end',
  },
  savingsAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.success,
    marginBottom: 2,
  },
  recDescription: {
    color: theme.colors.onSurface,
    marginBottom: spacing.md,
  },
  recActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    marginTop: spacing.md,
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: spacing.sm,
    textAlign: 'center',
    color: theme.colors.onSurface,
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
    maxHeight: '80%',
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
  categorySection: {
    marginBottom: spacing.md,
  },
  fieldLabel: {
    marginBottom: spacing.sm,
    color: theme.colors.onSurface,
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

export default BillsScreen;
