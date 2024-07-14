import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState = {
    store: '',
    data: '',
    settingData: '',
    currentUser: Cookies.get('username'),
    cameraOff: false
}


export const dataSlice: any = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addStore: (state: any, action: any) => {
            state.store = action.payload
        },
        setAppData: (state: any, action: any) => {
            state.data = action.payload
        },
        addSettingData: (state: any, action: any) => {
            state.settingData = action.payload
        },

        setCurrentUser: (state: any, action: any) => {
            state.currentUser = action.payload
        },

        setCameraState: (state: any, action: any) => {
            state.cameraOff = action.payload
        },
    }
});

export const { addStore, setAppData, addSettingData, setCurrentUser, setCameraState } = dataSlice.actions;
export default dataSlice.reducer