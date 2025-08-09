import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {Text, TextInput, Button, Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {theme, spacing} from '@/utils/theme';
import {useAuth} from '@/services/AuthContext';
import Card from '@/components/Card';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const {login} = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await login('demo@finguard.com', 'demo123');
    } catch (error) {
      Alert.alert('Demo Login Failed', 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Welcome Back
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Sign in to continue saving money
          </Text>
        </View>

        <Card style={styles.formCard}>
          <View style={styles.form}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              style={styles.input}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password"
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.loginButton}>
              Sign In
            </Button>

            <Button
              mode="text"
              onPress={() => {}}
              style={styles.forgotButton}>
              Forgot Password?
            </Button>
          </View>
        </Card>

        <View style={styles.dividerContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <Divider style={styles.divider} />
        </View>

        <Card>
          <Button
            mode="outlined"
            onPress={handleDemoLogin}
            loading={loading}
            disabled={loading}
            icon="play-circle-outline"
            style={styles.demoButton}>
            Try Demo Account
          </Button>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
          </Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Register' as never)}
            compact>
            Sign Up
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.md,
    justifyContent: 'center',
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
  formCard: {
    marginBottom: spacing.md,
  },
  form: {
    gap: spacing.md,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  loginButton: {
    paddingVertical: spacing.xs,
    marginTop: spacing.sm,
  },
  forgotButton: {
    alignSelf: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  divider: {
    flex: 1,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    color: theme.colors.onSurface,
  },
  demoButton: {
    paddingVertical: spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    color: theme.colors.onSurface,
  },
});

export default LoginScreen;
