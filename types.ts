// types.ts
export type RootStackParamList = {
    Home: { newItem?: { dishName: string, description: string, course: string, price: number } };
    AddMenuItem: undefined;
    FilterMenu: undefined;
  };
  