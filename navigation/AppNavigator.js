import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// Stacks
import AddressStack from './AddressStack';
import LoginStack from './LoginStack';
import StackMenuScreens from './StackMenuScreens';
import StackProductListScreen from './StackProductListScreen';
import StackScreens from './StackScreens';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: 'transparent',
    },
};

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer theme={theme}>
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: '#e91e63',
                    itemStyle: { marginVertical: 5 },
                }}>
                <Drawer.Screen
                    name="HomePage"
                    options={{ drawerLabel: 'Home' }}
                    component={StackScreens}
                />

                <Drawer.Screen
                    name="Address"
                    options={{ drawerLabel: 'Address' }}
                    component={AddressStack}
                />
                <Drawer.Screen
                    name="Login"
                    options={{ drawerLabel: 'Login' }}
                    component={LoginStack}
                />

                <Drawer.Screen
                    name="FirstSideMenuItem"
                    options={{ drawerLabel: 'Products' }}
                    component={StackProductListScreen}
                />
                <Drawer.Screen
                    name="FirstSideCMenuItem"
                    options={{ drawerLabel: 'Categories' }}
                    component={StackMenuScreens}
                />
                <Drawer.Screen
                    name="SecondSideMenuItem"
                    options={{ drawerLabel: 'Account' }}
                    component={StackScreens}
                />
                <Drawer.Screen
                    name="ThirdSideMenuItem"
                    options={{ drawerLabel: 'Addresses' }}
                    component={StackScreens}
                />
                <Drawer.Screen
                    name="FourthSideMenuItem"
                    options={{ drawerLabel: 'Call US' }}
                    component={StackScreens}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}