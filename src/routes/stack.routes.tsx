import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MedicineDetail } from '../pages/MedicineDetail';
import { MyDoses } from '../pages/MyDoses';
import  AuthRoutes  from '../routes/tabs.routes';

const StackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
    <StackRoutes.Navigator headerMode = 'none' >
        
        
        <StackRoutes.Screen
            name = 'MyDoses'
            component = {AuthRoutes}
        />
        <StackRoutes.Screen  
            name = 'MedicineSave'
            component = {AuthRoutes}
        />

    </StackRoutes.Navigator>
)

export default AppRoutes;