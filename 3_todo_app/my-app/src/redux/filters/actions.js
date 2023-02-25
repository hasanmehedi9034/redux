import { COLOR_CHANGED, STATUS_CHANGED } from "./actionTypes"

export const colorChanged = (color, changedType) => {
    return {
        type: COLOR_CHANGED,
        payload: {
            color,
            changedType
        }
    }
}

export const statusChanged = (status) => {
    return {
        type: STATUS_CHANGED,
        payload: status
    }
}