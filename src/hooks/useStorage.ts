import { useEffect, useState } from "react";
import { Storage } from '@ionic/storage';

const TODOS_KEY = 'my-todos'

export interface TodoItem {
    task: string;
    created: number;
    status: number;
    id: string;
}

export function useStorage() {
    const [store, setStore] = useState<Storage>();
    const [todos, setTodos] = useState<TodoItem[]>([]);
    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: 'geloDB',
            })

            const store = await newStore.create();
            setStore(store)

            const storedTodos = await store.get(TODOS_KEY) || [];
            setTodos(storedTodos)
            
        }
        initStorage();
    }, [])

    const addTodo = async (task: string) => {
        const newTodo = {
            task,
            created: new Date().getTime(),
            status: 0,
            id: ''+new Date().getTime()
        }
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos)
        store?.set(TODOS_KEY, updatedTodos)
    }

    return {
        todos,
        addTodo
    }
}