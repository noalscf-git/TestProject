var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Button, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoginActions from "../actions/LoginActions";
import { globalStyles } from '../style';
export const LoginScreen = () => {
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const { token } = useSelector(({ login }) => login);
    const dispatch = useDispatch();
    const login = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield dispatch(LoginActions.login(usernameValue, passwordValue));
        }
        catch (error) {
            console.log("login error", error);
        }
        return null;
    });
    const logout = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield dispatch(LoginActions.logout());
        }
        catch (error) {
            console.log("logout error", error);
        }
        return null;
    });
    return (<SafeAreaView style={globalStyles.container}>
            {token === '' ?
        <ScrollView style={{ width: '100%' }}>
                    <TextInput editable={true} placeholderTextColor='#a3a3aa' placeholder='Введите имя' value={usernameValue} onChangeText={(e) => {
            setUsernameValue(e);
        }} style={styles.input}/>

                    <TextInput editable={true} secureTextEntry={true} placeholderTextColor='#a3a3aa' placeholder='Введите пароль' value={passwordValue} onChangeText={(e) => {
            setPasswordValue(e);
        }} style={styles.input}/>
                
                <View style={styles.button}>
                    <Button onPress={login} title={'Войти'}/>
                </View>
            </ScrollView>
        :
            <View>
                <Text>Вы вошли под администратором</Text>
                <View style={styles.button}>
                    <Button onPress={logout} title={'Выйти'}/>
                </View>
            </View>}
        </SafeAreaView>);
};
const styles = StyleSheet.create({
    input: {
        width: '100%',
        color: "#04162d",
        padding: 0,
        paddingTop: 20,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    button: {
        paddingTop: 20
    }
});
