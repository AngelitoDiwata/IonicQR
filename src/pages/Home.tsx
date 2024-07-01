import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useStorage } from '../hooks/useStorage';
import { useZxing } from "react-zxing";
import './Home.css';

const Home: React.FC = () => {
  const { data, addData } = useStorage();
  const { ref } = useZxing({
    onDecodeResult(result) {
      console.log(result)
      pushData(result.getText()).then(() => {
        alert(result.getText())
      });
    },
  });

  const pushData = async (data: any) => {
    await addData(data)
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
    <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <IonHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <IonToolbar color="primary" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <IonTitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>My Todos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <IonItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px', marginBottom: '40px' }}>
            <video ref={ref} style={{ width: '80%', border: '3px dashed white', borderRadius: '10px' }} />
          </div>
        </IonItem>
        <IonList placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {
            data.map((todo: any, key: any) => <IonItem key={key} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{todo.task}</IonItem>)
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
