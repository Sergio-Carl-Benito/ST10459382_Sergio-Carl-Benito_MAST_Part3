import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [menuItems, setMenuItems] = useState<{ dishName: string, description: string, course: string, price: number }[]>([]);

  useEffect(() => {
    if (route.params?.newItem) {
      setMenuItems((prevItems) => [...prevItems, route.params.newItem as { dishName: string; description: string; course: string; price: number }]);
    }
  }, [route.params?.newItem]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef's Menu</Text>

      <Text style={styles.itemCount}>Total Items: {menuItems.length}</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.dishName} - {item.course}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAdd} onPress={() => navigation.navigate('AddMenu')}>
          <Text style={styles.buttonText}>Add Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonFilter} onPress={() => navigation.navigate('FilterMenu')}>
          <Text style={styles.buttonText}>Filter Menu</Text>
        </TouchableOpacity>
      </View>
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
    fontFamily: 'sans-serif',
  },
  itemCount: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'sans-serif',
  },
  menuItem: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 10,
  },
  dishName: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  description: {
    fontSize: 16,
    fontFamily: 'sans-serif',
  },
  price: {
    fontSize: 16,
    fontFamily: 'sans-serif',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  buttonAdd: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonFilter: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'sans-serif',
  },
});
