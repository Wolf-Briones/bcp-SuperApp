import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {useAuth} from '../contexts/AuthContext';

const SignInScreen = () => {
  const {signIn} = useAuth();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>BCP</Text>
        </View>

        <Text style={styles.brandTitle}>
          Banca Pyme
        </Text>

        <Text style={styles.brandSubtitle}>
          Plataforma de pruebas para funcionalidades avanzadas
        </Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>
          Bienvenido
        </Text>

        <Text style={styles.description}>
          Estás a punto de ingresar a un entorno de demostración de{' '}
          <Text style={styles.bold}>
            Banca Pyme
          </Text>
          , donde podrás explorar funcionalidades financieras avanzadas para empresas.
        </Text>

        <View style={styles.featureContainer}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🏢</Text>
            <Text style={styles.featureText}>
              Gestión empresarial
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>💳</Text>
            <Text style={styles.featureText}>
              Operaciones bancarias
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📈</Text>
            <Text style={styles.featureText}>
              Finanzas avanzadas
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.button}
          onPress={signIn}>
          <Text style={styles.buttonText}>
            Ingresar al entorno de pruebas
          </Text>
        </Pressable>

        <Text style={styles.footerText}>
          Sandbox • BCP Empresas
        </Text>
      </View>
    </View>
  );
};

const BCP_BLUE = '#0033A0';
const BCP_ORANGE = '#FF7A00';
const BACKGROUND = '#F3F6FB';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  header: {
    alignItems: 'center',
    marginBottom: 28,
  },

  logoContainer: {
    width: 92,
    height: 92,
    borderRadius: 24,
    backgroundColor: BCP_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 4,
    borderColor: BCP_ORANGE,
    elevation: 8,
  },

  logoText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
  },

  brandTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: BCP_BLUE,
  },

  brandSubtitle: {
    marginTop: 6,
    fontSize: 15,
    color: '#667085',
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 28,
    elevation: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#101828',
    textAlign: 'center',
    marginBottom: 14,
  },

  description: {
    textAlign: 'center',
    color: '#475467',
    fontSize: 15,
    lineHeight: 24,
  },

  bold: {
    color: BCP_BLUE,
    fontWeight: '700',
  },

  featureContainer: {
    marginTop: 26,
    gap: 12,
    marginBottom: 30,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 16,
  },

  featureIcon: {
    fontSize: 20,
    marginRight: 12,
  },

  featureText: {
    fontSize: 15,
    color: '#344054',
    fontWeight: '600',
  },

  button: {
    backgroundColor: BCP_ORANGE,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },

  footerText: {
    textAlign: 'center',
    marginTop: 18,
    color: '#98A2B3',
    fontSize: 13,
  },
});

export default SignInScreen;