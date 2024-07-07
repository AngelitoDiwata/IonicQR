import { IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonText, IonToolbar } from '@ionic/react';
import './Home.css';
import QRScanner from '../components/QRScanner';

import { arrowBack } from 'ionicons/icons';
import { useState } from 'react';
import Count from './Count';

const Scan = ({ onBack, settingData, data, camPaused }: any) => {
  const [location, setLocation] = useState(null)

  const pushData = async (data: any) => {
    await setLocation(data.getText());
  }

  return (
    !location ?
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonIcon size='large' onClick={onBack} icon={arrowBack}></IonIcon>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText>Scan Location No & Lot No to count</IonText>
          <IonItem>
            <QRScanner paused={camPaused} handleScan={pushData} />
          </IonItem>
          <IonList>
            {
              settingData.locationList.map((location: any, key: any) => <IonItem onClick={() => setLocation(location)} key={key}>{location}</IonItem>)
            }
          </IonList>
        </IonContent>
      </IonPage> : <Count camPaused={camPaused} data={data} onBack={() => setLocation(null)} location={location} />
  );
};

export default Scan;
