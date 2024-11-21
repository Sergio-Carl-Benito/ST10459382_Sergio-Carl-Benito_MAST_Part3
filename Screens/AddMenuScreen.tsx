import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useMenu } from './MenuContext';

const courses = ['Starters', 'Mains', 'Desserts'];

export default function AddMenuScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'AddMenuItem'>) {
  const { menuItems, addMenuItem, removeMenuItem } = useMenu();
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(courses[0]);
  const [price, setPrice] = useState('');
  const [selectedItemToRemove, setSelectedItemToRemove] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!dishName || !description || !price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    addMenuItem({ dishName, description, course, price: parseFloat(price) });
    navigation.goBack();
  };

  const handleRemoveItem = () => {
    if (selectedItemToRemove) {
      removeMenuItem(selectedItemToRemove);
      setSelectedItemToRemove(null);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Chef,{'\n'}Add a Menu Item</Text>
      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDishName}
        value={dishName}
      />
      <Text style={styles.label}>Describe Dish</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
      />
      <Text style={styles.label}>What is the price of the dish?</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPrice}
        value={price}
        keyboardType="numeric"
      />
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
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Dish to Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.removeButton} 
        onPress={handleRemoveItem}
        disabled={!selectedItemToRemove}
      >
        <Text style={styles.buttonText}>Remove Selected Item</Text>
      </TouchableOpacity>

      
    </View>
    </ScrollView>
  );
}


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
