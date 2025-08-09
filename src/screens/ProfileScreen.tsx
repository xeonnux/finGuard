import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Text,
  Button,
  List,
  Switch,
  Divider,
  Modal,
  Portal,
  TextInput,
  SegmentedButtons,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme, spacing} from '@/utils/theme';
import {useAuth} from '@/services/AuthContext';
import Card from '@/components/Card';

const ProfileScreen: React.FC = () => {
  const {user, logout, updateUser} = useAuth();
  const [showAffordabilityModal, setShowAffordabilityModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    budgetWarnings: true,
    billReminders: true,
    savingsOpportunities: true,
  });

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Sign Out', onPress: logout, style: 'destructive'},
      ]
    );
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const subscriptionStatus = user?.subscriptionStatus === 'premium' ? 'Premium' : 'Free';
  const subscriptionColor = user?.subscriptionStatus === 'premium' ? theme.colors.success : theme.colors.warning;

  return (
    <ScrollView style={styles.container}>
      {/* User Profile Card */}
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text variant="headlineSmall" style={styles.userName}>
              {user?.name || 'User'}
            </Text>
            <Text variant="bodyMedium" style={styles.userEmail}>
              {user?.email}
            </Text>
            <View style={styles.subscriptionBadge}>
              <Icon name="star" size={16} color={subscriptionColor} />
              <Text style={[styles.subscriptionText, {color: subscriptionColor}]}>
                {subscriptionStatus}
              </Text>
            </View>
          </View>
          <Button
            mode="outlined"
            compact
            onPress={() => setShowEditProfileModal(true)}>
            Edit
          </Button>
        </View>

        {user?.location && (
          <View style={styles.locationInfo}>
            <Icon name="location-on" size={16} color={theme.colors.onSurface} />
            <Text style={styles.locationText}>{user.location}</Text>
          </View>
        )}
      </Card>

      {/* Quick Actions */}
      <Card>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Quick Actions
        </Text>
        
        <List.Item
          title="What Can I Afford?"
          description="Find purchases that fit your budget"
          left={() => <List.Icon icon="search" />}
          onPress={() => setShowAffordabilityModal(true)}
          style={styles.listItem}
        />
        
        <List.Item
          title="Export Data"
          description="Download your financial data"
          left={() => <List.Icon icon="download" />}
          onPress={() => {}}
          style={styles.listItem}
        />
        
        <List.Item
          title="Backup & Sync"
          description="Sync data across devices"
          left={() => <List.Icon icon="cloud-sync" />}
          onPress={() => {}}
          style={styles.listItem}
        />
      </Card>

      {/* Subscription */}
      <Card>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Subscription
        </Text>
        
        {user?.subscriptionStatus === 'premium' ? (
          <View style={styles.premiumInfo}>
            <Icon name="check-circle" size={24} color={theme.colors.success} />
            <View style={styles.premiumDetails}>
              <Text variant="titleSmall">Premium Active</Text>
              <Text variant="bodySmall" style={styles.premiumDescription}>
                Unlimited price tracking, advanced insights, and priority support
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.upgradeSection}>
            <Text variant="bodyMedium" style={styles.upgradeDescription}>
              Upgrade to Premium for unlimited features and advanced AI insights
            </Text>
            <Button
              mode="contained"
              onPress={() => {}}
              style={styles.upgradeButton}>
              Upgrade to Premium
            </Button>
          </View>
        )}
      </Card>

      {/* Notification Settings */}
      <Card>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Notifications
        </Text>
        
        <View style={styles.notificationItem}>
          <View style={styles.notificationInfo}>
            <Text variant="bodyLarge">Price Alerts</Text>
            <Text variant="bodySmall" style={styles.notificationDescription}>
              Get notified when prices drop
            </Text>
          </View>
          <Switch
            value={notifications.priceAlerts}
            onValueChange={() => toggleNotification('priceAlerts')}
          />
        </View>
        
        <View style={styles.notificationItem}>
          <View style={styles.notificationInfo}>
            <Text variant="bodyLarge">Budget Warnings</Text>
            <Text variant="bodySmall" style={styles.notificationDescription}>
              Alerts when approaching budget limits
            </Text>
          </View>
          <Switch
            value={notifications.budgetWarnings}
            onValueChange={() => toggleNotification('budgetWarnings')}
          />
        </View>
        
        <View style={styles.notificationItem}>
          <View style={styles.notificationInfo}>
            <Text variant="bodyLarge">Bill Reminders</Text>
            <Text variant="bodySmall" style={styles.notificationDescription}>
              Reminders for upcoming bills
            </Text>
          </View>
          <Switch
            value={notifications.billReminders}
            onValueChange={() => toggleNotification('billReminders')}
          />
        </View>
        
        <View style={styles.notificationItem}>
          <View style={styles.notificationInfo}>
            <Text variant="bodyLarge">Savings Opportunities</Text>
            <Text variant="bodySmall" style={styles.notificationDescription}>
              New ways to save money
            </Text>
          </View>
          <Switch
            value={notifications.savingsOpportunities}
            onValueChange={() => toggleNotification('savingsOpportunities')}
          />
        </View>
      </Card>

      {/* Support & Legal */}
      <Card>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Support & Legal
        </Text>
        
        <List.Item
          title="Help & Support"
          left={() => <List.Icon icon="help" />}
          onPress={() => {}}
          style={styles.listItem}
        />
        
        <List.Item
          title="Privacy Policy"
          left={() => <List.Icon icon="privacy-tip" />}
          onPress={() => {}}
          style={styles.listItem}
        />
        
        <List.Item
          title="Terms of Service"
          left={() => <List.Icon icon="description" />}
          onPress={() => {}}
          style={styles.listItem}
        />
        
        <List.Item
          title="About FinGuard"
          left={() => <List.Icon icon="info" />}
          onPress={() => {}}
          style={styles.listItem}
        />
      </Card>

      {/* Sign Out */}
      <Card>
        <Button
          mode="outlined"
          onPress={handleLogout}
          icon="logout"
          textColor={theme.colors.error}
          style={styles.logoutButton}>
          Sign Out
        </Button>
      </Card>

      {/* Modals */}
      <Portal>
        <Modal
          visible={showAffordabilityModal}
          onDismiss={() => setShowAffordabilityModal(false)}
          contentContainerStyle={styles.modalContent}>
          <AffordabilityModal onClose={() => setShowAffordabilityModal(false)} />
        </Modal>

        <Modal
          visible={showEditProfileModal}
          onDismiss={() => setShowEditProfileModal(false)}
          contentContainerStyle={styles.modalContent}>
          <EditProfileModal 
            user={user}
            onClose={() => setShowEditProfileModal(false)}
            onUpdate={updateUser}
          />
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const AffordabilityModal: React.FC<{onClose: () => void}> = ({onClose}) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const categories = [
    {value: 'food', label: 'Food'},
    {value: 'entertainment', label: 'Entertainment'},
    {value: 'shopping', label: 'Shopping'},
    {value: 'transport', label: 'Transport'},
  ];

  const handleSearch = async () => {
    if (!amount) return;
    
    setLoading(true);
    // Mock AI suggestions
    setTimeout(() => {
      setSuggestions([
        {
          title: 'Lunch at Joe\'s Diner',
          description: 'Classic American diner with great burgers',
          estimatedCost: parseFloat(amount) * 0.8,
          rating: 4.2,
        },
        {
          title: 'Coffee & Pastry',
          description: 'Local coffee shop with fresh pastries',
          estimatedCost: parseFloat(amount) * 0.6,
          rating: 4.5,
        },
        {
          title: 'Food Truck Special',
          description: 'Gourmet food truck near downtown',
          estimatedCost: parseFloat(amount) * 0.7,
          rating: 4.0,
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <ScrollView style={styles.modalForm}>
      <Text variant="headlineSmall" style={styles.modalTitle}>
        What Can I Afford?
      </Text>
      
      <Text variant="bodyMedium" style={styles.modalDescription}>
        Enter your available budget and get AI-powered suggestions
      </Text>

      <TextInput
        label="Available Amount"
        value={amount}
        onChangeText={setAmount}
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
          value={category}
          onValueChange={setCategory}
          buttons={categories}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleSearch}
        loading={loading}
        disabled={!amount || loading}
        style={styles.searchButton}>
        Find Suggestions
      </Button>

      {suggestions.length > 0 && (
        <View style={styles.suggestionsSection}>
          <Text variant="titleMedium" style={styles.suggestionsTitle}>
            AI Suggestions
          </Text>
          
          {suggestions.map((suggestion, index) => (
            <View key={index} style={styles.suggestionItem}>
              <View style={styles.suggestionInfo}>
                <Text variant="titleSmall">{suggestion.title}</Text>
                <Text variant="bodySmall" style={styles.suggestionDescription}>
                  {suggestion.description}
                </Text>
                <View style={styles.suggestionMeta}>
                  <Text style={styles.suggestionPrice}>
                    ${suggestion.estimatedCost.toFixed(2)}
                  </Text>
                  <View style={styles.rating}>
                    <Icon name="star" size={14} color={theme.colors.warning} />
                    <Text style={styles.ratingText}>{suggestion.rating}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      <Button mode="outlined" onPress={onClose} style={styles.closeButton}>
        Close
      </Button>
    </ScrollView>
  );
};

const EditProfileModal: React.FC<{
  user: any;
  onClose: () => void;
  onUpdate: (data: any) => Promise<void>;
}> = ({user, onClose, onUpdate}) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    monthlyIncome: user?.monthlyIncome?.toString() || '',
  });
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await onUpdate({
        name: formData.name,
        location: formData.location,
        monthlyIncome: formData.monthlyIncome ? parseFloat(formData.monthlyIncome) : undefined,
      });
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  return (
    <View style={styles.modalForm}>
      <Text variant="headlineSmall" style={styles.modalTitle}>
        Edit Profile
      </Text>

      <TextInput
        label="Full Name"
        value={formData.name}
        onChangeText={(value) => updateFormData('name', value)}
        mode="outlined"
        style={styles.modalInput}
      />

      <TextInput
        label="Location"
        value={formData.location}
        onChangeText={(value) => updateFormData('location', value)}
        mode="outlined"
        placeholder="City, Country"
        style={styles.modalInput}
      />

      <TextInput
        label="Monthly Income (Optional)"
        value={formData.monthlyIncome}
        onChangeText={(value) => updateFormData('monthlyIncome', value)}
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
          onPress={handleUpdate}
          loading={loading}
          style={styles.modalButton}>
          Update
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: spacing.md,
  },
  profileCard: {
    marginBottom: spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  userEmail: {
    color: theme.colors.onSurface,
    marginBottom: spacing.xs,
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subscriptionText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    color: theme.colors.onSurface,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    fontWeight: '600',
  },
  listItem: {
    paddingHorizontal: 0,
  },
  premiumInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumDetails: {
    marginLeft: spacing.md,
    flex: 1,
  },
  premiumDescription: {
    color: theme.colors.onSurface,
    marginTop: 2,
  },
  upgradeSection: {
    alignItems: 'center',
  },
  upgradeDescription: {
    textAlign: 'center',
    color: theme.colors.onSurface,
    marginBottom: spacing.md,
  },
  upgradeButton: {
    paddingHorizontal: spacing.lg,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationDescription: {
    color: theme.colors.onSurface,
    marginTop: 2,
  },
  logoutButton: {
    borderColor: theme.colors.error,
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
    marginBottom: spacing.md,
  },
  modalDescription: {
    textAlign: 'center',
    color: theme.colors.onSurface,
    marginBottom: spacing.xl,
  },
  modalInput: {
    marginBottom: spacing.md,
  },
  categorySection: {
    marginBottom: spacing.lg,
  },
  fieldLabel: {
    marginBottom: spacing.sm,
    color: theme.colors.onSurface,
  },
  searchButton: {
    marginBottom: spacing.lg,
  },
  suggestionsSection: {
    marginBottom: spacing.lg,
  },
  suggestionsTitle: {
    marginBottom: spacing.md,
  },
  suggestionItem: {
    backgroundColor: theme.colors.background,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  suggestionInfo: {
    flex: 1,
  },
  suggestionDescription: {
    color: theme.colors.onSurface,
    marginTop: 2,
    marginBottom: spacing.xs,
  },
  suggestionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suggestionPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
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
  closeButton: {
    marginTop: spacing.md,
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

export default ProfileScreen;
