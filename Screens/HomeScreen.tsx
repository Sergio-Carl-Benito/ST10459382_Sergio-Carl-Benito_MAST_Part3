import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Button, FlatList, StyleSheet, Animated, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useMenu } from './MenuContext';

// Main component for HomeScreen
export default function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  // Destructure the menuItems and removeMenuItem from MenuContext
  const { menuItems, removeMenuItem } = useMenu();

  // useMemo to group menu items by course and calculate average prices
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
    // Group items by their course (Starters, Mains, Desserts)
    const groupedItems = menuItems.reduce((groups, item) => {
      if (!groups[item.course]) {
        groups[item.course] = [];
      }
      groups[item.course].push(item);
      return groups;
    }, {} as Record<string, typeof menuItems>);

    // Function to calculate the average price of items
    const calculateAveragePrice = (items: typeof menuItems) =>
      items?.length > 0 ? items.reduce((sum, item) => sum + item.price, 0) / items.length : 0;

    // Create an object to store average prices for each course
    const averagePrices: Record<string, number> = {};
    for (const [course, items] of Object.entries(groupedItems)) {
      averagePrices[course] = calculateAveragePrice(items);
    }

    // Destructure grouped items into individual categories
    const starters = groupedItems['Starters'] || [];
    const mains = groupedItems['Mains'] || [];
    const desserts = groupedItems['Desserts'] || [];

    // Return all the data, including average prices
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
  }, [menuItems]);  // Recalculate whenever menuItems changes

  // State for animations (for scaling effect) and background color
  const [boxAnimation] = useState(new Animated.Value(1));  // Start with scale 1
  const [bgColor, setBgColor] = useState('red');  // Initial background color

  // useEffect to handle animations and periodic background color changes
  useEffect(() => {
    // Animation loop to scale the box size back and forth
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

    // Change the background color every 2.5 seconds from a predefined array
    const bgColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    let colorIndex = 0;
    const intervalId = setInterval(() => {
      setBgColor(bgColors[colorIndex]);
      colorIndex = (colorIndex + 1) % bgColors.length;
    }, 2500);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);  // Empty dependency array means this runs once when the component mounts

  // Price details array to display total items and average prices
  const priceDetails = [
    { label: 'Total Items in Menu:', value: menuItems.length },
    { label: 'Average Price of All Menu items: R', value: avgPriceAll.toFixed(2) },
    { label: 'Average Price for Starters Only: R', value: avgPriceStarters.toFixed(2) },
    { label: 'Average Price for Mains Only: R', value: avgPriceMains.toFixed(2) },
    { label: 'Average Price for Desserts Only: R', value: avgPriceDesserts.toFixed(2) },
  ];

  // Handle removing a menu item (with a confirmation alert)
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

  // Render the UI for the HomeScreen
  return (
    <View style={styles.container}>
      {/* Animated title box with changing background color */}
      <Animated.View style={[styles.titleBox, { backgroundColor: bgColor, transform: [{ scale: boxAnimation }] }]}>
        <Text style={styles.title}>Chef's Menu</Text>
      </Animated.View>

      {/* Display the average prices and total items */}
      <View style={styles.averagePrices}>
        {priceDetails.map((item, index) => (
          <Text key={index} style={styles.totalItems}>
            {item.label} {item.value}
          </Text>
        ))}
      </View>

      {/* FlatList to display all menu items */}
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

      {/* Button to add a menu item and filter the menu */}
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
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  totalItems: {
    fontSize: 16,
    marginTop: 8,
    color: '#6c757d',
    textAlign: 'center',
  },
  titleBox: {
    borderColor: 'rgba(76, 175, 80, 0.5)',
    borderWidth: 2,
    padding: 15,
    marginBottom: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dishName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#28a745',
    marginBottom: 10,
  },
  averagePrices: {
    marginBottom: 15,
    backgroundColor: '#e9ecef',
    borderRadius: 10,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonAdd: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});