import { IonButtons, IonContent, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import QRScanner from '../components/QRScanner';

import { arrowBack, listCircle } from 'ionicons/icons';
import { useState } from 'react';
import Count from './Count';

const Scan = ({ onBack, settingData, data, camPaused }: any) => {
  const [location, setLocation] = useState(null)
  const [invalidScan, setInvalidScan] = useState(false)

  const pushData = async (data: any) => {
    if (!checkValidQRCode(data.getText())) {
      setInvalidScan(true)
    } else {
      await setLocation(data.getText());
    }
  }

  const checkValidQRCode = (code: string) => {
    return settingData.locationList.includes(code)
  }

  return (
    !location ?
      <IonPage>
        <IonToolbar>
          <IonButtons onClick={onBack} slot="start">
            <IonIcon className="ion-padding" size="medium" icon={arrowBack}></IonIcon>
          </IonButtons>
          <IonTitle>Scan Location/Lot#</IonTitle>
        </IonToolbar>
        <IonContent className="ion-padding">
          <IonItem>
            <QRScanner invalidScan={invalidScan} paused={camPaused} handleScan={pushData} />
          </IonItem>
          <IonList>
            {
              settingData.locationList.map((location: any, key: any) =>
              (<IonItem key={key} onClick={() => setLocation(location)} button={true}>
                <IonIcon color="danger" slot="start" icon={listCircle} size="large"></IonIcon>
                <IonLabel>{location}</IonLabel>
                <IonNote slot="end">qty: 6</IonNote>
              </IonItem>))
            }
          </IonList>
        </IonContent>
      </IonPage> : <Count camPaused={camPaused} data={data} onBack={() => { setInvalidScan(false); setLocation(null) }} location={location} />
  );
};

export default Scan;
