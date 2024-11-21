// Importing necessary libraries and types
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Defining the structure of a MenuItem
export type MenuItem = {
  id: string; // Unique identifier for each menu item
  dishName: string; // Name of the dish
  description: string; // Description of the dish
  course: string; // The category of the dish (e.g., starters, mains, desserts)
  price: number; // Price of the dish
};

// Defining the type for the MenuContext, including methods for adding and removing items
type MenuContextType = {
  menuItems: MenuItem[]; // Array of menu items
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void; // Function to add a menu item (id will be generated)
  removeMenuItem: (id: string) => void; // Function to remove a menu item by its id
};

// Creating the context to hold the menu state and functions
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// The MenuProvider component will wrap around parts of the app that need access to the menu state
export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]); // State to store the list of menu items

  // Function to add a new menu item
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    // Create a new item with a generated id
    const newItem = { ...item, id: Date.now().toString() };
    // Update the menuItems state with the new item
    setMenuItems(prev => [...prev, newItem]);
  };

  // Function to remove a menu item by its id
  const removeMenuItem = (id: string) => {
    // Filter out the item with the given id and update the state
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    // The MenuContext.Provider makes the menu items and functions accessible to components within this provider
    <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem }}>
      {children} {/* Render the children components */}
    </MenuContext.Provider>
  );
};

// Custom hook to use the MenuContext, providing access to the menu data and functions
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    // If useMenu is called outside of MenuProvider, throw an error
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context; // Return the context data (menuItems, addMenuItem, removeMenuItem)
};
