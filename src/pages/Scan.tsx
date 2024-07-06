import { IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonToolbar } from '@ionic/react';
import { useStorage } from '../hooks/useStorage';
import './Home.css';
import QRScanner from '../components/QRScanner';

import { arrowBack } from 'ionicons/icons';

const Scan = ({ onBack }: any) => {
  const { data, addData } = useStorage();

  const pushData = async (data: any) => {
    await addData(data.getText())
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonIcon size='large' onClick={onBack} icon={arrowBack}></IonIcon>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <QRScanner handleScan={pushData} />
        </IonItem>
        <IonList>
          {
            data.map((todo: any, key: any) => <IonItem key={key}>{todo.task}</IonItem>)
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Scan;
