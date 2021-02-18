import * as React from 'react';
import {Button, SafeAreaView, ScrollView, TextInput, Text, View, StyleSheet} from 'react-native'
import {useState} from "react";
import TaskActions from "../actions/TaskActions";
import { useDispatch } from 'react-redux';
import { globalStyles } from '../style';
import { useMyAlert } from '../MyAlert';

const validateEmail=(email:string)=> {
    const pattern  = RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return pattern.test(email);
}


export const AddTascScreen: React.FC<any> = ({navigation}) => {

    const [usernameValue, setUsernameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [textValue, setTextValue] = useState('')

    const [emailIsValid, setEmailIsValid] = useState(true)
    const [textIsValid, setTextIsValid] = useState(true)

    const dispatch = useDispatch();

    const myAlert=useMyAlert()

    const addTask = async () => {
        try {
            if(usernameValue.trim()==="") myAlert('Имя пользователя не введено')

            if(!validateEmail(emailValue.trim())) setEmailIsValid(false)
                else setEmailIsValid(true)
            if(textValue.trim()=="") setTextIsValid(false)
                else setTextIsValid(true)

            if(usernameValue.trim()!=="" && validateEmail(emailValue.trim()) && textValue.trim()!=""){
                await dispatch(TaskActions.addTasks(usernameValue.trim(),emailValue.trim(),textValue.trim()));
                await dispatch(TaskActions.getTasks());
                navigation.navigate("Tasks")
            }
            return null;
        } catch (error) {
            console.log("getTasks error", error)
        }
        return null
    }

    return (
        <SafeAreaView style={globalStyles.container}>
        <ScrollView style={{width: '100%'}}>
        <TextInput
            editable={true}
            placeholderTextColor='#a3a3aa'
            placeholder='Введите имя пользователя'
            value={usernameValue}
            onChangeText={(e) => {
                setUsernameValue(e)
            }}
            style={styles.input}
            />
        <TextInput
            editable={true}
            placeholderTextColor='#a3a3aa'
            placeholder='Введите email-адрес пользователя'
            value={emailValue}
            onChangeText={(e) => {
                setEmailValue(e)
            }}
            style={styles.input}
            />
            {!emailIsValid&&<Text style={{color:'red'}}>Email-адрес не правильный</Text>}
        <TextInput
            editable={true}
            placeholderTextColor='#a3a3aa'
            placeholder='Введите текст задачи'
            value={textValue}
            onChangeText={(e) => {
                setTextValue(e)
            }}
            style={styles.input}
            />
            {!textIsValid&&<Text style={{color:'red'}}>Текст задачи не введен</Text>}
        <View style={{paddingTop:20}}>
            <Button onPress={addTask} title={'Создать задачу'}/>
        </View>
    </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input:{
        width: '100%', 
        color: "#04162d", 
        padding:0,
        paddingTop:20,
        borderBottomWidth:StyleSheet.hairlineWidth
    },
  });