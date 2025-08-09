import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme} from '@/utils/theme';
import HomeScreen from '@/screens/HomeScreen';
import PriceWatcherScreen from '@/screens/PriceWatcherScreen';
import BudgetScreen from '@/screens/BudgetScreen';
import BillsScreen from '@/screens/BillsScreen';
import ProfileScreen from '@/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Price Watcher':
              iconName = 'trending-down';
              break;
            case 'Budget':
              iconName = 'account-balance-wallet';
              break;
            case 'Bills':
              iconName = 'receipt';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'home';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurface,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.onSurface,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'FinGuard',
        }}
      />
      <Tab.Screen 
        name="Price Watcher" 
        component={PriceWatcherScreen}
        options={{
          title: 'Price Watcher',
        }}
      />
      <Tab.Screen 
        name="Budget" 
        component={BudgetScreen}
        options={{
          title: 'Smart Budget',
        }}
      />
      <Tab.Screen 
        name="Bills" 
        component={BillsScreen}
        options={{
          title: 'Bill Optimizer',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
