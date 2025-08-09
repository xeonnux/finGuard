import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
  Image,
} from 'react-native';
import {
  Text,
  Button,
  TextInput,
  Chip,
  FAB,
  Modal,
  Portal,
  IconButton,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme, spacing} from '@/utils/theme';
import {useAuth} from '@/services/AuthContext';
import Card from '@/components/Card';
import PriceTag from '@/components/PriceTag';
import {Product, PricePoint, PriceAlert} from '@/types';

const PriceWatcherScreen: React.FC = () => {
  const {user} = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [watchedProducts, setWatchedProducts] = useState<(Product & {
    currentPrice: number;
    targetPrice: number;
    lowestPrice: number;
    priceHistory: PricePoint[];
    stores: string[];
  })[]>([]);

  const categories = ['All', 'Groceries', 'Electronics', 'Clothing', 'Home', 'Health'];

  // Mock data
  useEffect(() => {
    setWatchedProducts([
      {
        id: '1',
        name: 'Organic Whole Milk',
        category: 'Groceries',
        brand: 'Horizon',
        imageUrl: 'https://via.placeholder.com/100x100',
        currentPrice: 4.99,
        targetPrice: 4.50,
        lowestPrice: 4.29,
        stores: ['Whole Foods', 'Target', 'Amazon Fresh'],
        priceHistory: [
          {
            id: '1',
            productId: '1',
            store: 'Whole Foods',
            price: 5.29,
            currency: 'USD',
            location: 'New York',
            timestamp: new Date('2024-01-01'),
            isOnline: false,
          },
          {
            id: '2',
            productId: '1',
            store: 'Target',
            price: 4.99,
            currency: 'USD',
            location: 'New York',
            timestamp: new Date('2024-01-15'),
            isOnline: false,
          },
        ],
      },
      {
        id: '2',
        name: 'iPhone 15 Pro Case',
        category: 'Electronics',
        brand: 'Apple',
        imageUrl: 'https://via.placeholder.com/100x100',
        currentPrice: 49.99,
        targetPrice: 40.00,
        lowestPrice: 42.99,
        stores: ['Apple Store', 'Amazon', 'Best Buy'],
        priceHistory: [],
      },
      {
        id: '3',
        name: 'Nike Air Max 270',
        category: 'Clothing',
        brand: 'Nike',
        imageUrl: 'https://via.placeholder.com/100x100',
        currentPrice: 129.99,
        targetPrice: 100.00,
        lowestPrice: 109.99,
        stores: ['Nike', 'Foot Locker', 'Amazon'],
        priceHistory: [],
      },
    ]);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Fetch latest prices from API
    setTimeout(() => setRefreshing(false), 1000);
  };

  const filteredProducts = watchedProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderProductItem = ({item}: {item: typeof watchedProducts[0]}) => {
    const savings = item.currentPrice - item.lowestPrice;
    const isPriceAlert = item.currentPrice <= item.targetPrice;

    return (
      <Card style={styles.productCard}>
        <View style={styles.productHeader}>
          <Image source={{uri: item.imageUrl}} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text variant="titleMedium" style={styles.productName}>
              {item.name}
            </Text>
            <Text variant="bodySmall" style={styles.productBrand}>
              {item.brand} • {item.category}
            </Text>
            <View style={styles.storesContainer}>
              {item.stores.slice(0, 2).map(store => (
                <Chip key={store} compact style={styles.storeChip}>
                  {store}
                </Chip>
              ))}
              {item.stores.length > 2 && (
                <Text style={styles.moreStores}>+{item.stores.length - 2} more</Text>
              )}
            </View>
          </View>
          <IconButton
            icon="more-vert"
            onPress={() => {}}
            style={styles.menuButton}
          />
        </View>

        <View style={styles.priceSection}>
          <View style={styles.priceInfo}>
            <PriceTag
              price={item.currentPrice}
              currency={user?.currency || 'USD'}
              originalPrice={item.currentPrice > item.lowestPrice ? item.currentPrice + savings : undefined}
              size="medium"
              showSavings
            />
            <View style={styles.targetPrice}>
              <Text variant="bodySmall" style={styles.targetLabel}>
                Target: {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: user?.currency || 'USD',
                }).format(item.targetPrice)}
              </Text>
            </View>
          </View>

          {isPriceAlert && (
            <View style={styles.alertBadge}>
              <Icon name="notifications" size={16} color={theme.colors.success} />
              <Text style={styles.alertText}>Price Alert!</Text>
            </View>
          )}
        </View>

        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            compact
            onPress={() => {}}
            icon="trending-up">
            Price History
          </Button>
          <Button
            mode="contained"
            compact
            onPress={() => {}}
            icon="shopping-cart">
            Buy Now
          </Button>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search and Filters */}
      <View style={styles.searchSection}>
        <TextInput
          label="Search products"
          value={searchQuery}
          onChangeText={setSearchQuery}
          mode="outlined"
          left={<TextInput.Icon icon="magnify" />}
          style={styles.searchInput}
        />
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}>
          {categories.map(category => (
            <Chip
              key={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
              style={styles.categoryChip}>
              {category}
            </Chip>
          ))}
        </ScrollView>
      </View>

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="search-off" size={64} color={theme.colors.onSurface} />
            <Text variant="headlineSmall" style={styles.emptyTitle}>
              No products found
            </Text>
            <Text variant="bodyMedium" style={styles.emptySubtitle}>
              Add products to start tracking prices
            </Text>
          </View>
        }
      />

      {/* Add Product FAB */}
      <FAB
        icon="add"
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
      />

      {/* Add Product Modal */}
      <Portal>
        <Modal
          visible={showAddModal}
          onDismiss={() => setShowAddModal(false)}
          contentContainerStyle={styles.modalContent}>
          <AddProductForm onClose={() => setShowAddModal(false)} />
        </Modal>
      </Portal>
    </View>
  );
};

