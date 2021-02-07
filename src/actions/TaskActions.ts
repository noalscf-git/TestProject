import {
    AppState
} from "react-native";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { Action } from 'redux';
import { developer, url } from "./LoginActions";

export declare type TAction<R = void> = ThunkAction<R, AppState, undefined, Action>


export const SET_TASKS = "SET_TASKS";
export const SET_LOADING= "SET_LOADING";


export type TTasks={
    id: number,
    username: string,
    email: string,
    text: string
    status: number
}

export interface SetTasks {
    type: typeof SET_TASKS,
    tasks: Array<TTasks> | null,
    taskCount:number
}

export interface SetLoading {
    type: typeof SET_LOADING,
    loading: boolean
}

export type Actions=SetTasks|SetLoading



export type WithTaskActions = {
    getTasks: (sort_field?:"id" | "username" | "email" | "status" |null, sort_direction?:"asc" | "desc" |null, page?:number|null) => TAction<void>,
    addTasks: (username:string, email:string, text:string) => TAction<void>,
    editTasks: (id:number, text:string, isClose :boolean) => TAction<void>,
}

const TaskActions: WithTaskActions = {
    getTasks: (sort_field=null,sort_direction=null,page=null) => {
        return async (dispatch) => {
            const response = await fetch(url+
                                            '/?sort_field='+sort_field+
                                            '&sort_direction='+sort_direction+
                                            '&page='+page+
                                            '&developer='+developer, 
                {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                });
            if (response.ok) {
                const json = await response.json();
                if(json.status==="ok"){
                    dispatch({
                        type: SET_TASKS,
                        tasks:json.message.tasks,
                        taskCount:json.message.total_task_count
                    });
                    }
                else alert(json.message)
            } else {
                alert("Ошибка: " + response.status);
            }

        }
    },
    addTasks: (username,email,text) => {
        return async (dispatch) => {

            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('text', text);

            const response = await fetch(url+
                                            '/create'+
                                            '?developer='+developer, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData
                });
                console.log("addTasks response",response)
            if (response.ok) {
                const json = await response.json();
                console.log("addTasks json",json)
                if(json.status==="ok"){
                    dispatch({
                        type: SET_TASKS,
                        tasks:json.message.tasks,
                        taskCount:json.message.total_task_count
                    });
                    alert("Задача успешно добавлена")
                }
                else alert(json.message)
            } else {
                alert("Ошибка: " + response.status);
            }
        }
    },
    editTasks: (id,text,isClose) => {
        return async (dispatch, getState) => {

            const { tasks } = getState().tasks;
            const { token } = getState().login;
            console.log("tasks",tasks)
            console.log("token",token)
            console.log("id",id)
            const status=tasks.find((item)=>item.id===id).text===text?(isClose?"10":"0"):(isClose?"11":"1")
            console.log("new status",status)


            const formData = new FormData();
            formData.append('token', token);
            formData.append('text', text);
            formData.append('status', status);

            console.log(formData)
            const response = await fetch(url+
                                            '/edit/'+id+
                                            '?developer='+developer, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData
                });
                console.log("editTasks response",response)
            if (response.ok) {
                const json = await response.json();
                console.log("editTasks json",json)
            } else {
                alert("Ошибка: " + response.status);
            }
        }
    },
}

export default TaskActions;