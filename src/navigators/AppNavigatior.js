var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator, } from '@react-navigation/material-top-tabs';
import { TaskScreen } from '../screens/Tasks';
import { LoginScreen } from '../screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
import { AddTascScreen } from '../screens/AddTask';
import { useEffect } from 'react';
import LoginActions from '../actions/LoginActions';
import { useDispatch } from 'react-redux';
import { EditTascScreen } from '../screens/EditTask';
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
function TaskNavigatior() {
    return (<Stack.Navigator>
                <Stack.Screen name="Tasks" component={TaskScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="AddTask" component={AddTascScreen} options={{ title: 'Новая задача' }}/>
                <Stack.Screen name="EditTask" component={EditTascScreen} options={{ title: 'Редактирование задачи' }}/>
            </Stack.Navigator>);
}
export default function AppNavigator() {
    useEffect(() => {
        getToken();
    }, []);
    const dispatch = useDispatch();
    const getToken = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield dispatch(LoginActions.checkToken());
            return null;
        }
        catch (error) {
            console.log("getToken error", error);
        }
        return null;
    });
    return (<NavigationContainer>
            <Tab.Navigator>                
                <Tab.Screen name="Tasks" component={TaskNavigatior} options={{ title: 'Задачи' }}/>
                <Tab.Screen name="Login" component={LoginScreen} options={{ title: 'Вход' }}/>
            </Tab.Navigator>
        </NavigationContainer>);
}
