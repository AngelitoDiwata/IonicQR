import { IonButton, IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useStorage } from '../hooks/useStorage';
import { useZxing } from "react-zxing";
import './Home.css';
import { useState } from 'react';

const Home: React.FC = () => {
  const { data, addData, clearData } = useStorage();
  const [state, setState] = useState(0);
  const { ref } = useZxing({
    onDecodeResult(result) {
      console.log(state)
      pushData(result.getText()).then(() => {
        alert(result.getText())
        setState((res) => res++)
      });
    },
  });

  const pushData = async (data: any) => {
    await addData(data)
  }


  const postData = async () => {
    fetch('http://192.168.1.16:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => {
      alert("successsfully exported Data")
      clearData();
    });
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
          <IonTitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Basic Scan</IonTitle>
          <IonButton onClick={postData}>Export Items</IonButton>
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
