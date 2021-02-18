import * as React from 'react';
import {Button, SafeAreaView, ScrollView, TextInput, Text, View, StyleSheet} from 'react-native'
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppState } from '../reducers/rootReducer';
import { TaskState } from '../reducers/taskReducer';
import TaskActions from '../actions/TaskActions';
import CheckBox from '@react-native-community/checkbox';
import { globalStyles } from '../style';

export const EditTascScreen: React.FC = () => {

    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, {id:number}>, string>>();
        
    const {tasks} = useSelector<AppState,TaskState>(({ tasks }) => tasks);
    const [textValue, setTextValue] = useState<string>('')
    const [isClose, setIsCloseValue] = useState<boolean>(false)


    useEffect(()=>{
        if(!!tasks){
            setTextValue(tasks.find((item)=>item.id===route.params.id)?.text)
            setIsCloseValue(tasks.find((item)=>item.id===route.params.id)?.status>=10?true:false)
        }
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
                alert('Текст задачи не может быть пустым')
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
                <View style={styles.button}>
                    <Button  onPress={editTask} title={'Сохранить задачу'}/>
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
    checkboxContainer: {
        flexDirection: "row",
        alignItems:'center',
        paddingTop: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    button:{
        paddingTop:20,
    }
  });