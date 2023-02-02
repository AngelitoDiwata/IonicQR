import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useStorage } from '../hooks/useStorage';
import './Home.css';

const Home: React.FC = () => {

  const { todos, addTodo } = useStorage();
  const [task, setTask] = useState('');

  const createTodo = async () => {
    await addTodo(task)
  }

  // const updateStatus = async (id: string, status: number) => {
  //   /**
  //    * Todo
  //    */
  // }

  // const deleteTodo = async (id: string) => {
  //   /**
  //    * Todo
  //    */
  // }



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>My Todos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonInput onIonChange={(e) => setTask(e.detail.value!)} placeholder='Example: buy a country...' />
          <IonButton slot='end' onClick={() => createTodo()} fill="clear">
            Add
          </IonButton>
        </IonItem>
        <IonList>
          {
            todos.map((todo: any, key: any) => <IonItem key={key}>{todo.task}</IonItem>)
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
