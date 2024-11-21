import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useMenu } from './MenuContext';

export default function FilterMenuScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'FilterMenu'>) {
  const { menuItems } = useMenu();
  const [filteredItems, setFilteredItems] = useState(menuItems);

  const filterByCourse = (course: string) => {
    setFilteredItems(menuItems.filter(item => item.course === course));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>
      <Button title="Show Starters" onPress={() => filterByCourse('Starters')} />
      <Button title="Show Mains" onPress={() => filterByCourse('Mains')} />
      <Button title="Show Desserts" onPress={() => filterByCourse('Desserts')} />
      <Button title="Clear Filter" onPress={() => setFilteredItems(menuItems)} />
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.dishName} - {item.course}</Text>
            <Text>{item.description}</Text>
            <Text>R {item.price.toFixed(2)}</Text>
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

