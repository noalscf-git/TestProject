import * as React from 'react';
import {Button, Text, View, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator} from 'react-native'
import {useEffect, useState} from "react";
import TaskActions, { TTasks } from "../actions/TaskActions";
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../reducers/rootReducer';
import { TaskState } from '../reducers/taskReducer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LoginState } from '../reducers/loginReducer';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../style';


export const Status= new Map()
                .set(0,'задача не выполнена')
                .set(1,'задача не выполнена, отредактирована админом')
                .set(10,'задача выполнена')
                .set(11,'задача отредактирована админом и выполнена')

interface ItemProps{
    item: TTasks,
    onPress?: () => void,
}

const ItemTask:React.FC<ItemProps>=({item,onPress})=>{
    return(
        <View key={item.id} style={styles.task}>
            <TouchableOpacity onPress={onPress} >
                <Text>id: {item.id}</Text>
                <Text>Имя пользователя: {item.username}</Text>
                <Text>Email пользователя: {item.email}</Text>
                <Text>Текст задачи: {item.text}</Text>
                <Text>Статус: {Status.get(item.status)}</Text>
        </TouchableOpacity>
        </View>
    )
}

export const TaskScreen: React.FC = () => {

    const [sortField, setSortField]=useState<string>('id')
    const [sortDirection, setSortDirection]=useState<string>('asc')
    const [page, setPage]=useState<number>(1)
    const [pagination , setPagination]=useState<Array<number>>([])

    const { tasks,taskCount,loading } = useSelector<AppState,TaskState>(({ tasks }) => tasks);
    const { token } = useSelector<AppState,LoginState>(({ login }) => login);

    const dispatch = useDispatch();
    const navigation=useNavigation()

    useEffect(()=>{
        getTasks()
    },[])

    useEffect(()=>{
        getTasks(sortField,sortDirection,page)
    },[sortField, sortDirection, page])

    useEffect(()=>{
        const arrayPagination=[]
        for (let i = 0; i < taskCount/3; i++) {
            arrayPagination.push(i+1)
        }
        setPagination(arrayPagination)
    },[taskCount])

    const getTasks = async (sortField?,sortDirection?,page?) => {
        try {
            await dispatch(TaskActions.getTasks(sortField,sortDirection,page));
            return null;
        } catch (error) {
            console.log("getTasks error", error)
        }
        return null
    }

    const addTask = () => {
        navigation.navigate("AddTask")
        return null
    }


    const onPressTask = (id:number) => {
        token!==''&&navigation.navigate("EditTask",{id:id})
        return null
    }


    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView style={{width: '100%'}}>
                <Button onPress={addTask} title={'Создать новую задачу'}/>
                {loading?
                    <View style={{ flex: 1, alignItems:'center', justifyContent: "center"}}>
                      <ActivityIndicator size="large" />
                    </View>
                    :
                <View>
                    <View style={{paddingTop:10}}>
                        <Text style={{paddingLeft:7}}>Сортировка:</Text>
                        <Picker
                            selectedValue={sortField}
                            style={{height:20,width: 200}}
                            onValueChange={(itemValue:string) => {setSortField(itemValue)}
                            }
                        >
                                <Picker.Item label="id" value="id" />
                                <Picker.Item label="Имя пользователя" value="username" />
                                <Picker.Item label="email" value="email" />
                                <Picker.Item label="Статус" value="status" />
                        </Picker>
                    </View>

                    <View style={{}}>
                        <Picker
                            selectedValue={sortDirection}
                            style={{height:20,width: 200}}
                            onValueChange={(itemValue:string) =>{
                                setSortDirection(itemValue)
                            }
                        }>
                                <Picker.Item label="По возрастанию" value="asc" />
                                <Picker.Item label="По убыванию" value="desc" />
                        </Picker>
                    </View>

                    {tasks&&tasks.map((item)=>{
                        return(
                           <ItemTask key={item.id} item={item} onPress={()=>onPressTask(item.id)}/>
                        )
                    })
                    }

                    {tasks&&tasks.length>0&&<View style={{flexDirection:'row'}}>
                        <Text>Страница: </Text>
                        {pagination.map((item)=>{
                        return(
                            <TouchableOpacity key={item} onPress={()=>setPage(item)} >
                                <Text style={{fontWeight:item===page?'bold':'normal'}}> {item} </Text>
                            </TouchableOpacity>
                        )
                        })}
                        </View>
                    }
                </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    task:{
        width: '100%', 
        padding:10,
        borderBottomWidth:StyleSheet.hairlineWidth
    }
  });