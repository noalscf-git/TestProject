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
import { Button, SafeAreaView, ScrollView, TextInput, Text, View, StyleSheet } from 'react-native';
import { useState } from "react";
import TaskActions from "../actions/TaskActions";
import { useDispatch } from 'react-redux';
function validateEmail(email) {
    var pattern = RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return pattern.test(email);
}
export const AddTascScreen = ({ navigation }) => {
    const [usernameValue, setUsernameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [textValue, setTextValue] = useState('');
    const [usernameIsValid, setUsernameIsValid] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [textIsValid, setTextIsValid] = useState(true);
    const dispatch = useDispatch();
    const addTask = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (usernameValue.trim() === "")
                setUsernameIsValid(false);
            else
                setUsernameIsValid(true);
            if (!validateEmail(emailValue.trim()))
                setEmailIsValid(false);
            else
                setEmailIsValid(true);
            if (textValue.trim() == "")
                setTextIsValid(false);
            else
                setTextIsValid(true);
            if (usernameValue.trim() !== "" && validateEmail(emailValue.trim()) && textValue.trim() != "") {
                yield dispatch(TaskActions.addTasks(usernameValue.trim(), emailValue.trim(), textValue.trim()));
                yield dispatch(TaskActions.getTasks());
                navigation.navigate("Tasks");
            }
            return null;
        }
        catch (error) {
            console.log("getTasks error", error);
        }
        return null;
    });
    return (<SafeAreaView style={styles.container}>
        <ScrollView style={{ width: '100%' }}>
        <TextInput editable={true} placeholderTextColor='#a3a3aa' placeholder='Введите имя пользователя' value={usernameValue} onChangeText={(e) => {
        setUsernameValue(e);
    }} style={styles.input}/>
            {!usernameIsValid && <Text style={{ color: 'red' }}>Имя пользователя не введено</Text>}
        <TextInput editable={true} placeholderTextColor='#a3a3aa' placeholder='Введите email-адрес пользователя' value={emailValue} onChangeText={(e) => {
        setEmailValue(e);
    }} style={styles.input}/>
            {!emailIsValid && <Text style={{ color: 'red' }}>Email-адрес не правильный</Text>}
        <TextInput editable={true} placeholderTextColor='#a3a3aa' placeholder='Введите текст задачи' value={textValue} onChangeText={(e) => {
        setTextValue(e);
    }} style={styles.input}/>
            {!textIsValid && <Text style={{ color: 'red' }}>Текст задачи не введен</Text>}
        <View style={{ paddingTop: 20 }}>
            <Button onPress={addTask} title={'Создать задачу'}/>
        </View>
    </ScrollView>
    </SafeAreaView>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#fff"
    },
    input: {
        width: '100%',
        color: "#04162d",
        padding: 0,
        paddingTop: 20,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
});
