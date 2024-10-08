import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Animated } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [menuItems, setMenuItems] = useState<{ dishName: string, description: string, course: string, price: number }[]>([]);
  const [boxAnimation] = useState(new Animated.Value(1));
  const [bgColor, setBgColor] = useState('red');

  useEffect(() => {
    if (route.params?.newItem) {
      setMenuItems((prevItems) => [...prevItems, route.params.newItem as { dishName: string; description: string; course: string; price: number }]);
    }
  }, [route.params?.newItem]);

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

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.titleBox, { backgroundColor: bgColor, transform: [{ scale: boxAnimation }] }]}>
        <Text style={styles.title}>Chef's Menu</Text>
      </Animated.View>

      <Text style={styles.itemCount}>Total Items: {menuItems.length}</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
            <Text style={styles.dishName}>{item.dishName} - {item.course}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAdd} onPress={() => navigation.navigate('AddMenuItem')}>
          <Text style={styles.buttonText}>Add Menu Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonFilter} onPress={() => navigation.navigate('FilterMenu')}>
          <Text style={styles.buttonText}>Filter Search Menu</Text>
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
    backgroundColor: 'gray',
    padding: 20,
  },
  titleBox: {
    borderColor: 'blue',
    borderWidth: 2,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'sans-serif',
  },
  itemCount: {
    fontSize: 18,
    marginBottom: 10,
  },
  menuItem: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  dishName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
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
  },
});
