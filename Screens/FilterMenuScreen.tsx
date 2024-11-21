import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useMenu } from './MenuContext';

export default function FilterMenuScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'FilterMenu'>) {
  // Get menu items from global context
  const { menuItems } = useMenu();
  
  // State to manage filtered items, initially shows all items
  const [filteredItems, setFilteredItems] = useState(menuItems);

  // Function to filter menu items by course type
  const filterByCourse = (course: string) => {
    setFilteredItems(menuItems.filter(item => item.course === course));
  };

  // Function to reset filter and show all items
  const clearFilter = () => {
    setFilteredItems(menuItems);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>

      <TouchableOpacity 
        style={styles.homeButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.homeButtonText}>Back to Home</Text>
      </TouchableOpacity>

      <View style={styles.filterButtonContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, styles.startersButton]} 
          onPress={() => filterByCourse('Starters')}
        >
          <Text style={styles.filterButtonText}>Starters</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, styles.mainsButton]} 
          onPress={() => filterByCourse('Mains')}
        >
          <Text style={styles.filterButtonText}>Mains</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, styles.dessertsButton]} 
          onPress={() => filterByCourse('Desserts')}
        >
          <Text style={styles.filterButtonText}>Desserts</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.clearFilterButton} 
          onPress={clearFilter}
        >
          <Text style={styles.clearFilterButtonText}>Clear Filter</Text>
        </TouchableOpacity>
      </View>

      {/* List of menu items */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>No items in this category</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.dishName} - {item.course}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  homeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  filterButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10, // Added gap between buttons
  },
  filterButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  startersButton: {
    backgroundColor: '#3498db', // Bright blue
  },
  mainsButton: {
    backgroundColor: '#e74c3c', // Vibrant red
  },
  dessertsButton: {
    backgroundColor: '#2ecc71', // Soft green
  },
  filterButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  clearFilterButton: {
    backgroundColor: '#9b59b6', // Purple
    paddingVertical: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  clearFilterButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#888',
  },
});