const AddProductForm: React.FC<{onClose: () => void}> = ({onClose}) => {
  const [productUrl, setProductUrl] = useState('');
  const [productName, setProductName] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    // TODO: Add product to watchlist
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <View style={styles.modalForm}>
      <Text variant="headlineSmall" style={styles.modalTitle}>
        Add Product to Watch
      </Text>

      <TextInput
        label="Product URL or Name"
        value={productUrl}
        onChangeText={setProductUrl}
        mode="outlined"
        placeholder="Paste URL or type product name"
        style={styles.modalInput}
      />

      <TextInput
        label="Product Name (optional)"
        value={productName}
        onChangeText={setProductName}
        mode="outlined"
        style={styles.modalInput}
      />

      <TextInput
        label="Target Price"
        value={targetPrice}
        onChangeText={setTargetPrice}
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
          Add Product
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
  searchSection: {
    padding: spacing.md,
    backgroundColor: theme.colors.surface,
  },
  searchInput: {
    marginBottom: spacing.md,
  },
  categoriesScroll: {
    marginHorizontal: -spacing.md,
  },
  categoryChip: {
    marginRight: spacing.sm,
    marginLeft: spacing.md,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: 100,
  },
  productCard: {
    marginBottom: spacing.md,
  },
  productHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: theme.colors.outline,
  },
  productInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  productName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  productBrand: {
    color: theme.colors.onSurface,
    marginBottom: spacing.sm,
  },
  storesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  storeChip: {
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  moreStores: {
    fontSize: 12,
    color: theme.colors.onSurface,
  },
  menuButton: {
    margin: 0,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  priceInfo: {
    flex: 1,
  },
  targetPrice: {
    marginTop: spacing.xs,
  },
  targetLabel: {
    color: theme.colors.onSurface,
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.success + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  alertText: {
    color: theme.colors.success,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  actionButtons: {
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

export default PriceWatcherScreen;
