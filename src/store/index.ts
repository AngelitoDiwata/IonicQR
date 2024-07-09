import { configureStore } from '@reduxjs/toolkit'

import dataReducer from '../store/reducers/DataSlice'

export const store = configureStore({
    reducer: {
        data: dataReducer
    }
})