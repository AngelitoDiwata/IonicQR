import { useEffect, useState } from "react";
import { Storage } from '@ionic/storage';

const DATA_KEY = 'my-data'

export interface DataItem {
    data: string;
    created: number;
    id: string;
}

export function useStorage() {
    const [store, setStore] = useState<Storage>();
    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: 'uniDB',
            })

            const store = await newStore.create();
            setStore(store)

            const storedTodos = await store.get(DATA_KEY) || [];
            setData(storedTodos)

        }
        initStorage();
    }, [])

    const getData = async () => {
        const storedTodos = await store?.get(DATA_KEY) || [];
        return storedTodos
    }

    const addData = async (initData: string) => {
        if (data.length > 0) {
            const newData = {
                data: initData,
                created: new Date().getTime(),
                id: crypto.randomUUID()
            }
            const updatedData = [...data, newData];
            setData(updatedData)
            await store?.set(DATA_KEY, updatedData)
            console.log(data)
        }
    }

    return {
        getData,
        addData
    }
}