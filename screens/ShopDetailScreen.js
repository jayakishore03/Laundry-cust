import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import Footer from '../components/Footer';

// Mock services data
const services = [
  {
    id: 1,
    name: 'Wash & Iron',
    icon: '🧼',
    description: 'Washing and ironing service',
    price: 'Starting from ₹80',
  },
  {
    id: 2,
    name: 'Washing',
    icon: '🧼',
    description: 'Professional washing service',
    price: 'Starting from ₹50',
  },
  {
    id: 3,
    name: 'Ironing',
    icon: '🔥',
    description: 'Premium ironing service',
    price: 'Starting from ₹30',
  },
  {
    id: 4,
    name: 'Dry Cleaning',
    icon: '✨',
    description: 'Expert dry cleaning',
    price: 'Starting from ₹150',
  },
  {
    id: 5,
    name: 'Stain Removal',
    icon: '🧪',
    description: 'Specialized stain treatment',
    price: 'Starting from ₹100',
  },
  {
    id: 6,
    name: 'Steam Press',
    icon: '💨',
    description: 'Professional steam pressing',
    price: 'Starting from ₹40',
  },
];

export default function ShopDetailScreen({ route, navigation }) {
  const { shop } = route.params;
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleService = (service) => {
    setSelectedServices((prev) => {
      const isSelected = prev.some((s) => s.id === service.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        let updated = [...prev, service];
        
        // If "Wash & Iron" is selected, remove "Washing" and "Ironing"
        if (service.id === 1) { // Wash & Iron
          updated = updated.filter((s) => s.id !== 2 && s.id !== 3);
        }
        // If "Washing" or "Ironing" is selected, remove "Wash & Iron"
        else if (service.id === 2 || service.id === 3) { // Washing or Ironing
          updated = updated.filter((s) => s.id !== 1);
        }
        
        return updated;
      }
    });
  };

  // Filter services to hide Washing and Ironing when Wash & Iron is selected
  const getFilteredServices = () => {
    const hasWashAndIron = selectedServices.some((s) => s.id === 1);
    if (hasWashAndIron) {
      return services.filter((s) => s.id !== 2 && s.id !== 3);
    }
    return services;
  };

  const handleContinue = () => {
    if (selectedServices.length === 0) {
      return;
    }
    
    // Navigate to ServiceDetail with first selected service
    // You can modify this to handle multiple services as needed
    navigation.navigate('ServiceDetail', {
      shop,
      service: selectedServices[0],
      selectedServices: selectedServices, // Pass all selected services
    });
  };

  return (
    <View style={styles.container}>
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Shop Header */}
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.shopHeader}>
          <View style={styles.shopImageContainer}>
            <Text style={styles.shopImageEmoji}>{shop.image}</Text>
          </View>
          <View style={styles.shopHeaderInfo}>
            <Text style={styles.shopName}>{shop.name}</Text>
            <Text style={styles.shopAddress}>{shop.address}</Text>
            <View style={styles.shopMeta}>
              <Text style={styles.distance}>📍 {shop.distance}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Services Section */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Available Services</Text>
        <Text style={styles.sectionSubtitle}>
          Select one or more services
        </Text>

        <View style={styles.servicesGrid}>
          {getFilteredServices().map((service) => {
            const isSelected = selectedServices.some((s) => s.id === service.id);
            return (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceCard,
                  isSelected && styles.serviceCardSelected,
                ]}
                onPress={() => toggleService(service)}
              >
                {isSelected && (
                  <View style={styles.selectedBadge}>
                    <Ionicons name="checkmark" size={20} color={Colors.white} />
                  </View>
                )}
                <Text style={styles.serviceIcon}>{service.icon}</Text>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Continue Button */}
      {selectedServices.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.footerInfo}>
            <Text style={styles.footerText}>
              {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected
            </Text>
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              style={styles.continueButtonGradient}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
    <Footer navigation={navigation} currentScreen={null} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  shopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  shopImageEmoji: {
    fontSize: 35,
  },
  shopHeaderInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 5,
  },
  shopAddress: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  shopMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
  },
  servicesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 20,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: Colors.secondary,
    position: 'relative',
  },
  serviceCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
  },
  selectedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  serviceIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
  },
  footer: {
    backgroundColor: Colors.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    borderRadius: 15,
  },
  footerInfo: {
    marginBottom: 15,
  },
  footerText: {
    fontSize: 16,
    color: Colors.textLight,
    fontWeight: '500',
    textAlign: 'center',
  },
  continueButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  continueButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

