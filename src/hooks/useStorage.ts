import { useEffect } from "react";
import { Storage } from '@ionic/storage';
import { useDispatch, useSelector } from "react-redux";
import { addStore, setAppData, addSettingData } from "../store/reducers/DataSlice";

const DATA_KEY = 'my-data'
const USER_KEY = 'users';
const SETTINGS_KEY = 'settings-data';

export interface TodoItem {
    task: string;
    created: number;
    id: string;
}


export function useStorage() {
    const { store, data, settingData } = useSelector((state: any) => state.data)
    const dispatch = useDispatch();
    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: 'ScanDB',
            })

            const store = await newStore.create();
            dispatch(addStore(store))

            const storedData = await store.get(DATA_KEY) || [];
            dispatch(setAppData(storedData))

            const storedSettings = await store.get(SETTINGS_KEY) || {
                appIP: '',
                locationList: [],
            };
            dispatch(addSettingData(storedSettings))

        }
        initStorage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const addData = async (task: string, location: string, currentData: any) => {
    //     const newData = {
    //         task,
    //         created: new Date().getTime(),
    //         id: crypto.randomUUID()
    //     }
    //     const dataCopy = { ...currentData }
    //     dataCopy[location] ? dataCopy[location].push(newData) : dataCopy[location] = [newData]

    //     dispatch(setAppData(dataCopy))
    //     console.log(dataCopy)
    //     store?.set(DATA_KEY, data)
    //     return dataCopy
    // }

    const addData = (newData: any, location: string, currentData: any) => {

        let dataCopy = Object.assign({}, currentData)
        console.log(dataCopy)
        if (dataCopy[location] !== undefined) {
            if (newData.task) {
                dataCopy[location] = [...dataCopy[location], newData]
            } else {
                dataCopy[location] = [...dataCopy[location], ...newData]
            }

            console.log(dataCopy)
            dispatch(setAppData(dataCopy))
            store?.set(DATA_KEY, dataCopy)
        } else if (dataCopy[location] === undefined) {
            dataCopy = { ...dataCopy, [location]: newData.task ? [newData] : [...newData] }
            console.log(dataCopy)
            dispatch(setAppData(dataCopy))
            store?.set(DATA_KEY, dataCopy)
        }



        return dataCopy
    }


    const clearData = async () => {
        dispatch(setAppData([]))
        store?.set(DATA_KEY, [])
    }

    const checkUserExistence = async (userKey: string) => {
        const users = await store?.get(USER_KEY) || [];
        return users.includes(userKey)
    }

    const setAppSetting = async (setting: any) => {
        dispatch(addSettingData(setting))
        store?.set(SETTINGS_KEY, setting)
    }

    const getData = async () => {
        return await store?.get(DATA_KEY)
    }

    const getSettingData = async () => {
        return await store?.get(SETTINGS_KEY)
    }


    return {
        SETTINGS_KEY,
        store,
        data,
        addData,
        clearData,
        checkUserExistence,
        setAppSetting,
        settingData,
        getData,
        getSettingData
    }
}