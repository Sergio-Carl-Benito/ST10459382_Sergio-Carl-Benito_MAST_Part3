import React, { createContext, useState, useContext, ReactNode } from 'react';

export type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: number;
};

type MenuContextType = {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  removeMenuItem: (id: string) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setMenuItems(prev => [...prev, newItem]);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};