import React from 'react';
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../styles/colors';
import { MyDoses } from '../pages/MyDoses';
import { MedicineSave } from '../pages/MedicineSave';

const AppTab = createBottomTabNavigator();

const AuthRoutes: React.FC = () => {
    return(
        <AppTab.Navigator 
        tabBarOptions={{
            activeTintColor: colors.green,
            inactiveTintColor: colors.heading,
            labelPosition: 'beside-icon',
            style: {
              paddingVertical: Platform.OS === 'ios' ? 20 : 0,
              height: 60
            }
          }}
        >

            <AppTab.Screen 
                name="My Doses"
                component={MyDoses}
                options={{
                  tabBarIcon: (({ size, color}) => (
                    <MaterialIcons
                      name="format-list-bulleted"
                      size={size}
                      color={color}
                    />
                  ))
                }}
            />

            <AppTab.Screen
                    name=" Add Medicine "
                    component={MedicineSave}
                    options={{
                    tabBarIcon: (({ size, color}) => (
                        <MaterialIcons
                        name="add-circle-outline"
                        size={size}
                        color={color}
                        />
                    ))
                    }}
                />

        </AppTab.Navigator>
    )
}

export default AuthRoutes;
