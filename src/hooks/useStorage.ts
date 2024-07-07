import { useEffect, useState } from "react";
import { Storage } from '@ionic/storage';

const DATA_KEY = 'my-data'
const USER_KEY = 'users';
const SETTINGS_KEY = 'settings-data';

export interface TodoItem {
    task: string;
    created: number;
    id: string;
}


export function useStorage() {
    const [store, setStore] = useState<Storage>();
    const [data, setData] = useState<{ [key: string]: any }>([]);
    const [settingData, setSettingData] = useState<any>({});
    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: 'ScanDB',
            })

            const store = await newStore.create();
            setStore(store)

            const storedData = await store.get(DATA_KEY) || [];
            setData(storedData)

            setSettingData(await store.get(SETTINGS_KEY))
            if (!settingData.appIP) {
                store?.set(SETTINGS_KEY, {
                    appIP: '',
                    locationList: [],
                })
            }

        }
        initStorage();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addData = async (task: string, location: string) => {
        const newData = {
            task,
            created: new Date().getTime(),
            id: crypto.randomUUID()
        }
        const dataCopy = data
        dataCopy[location] ? dataCopy[location].push(newData) : dataCopy[location] = [newData]

        setData(dataCopy)
        store?.set(DATA_KEY, dataCopy)
        return dataCopy
    }

    const clearData = async () => {
        setData([])
        store?.set(DATA_KEY, [])
    }

    const checkUserExistence = async (userKey: string) => {
        const users = await store?.get(USER_KEY) || [];
        return users.includes(userKey)
    }

    const setAppSetting = async (setting: any) => {
        setSettingData(setting)
        store?.set(SETTINGS_KEY, setting)
    }


    return {
        SETTINGS_KEY,
        store,
        data,
        addData,
        clearData,
        checkUserExistence,
        setAppSetting,
        settingData
    }
}