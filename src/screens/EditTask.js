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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import TaskActions from '../actions/TaskActions';
import CheckBox from '@react-native-community/checkbox';
function validateEmail(email) {
    var pattern = RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return pattern.test(email);
}
export const EditTascScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { tasks, taskCount } = useSelector(({ tasks }) => tasks);
    const [textValue, setTextValue] = useState('');
    const [isClose, setIsCloseValue] = useState(false);
    React.useEffect(() => {
        var _a, _b;
        tasks && setTextValue((_a = tasks.find((item) => item.id === route.params.id)) === null || _a === void 0 ? void 0 : _a.text);
        tasks && setIsCloseValue(((_b = tasks.find((item) => item.id === route.params.id)) === null || _b === void 0 ? void 0 : _b.status) >= 10 ? true : false);
    }, [route.params]);
    const dispatch = useDispatch();
    const editTask = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (textValue.trim() !== '') {
                yield dispatch(TaskActions.editTasks(route.params.id, textValue.trim(), isClose));
                yield dispatch(TaskActions.getTasks());
                navigation.navigate("Tasks");
            }
            else {
            }
            return null;
        }
        catch (error) {
            console.log("getTasks error", error);
            //alert("getTasks входа")
        }
        return null;
    });
    return (<SafeAreaView style={styles.container}>
        <ScrollView style={{ width: '100%' }}>
        <TextInput editable={true} placeholderTextColor='#a3a3aa' placeholder='Введите текст задачи' value={textValue} onChangeText={(e) => {
        setTextValue(e);
    }} style={styles.input}/>
            <View style={styles.checkboxContainer}>
            <CheckBox disabled={false} value={isClose} onValueChange={(newValue) => setIsCloseValue(newValue)}/>
            <Text onPress={() => setIsCloseValue(!isClose)}>Задача выполнена</Text>
        </View>
        <View style={{ paddingTop: 20 }}>
            <Button onPress={editTask} title={'Сохранить задачу'}/>
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
    checkboxContainer: {
        flexDirection: "row",
        alignItems: 'center',
        paddingTop: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
});
