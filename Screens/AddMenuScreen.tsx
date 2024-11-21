import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useMenu } from './MenuContext';

// Define the different categories for menu items
const courses = ['Starters', 'Mains', 'Desserts'];

export default function AddMenuScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'AddMenuItem'>) {
  // Destructure functions and variables from the MenuContext
  const { menuItems, addMenuItem, removeMenuItem } = useMenu();
  
  // State hooks for handling form inputs
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(courses[0]);
  const [price, setPrice] = useState('');
  const [selectedItemToRemove, setSelectedItemToRemove] = useState<string | null>(null);

  // Function to handle form submission and add the new dish to the menu
  const handleSubmit = () => {
    // Check if all required fields are filled
    if (!dishName || !description || !price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate the price input
    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    // Add the new menu item
    addMenuItem({ dishName, description, course, price: parseFloat(price) });

    // Go back to the previous screen
    navigation.goBack();
  };

  // Function to handle removal of a selected item from the menu
  const handleRemoveItem = () => {
    // Check if an item has been selected for removal
    if (selectedItemToRemove) {
      removeMenuItem(selectedItemToRemove);
      setSelectedItemToRemove(null); // Reset the selected item
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Chef,{'\n'}Add a Menu Item</Text>
        
        {/* Dish Name Input */}
        <Text style={styles.label}>Dish Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDishName}
          value={dishName}
        />
        
        {/* Dish Description Input */}
        <Text style={styles.label}>Describe Dish</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          value={description}
        />
        
        {/* Price Input */}
        <Text style={styles.label}>What is the price of the dish?</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPrice}
          value={price}
          keyboardType="numeric"
        />
        
        {/* Course Selection (Starters, Mains, Desserts) */}
        <Text style={styles.label}>Select the course</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={course}
            onValueChange={setCourse}
            style={styles.picker}
          >
            {courses.map((course) => (
              <Picker.Item key={course} label={course} value={course} />
            ))}
          </Picker>
        </View>

        {/* Item Selection for Removal */}
        <Text style={styles.label}>Select Item to Remove</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedItemToRemove}
            onValueChange={(itemValue) => setSelectedItemToRemove(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select an item" value={null} />
            {menuItems.map((item) => (
              <Picker.Item 
                key={item.id} 
                label={`${item.dishName} - ${item.course}`} 
                value={item.id} 
              />
            ))}
          </Picker>
        </View>

        {/* Button to Add New Dish to Menu */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Dish to Menu</Text>
        </TouchableOpacity>

        {/* Button to Remove Selected Item */}
        <TouchableOpacity 
          style={styles.removeButton} 
          onPress={handleRemoveItem}
          disabled={!selectedItemToRemove} // Disable if no item is selected
        >
          <Text style={styles.buttonText}>Remove Selected Item</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

// Styles for the screen elements
const styles = StyleSheet.create({
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'gray',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'sans-serif',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 5,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
});
