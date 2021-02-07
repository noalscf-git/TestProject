import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Button, SafeAreaView} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import LoginActions from "../actions/LoginActions";
import { LoginState } from '../reducers/loginReducer';
import { AppState } from '../reducers/rootReducer';

export const LoginScreen:React.FC = () => {
    const [usernameValue, setUsernameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const { token } = useSelector<AppState,LoginState>(({ login }) => login);

    const dispatch = useDispatch();

    const login = async () => {
        try {
            const result: any = await dispatch(LoginActions.login(usernameValue, passwordValue));
            return null;
        } catch (error) {
            console.log("login error", error)
        }
        return null
    }

    const logout = async () => {
        try {
            await dispatch(LoginActions.logout());
            return null;
        } catch (error) {
            console.log("logout error", error)
        }
        return null
    }


    return (
        <SafeAreaView style={styles.container}>
            {token===''?
            <ScrollView style={{width: '100%'}}>
                    <TextInput
                        editable={true}
                        placeholderTextColor='#a3a3aa'
                        placeholder='Введите имя'
                        value={usernameValue}
                        onChangeText={(e) => {
                            setUsernameValue(e)
                        }}
                        style={styles.input}
                    />

                        <TextInput
                            editable={true}
                            secureTextEntry={true}
                            placeholderTextColor='#a3a3aa'
                            placeholder='Введите пароль'
                            value={passwordValue}
                            onChangeText={(e) => {
                                setPasswordValue(e)
                            }}
                            style={styles.input}
                        />
                
                <View style={styles.button}>
                    <Button onPress={login} title={'Войти'}/>
                </View>
            </ScrollView>
            :
            <View>
                <Text>Вы вошли под администратором</Text>
                <View style={{paddingTop:20}}>
                    <Button onPress={logout} title={'Выйти'}/>
                </View>
            </View>    
        }
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: "#fff"
    },
    input:{
        width: '100%', 
        color: "#04162d", 
        padding:0,
        paddingTop:20,
        borderBottomWidth:StyleSheet.hairlineWidth
    },
    button:{
        paddingTop:20
    }
  });



