import * as React from 'react';
import {Button, SafeAreaView, ScrollView, TextInput, Text, View, StyleSheet} from 'react-native'
import { useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppState } from '../reducers/rootReducer';
import { TaskState } from '../reducers/taskReducer';
import TaskActions from '../actions/TaskActions';
import CheckBox from '@react-native-community/checkbox';

function validateEmail(email) {
    var pattern  = RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return pattern.test(email);
}

export const EditTascScreen: React.FC<any> = () => {

    const navigation = useNavigation();
    const route = useRoute();
        
    const {tasks,taskCount } = useSelector<AppState,TaskState>(({ tasks }) => tasks);
    const [textValue, setTextValue] = useState('')
    const [isClose, setIsCloseValue] = useState(false)


    React.useEffect(()=>{
        tasks&&setTextValue(tasks.find((item)=>item.id===route.params.id)?.text)
        tasks&&setIsCloseValue(tasks.find((item)=>item.id===route.params.id)?.status>=10?true:false)
    },[route.params])



    const dispatch = useDispatch();

    const editTask = async () => {
        try {
             if(textValue.trim()!==''){
                 await dispatch(TaskActions.editTasks(route.params.id,textValue.trim(),isClose));
                 await dispatch(TaskActions.getTasks());
                 navigation.navigate("Tasks")
             }
             else{
                
             }

            return null;
        } catch (error) {
            console.log("getTasks error", error)
            //alert("getTasks входа")
        }
        return null
    }

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={{width: '100%'}}>
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
            <View style={styles.checkboxContainer}>
            <CheckBox
                disabled={false}
                value={isClose}
                onValueChange={(newValue) => setIsCloseValue(newValue)}
            />
            <Text onPress={()=>setIsCloseValue(!isClose)}>Задача выполнена</Text>
        </View>
        <View style={{paddingTop:20}}>
            <Button  onPress={editTask} title={'Сохранить задачу'}/>
        </View>
    </ScrollView>
    </SafeAreaView>
    )
}

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
      checkboxContainer: {
        flexDirection: "row",
        alignItems:'center',
        paddingTop: 20,
      },
      checkbox: {
        alignSelf: "center",
      },
  });