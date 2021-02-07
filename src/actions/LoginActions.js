var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AsyncStorage from "@react-native-community/async-storage";
export const SET_TOKEN = "SET_TOKEN";
const tokenStoreKey = 'tokenStoreKey';
export const url = 'https://uxcandy.com/~shapoval/test-task-backend/v2';
export const developer = '1234';
const LoginActions = {
    checkToken: () => {
        return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
            const token = yield AsyncStorage.getItem(tokenStoreKey);
            console.log("checkToken token", token);
            if (token)
                dispatch({
                    type: SET_TOKEN,
                    token: token,
                });
        });
    },
    login: (username, password) => {
        return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            const response = yield fetch(url + '/login' + '/?developer=' + developer, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            });
            console.log("login response", response);
            if (response.ok) {
                const json = yield response.json();
                console.log("login json", json);
                if (json.status === "ok") {
                    yield AsyncStorage.setItem(tokenStoreKey, json.message.token);
                    dispatch({
                        type: SET_TOKEN,
                        token: json.message.token,
                    });
                }
                else {
                    alert("Ошибка: " + ((_a = json.message) === null || _a === void 0 ? void 0 : _a.password) || ((_b = json.message) === null || _b === void 0 ? void 0 : _b.username));
                }
            }
            else {
                alert("Ошибка: " + response.status);
            }
        });
    },
    logout: () => {
        return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("logout");
            yield AsyncStorage.removeItem(tokenStoreKey);
            dispatch({
                type: SET_TOKEN,
                token: '',
            });
        });
    },
};
export default LoginActions;
