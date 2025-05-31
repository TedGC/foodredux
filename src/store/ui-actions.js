import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        cartIsVisible: false, notification: null
    },
    reducers: {
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible
        },
        showNotification(state, action) {
            state.showNotification = {
                title: action.payload.title,
                message: action.payload.message,
                error: action.payload.error
            }
        }
    }
})


export const uiActions = uiSlice.actions

export default uiSlice