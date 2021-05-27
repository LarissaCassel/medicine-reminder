import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MyDoses } from '../pages/MyDoses';
import { MedicineSave } from '../pages/MedicineSave';

const StackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
    <StackRoutes.Navigator>
        <StackRoutes.Screen
            name = 'MyDoses'
            component = {MyDoses}
        />
        <StackRoutes.Screen
            name = 'MedicineSave'
            component = {MedicineSave}
        />
    </StackRoutes.Navigator>
)

export default AppRoutes;