import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    store: '',
    data: '',
    settingData: ''
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
    }
});

export const { addStore, setAppData, addSettingData } = dataSlice.actions;
export default dataSlice.reducer