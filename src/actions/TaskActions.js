var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { developer, url } from "./LoginActions";
export const SET_TASKS = "SET_TASKS";
export const SET_LOADING = "SET_LOADING";
const TaskActions = {
    getTasks: (sort_field = null, sort_direction = null, page = null) => {
        return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield fetch(url +
                '/?sort_field=' + sort_field +
                '&sort_direction=' + sort_direction +
                '&page=' + page +
                '&developer=' + developer, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const json = yield response.json();
                if (json.status === "ok") {
                    dispatch({
                        type: SET_TASKS,
                        tasks: json.message.tasks,
                        taskCount: json.message.total_task_count
                    });
                }
                else
                    alert(json.message);
            }
            else {
                alert("Ошибка: " + response.status);
            }
        });
    },
    addTasks: (username, email, text) => {
        return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('text', text);
            const response = yield fetch(url +
                '/create' +
                '?developer=' + developer, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            });
            if (response.ok) {
                const json = yield response.json();
                if (json.status === "ok") {
                    dispatch({
                        type: SET_TASKS,
                        tasks: json.message.tasks,
                        taskCount: json.message.total_task_count
                    });
                    alert("Задача успешно добавлена");
                }
                else
                    alert(json.message);
            }
            else {
                alert("Ошибка: " + response.status);
            }
        });
    },
    editTasks: (id, text, isClose) => {
        return (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
            const { tasks } = getState().tasks;
            const { token } = getState().login;
            const status = tasks.find((item) => item.id === id).text === text ? (isClose ? "10" : "0") : (isClose ? "11" : "1");
            const formData = new FormData();
            formData.append('token', token);
            formData.append('text', text);
            formData.append('status', status);
            console.log(formData);
            const response = yield fetch(url +
                '/edit/' + id +
                '?developer=' + developer, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            });
            console.log("editTasks response", response);
            if (response.ok) {
                const json = yield response.json();
                console.log("editTasks json", json);
            }
            else {
                alert("Ошибка: " + response.status);
            }
        });
    },
};
export default TaskActions;
