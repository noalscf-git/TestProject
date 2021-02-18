import {
    AppState
} from "react-native";
import { ThunkAction } from "redux-thunk";
import { Action } from 'redux';
import AsyncStorage from "@react-native-community/async-storage";

export declare type TAction<A, R = void> = ThunkAction<R, AppState, undefined, Action>


export const SET_TOKEN = "SET_TOKEN";

export interface SetToken {
    type: typeof SET_TOKEN,
    token: string,
}

export type Actions=SetToken

export type WithLoginActions = {
    checkToken: ()=> TAction<void>,
    login: (username:string,password:string) => TAction<void>,
    logout:()=> TAction<void>,
}



const tokenStoreKey: string = 'tokenStoreKey';

export const url = 'https://uxcandy.com/~shapoval/test-task-backend/v2'

export const developer='12345'

const LoginActions: WithLoginActions = {
    checkToken: () => {
        return async (dispatch) => {
                const token = await AsyncStorage.getItem(tokenStoreKey)
                console.log("checkToken token",token)
                if(token)
                    dispatch({
                        type: SET_TOKEN,
                        token:token,
                    })
        }
    },

    login: (username, password) => {
        return async (dispatch) => {

            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const response = await fetch(url+'/login'+'/?developer='+developer, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
              });
            if (response.ok) {
                const json = await response.json();
                if(json.status==="ok"){
                    await AsyncStorage.setItem(tokenStoreKey, json.message.token);
                    dispatch({
                        type: SET_TOKEN,
                        token:json.message.token,
                    });
                }
                else{
                    alert("Ошибка: " + json.message?.password||json.message?.username);
                }
            } else {
                alert("Ошибка: " + response.status);
            }
        }
    },

    logout: () => {
        return async (dispatch) => {
                await AsyncStorage.removeItem(tokenStoreKey)
                dispatch({
                    type: SET_TOKEN,
                    token:'',
                })
        }
    },
}

export default LoginActions;