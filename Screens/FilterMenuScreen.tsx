// screens/FilterMenuScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type FilterMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'FilterMenu'>;

export default function FilterMenuScreen({ route, navigation }: FilterMenuScreenProps) {
  // Extract menuItems from route.params with a default empty array
  const menuItems = route.params?.menuItems || [];
  const [filteredItems, setFilteredItems] = useState(menuItems);

  // Filter by course type
  const filterByCourse = (course: string) => {
    setFilteredItems(menuItems.filter(item => item.course === course));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>
      <Button title="Show Appetizers" onPress={() => filterByCourse('Appetizer')} />
      <Button title="Show Mains" onPress={() => filterByCourse('Main')} />
      <Button title="Show Desserts" onPress={() => filterByCourse('Dessert')} />
      <Button title="Clear Filter" onPress={() => setFilteredItems(menuItems)} />

      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.dishName} - {item.course}</Text>
            <Text>{item.description}</Text>
            <Text>${item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  menuItem: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    width: '100%',
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});