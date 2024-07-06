import { useEffect, useState } from "react";
import { Storage } from '@ionic/storage';

const DATA_KEY = 'my-data'
const USER_KEY = 'users';

export interface TodoItem {
    task: string;
    created: number;
    id: string;
}

export function useStorage() {
    const [store, setStore] = useState<Storage>();
    const [data, setData] = useState<TodoItem[]>([]);
    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: 'ScanDB',
            })

            const store = await newStore.create();
            setStore(store)

            const storedData = await store.get(DATA_KEY) || [];
            setData(storedData)



        }
        initStorage();
    }, [])

    const addData = async (task: string) => {
        const newData = {
            task,
            created: new Date().getTime(),
            id: crypto.randomUUID()
        }
        const updatedData = [...data, newData];
        setData(updatedData)
        store?.set(DATA_KEY, updatedData)
    }

    const clearData = async () => {
        setData([])
        store?.set(DATA_KEY, [])
    }

    const checkUserExistence = async (userKey: string) => {
        const users = await store?.get(USER_KEY) || [];
        return users.includes(userKey)
    }

    return {
        data,
        addData,
        clearData,
        checkUserExistence
    }
}