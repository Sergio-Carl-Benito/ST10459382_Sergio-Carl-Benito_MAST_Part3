import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Button, FlatList, StyleSheet, Animated, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useMenu } from './MenuContext';

export default function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const { menuItems, removeMenuItem } = useMenu();

  const {
    groupedItems,
    averagePrices,
    starters,
    mains,
    desserts,
    avgPriceAll,
    avgPriceStarters,
    avgPriceMains,
    avgPriceDesserts,
  } = useMemo(() => {
    const groupedItems = menuItems.reduce((groups, item) => {
      if (!groups[item.course]) {
        groups[item.course] = [];
      }
      groups[item.course].push(item);
      return groups;
    }, {} as Record<string, typeof menuItems>);

    const calculateAveragePrice = (items: typeof menuItems) =>
      items?.length > 0 ? items.reduce((sum, item) => sum + item.price, 0) / items.length : 0;

    const averagePrices: Record<string, number> = {};
    for (const [course, items] of Object.entries(groupedItems)) {
      averagePrices[course] = calculateAveragePrice(items);
    }

    const starters = groupedItems['Starters'] || [];
    const mains = groupedItems['Mains'] || [];
    const desserts = groupedItems['Desserts'] || [];

    return {
      groupedItems,
      averagePrices,
      starters,
      mains,
      desserts,
      avgPriceAll: calculateAveragePrice(menuItems),
      avgPriceStarters: averagePrices['Starters'] || 0,
      avgPriceMains: averagePrices['Mains'] || 0,
      avgPriceDesserts: averagePrices['Desserts'] || 0,
    };
  }, [menuItems]);

  const [boxAnimation] = useState(new Animated.Value(1));
  const [bgColor, setBgColor] = useState('red');

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(boxAnimation, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(boxAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const bgColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    let colorIndex = 0;
    const intervalId = setInterval(() => {
      setBgColor(bgColors[colorIndex]);
      colorIndex = (colorIndex + 1) % bgColors.length;
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  const priceDetails = [
    { label: 'Total Items in Menu:', value: menuItems.length },
    { label: 'Average Price of All Menu items: R', value: avgPriceAll.toFixed(2) },
    { label: 'Average Price for Starters Only: R', value: avgPriceStarters.toFixed(2) },
    { label: 'Average Price for Mains Only: R', value: avgPriceMains.toFixed(2) },
    { label: 'Average Price for Desserts Only: R', value: avgPriceDesserts.toFixed(2) },
  ];

  const handleRemoveItem = (id: string) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => removeMenuItem(id) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.titleBox, { backgroundColor: bgColor, transform: [{ scale: boxAnimation }] }]}>
        <Text style={styles.title}>Chef's Menu</Text>
      </Animated.View>

      <View style={styles.averagePrices}>
        {priceDetails.map((item, index) => (
          <Text key={index} style={styles.totalItems}>
            {item.label} {item.value}
          </Text>
        ))}
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <Text style={styles.dishName}>{item.dishName} - {item.course}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
            <Button title="Remove" color="red" onPress={() => handleRemoveItem(item.id)} />
          </TouchableOpacity>
        )}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAdd} onPress={() => navigation.navigate('AddMenuItem')}>
          <Text style={styles.buttonText}>Add Menu Item</Text>
        </TouchableOpacity>
        <Button title="Filter Menu" onPress={() => navigation.navigate('FilterMenu', { menuItems })} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  totalItems: {
    fontSize: 18,
    marginTop: 10,
    color: '#333',
  },
  titleBox: {
    borderColor: '#4CAF50',
    borderWidth: 2,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  menuItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  averagePrices: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  buttonAdd: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});