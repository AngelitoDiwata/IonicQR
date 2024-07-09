import { IonButtons, IonContent, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import QRScanner from '../components/QRScanner';

import { arrowBack, listCircle } from 'ionicons/icons';
import { useState } from 'react';
import Count from './Count';

const Scan = ({ onBack, settingData, data, camPaused, triggerParent }: any) => {
  const [location, setLocation] = useState(null)
  const [invalidScan, setInvalidScan] = useState(false)
  const [currentData, setCurrentData] = useState(data)

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
      <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <IonButtons onClick={() => onBack(currentData)} slot="start" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonIcon className="ion-padding" size="medium" icon={arrowBack} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon>
          </IonButtons>
          <IonTitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Scan Location/Lot#</IonTitle>
        </IonToolbar>
        <IonContent className="ion-padding" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <IonItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <QRScanner invalidScan={invalidScan} paused={camPaused} handleScan={pushData} />
          </IonItem>
          <IonList placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {
              settingData.locationList.map((location: any, key: any) =>
              (<IonItem key={key} onClick={() => setLocation(location)} button={true} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonIcon color="danger" slot="start" icon={listCircle} size="large" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon>
                <IonLabel placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{location}</IonLabel>
                <IonNote slot="end" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>qty: {currentData[location] ? currentData[location].length : 0}</IonNote>
              </IonItem>))
            }
          </IonList>
        </IonContent>
      </IonPage> : <Count triggerParent={triggerParent} camPaused={camPaused} data={currentData} onBack={(data: any) => { setCurrentData(data); setInvalidScan(false); setLocation(null) }} location={location} />
  );
};

export default Scan;
