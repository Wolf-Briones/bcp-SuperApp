import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {useAuth} from '../contexts/AuthContext';

const AccountScreen = () => {
  const {signOut} = useAuth();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}>
      {/* Header BCP */}
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.bcpLabel}>
              BCP Empresas
            </Text>

            <Text style={styles.welcomeText}>
              Perfil empresarial
            </Text>
          </View>

          <View style={styles.clientBadge}>
            <Text style={styles.clientBadgeText}>
              Cliente Pyme
            </Text>
          </View>
        </View>
      </View>

      {/* Card Empresa */}
      <View style={styles.companyCard}>
        <View style={styles.logoWrapper}>
          <Image
            source={{
              uri: 'https://sistincon.com/assets/img/logos/logo%20sistincon%20baner.png',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.companyName}>
          SISTINCON S.A.C.
        </Text>

        <Text style={styles.companyDescription}>
          Sistemas y Tecnología Informática
          Integrados en la Construcción
        </Text>

        <View style={styles.statusRow}>
          <View style={styles.activeDot} />
          <Text style={styles.statusText}>
            Cliente empresarial activo
          </Text>
        </View>
      </View>

      {/* Información empresarial */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>
          Información empresarial
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>RUC</Text>
          <Text style={styles.infoValue}>
            20609193191
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Sector
          </Text>
          <Text style={styles.infoValue}>
            Tecnología & Construcción
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Tipo cliente
          </Text>
          <Text style={styles.infoValue}>
            Pyme Empresarial
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Estado
          </Text>
          <Text style={styles.activeText}>
            Activo
          </Text>
        </View>
      </View>

      {/* Finanzas */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>
          Saldo disponible
        </Text>

        <Text style={styles.balanceAmount}>
          S/ 124,892.50
        </Text>

        <Text style={styles.balanceSub}>
          Cuenta Corriente Empresarial
        </Text>

        <View style={styles.quickStats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              18
            </Text>
            <Text style={styles.statLabel}>
              Operaciones
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              99.9%
            </Text>
            <Text style={styles.statLabel}>
              Disponibilidad
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              VIP
            </Text>
            <Text style={styles.statLabel}>
              Segmento
            </Text>
          </View>
        </View>
      </View>

      {/* Acciones */}
      <View style={styles.actionsCard}>
        <Text style={styles.sectionTitle}>
          Acciones rápidas
        </Text>

        <View style={styles.actionsGrid}>
          <View style={styles.actionBox}>
            <Text style={styles.actionIcon}>
              💸
            </Text>
            <Text style={styles.actionText}>
              Transferencias
            </Text>
          </View>

          <View style={styles.actionBox}>
            <Text style={styles.actionIcon}>
              📊
            </Text>
            <Text style={styles.actionText}>
              Reportes
            </Text>
          </View>

          <View style={styles.actionBox}>
            <Text style={styles.actionIcon}>
              🏦
            </Text>
            <Text style={styles.actionText}>
              Tesorería
            </Text>
          </View>

          <View style={styles.actionBox}>
            <Text style={styles.actionIcon}>
              🧾
            </Text>
            <Text style={styles.actionText}>
              Pagos
            </Text>
          </View>
        </View>
      </View>

      {/* Logout */}
      <Pressable
        style={styles.logoutButton}
        onPress={signOut}>
        <Text style={styles.logoutText}>
          Cerrar sesión empresarial
        </Text>
      </Pressable>
    </ScrollView>
  );
};

const BCP_BLUE = '#0033A0';
const BCP_ORANGE = '#FF7800';
const BG = '#F4F7FC';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },

  content: {
    paddingBottom: 40,
  },

  header: {
    backgroundColor: BCP_BLUE,
    paddingTop: 60,
    paddingBottom: 90,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bcpLabel: {
    color: '#BFD4FF',
    fontSize: 14,
    fontWeight: '700',
  },

  welcomeText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 6,
  },

  clientBadge: {
    backgroundColor: '#ffffff20',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },

  clientBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },

  companyCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -55,
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    elevation: 6,
  },

  logoWrapper: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    marginBottom: 18,
  },

  logo: {
    width: 220,
    height: 70,
    backgroundColor: '#000000',
    borderRadius: 12
  },

  companyName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#101828',
    textAlign: 'center',
  },

  companyDescription: {
    marginTop: 8,
    textAlign: 'center',
    color: '#667085',
    lineHeight: 22,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },

  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#12B76A',
    marginRight: 8,
  },

  statusText: {
    color: '#12B76A',
    fontWeight: '700',
  },

  infoCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 24,
    padding: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 18,
    color: '#101828',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  infoLabel: {
    color: '#667085',
  },

  infoValue: {
    fontWeight: '700',
    color: '#101828',
  },

  activeText: {
    color: '#12B76A',
    fontWeight: '800',
  },

  balanceCard: {
    backgroundColor: BCP_ORANGE,
    marginHorizontal: 20,
    borderRadius: 28,
    padding: 24,
  },

  balanceLabel: {
    color: '#FFE4CC',
    fontWeight: '700',
  },

  balanceAmount: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
    marginTop: 8,
  },

  balanceSub: {
    color: '#FFF5EC',
    marginTop: 8,
  },

  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },

  statCard: {
    backgroundColor: '#ffffff20',
    borderRadius: 18,
    padding: 16,
    width: '31%',
    alignItems: 'center',
  },

  statValue: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
  },

  statLabel: {
    color: '#fff',
    marginTop: 6,
    fontSize: 12,
  },

  actionsCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 24,
    padding: 20,
  },

  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },

  actionBox: {
    width: '47%',
    backgroundColor: '#F5F7FB',
    borderRadius: 18,
    paddingVertical: 22,
    alignItems: 'center',
  },

  actionIcon: {
    fontSize: 26,
  },

  actionText: {
    marginTop: 10,
    fontWeight: '700',
    color: '#344054',
  },

  logoutButton: {
    marginHorizontal: 20,
    backgroundColor: '#101828',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
  },

  logoutText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
});

export default AccountScreen;