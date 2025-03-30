import {ElNotification} from "element-plus";

export const showError = (title, msg='') => {
    ElNotification({
        title: title,
        message: msg,
        type: 'error',
    })
}

export const showWarn = (title, msg = '') => {
    ElNotification({
        title: title,
        message: msg,
        type: 'warning',
    })
}

export const showSuccess = (title, msg = '') => {
    ElNotification({
        title: title,
        message: msg,
        type: 'success',
    })
}