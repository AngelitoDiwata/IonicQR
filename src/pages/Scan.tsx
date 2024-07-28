import { IonButtons, IonContent, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import QRScanner from '../components/QRScanner';

import { arrowBack, listCircle } from 'ionicons/icons';
import { useState } from 'react';
import Count from './Count';
import Settings from './Settings';

const Scan = ({ onBack, settingData, data, triggerParent, currentUser }: any) => {
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

  const sigmaQty = (data: any[]) => {
    return data.map((data: any) => parseInt(data.scan_data.split(';')[1]))
      .reduce((data: any, acc: any) => data + acc)
  }

  return (
    !settingData.locationList ?
      <Settings settingData={settingData} onBack={() => onBack(currentData)} /> :
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
              <QRScanner invalidScan={invalidScan} handleScan={pushData} />
            </IonItem>
            <IonList placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              {
                settingData.locationList.map((location: any, key: any) =>
                (<IonItem key={key} onClick={() => setLocation(location)} button={true} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <IonIcon color="danger" slot="start" icon={listCircle} size="large" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon>
                  <IonLabel placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{location}</IonLabel>
                  <IonNote style={{ fontSize: '12px', fontWeight: 'bold' }} slot="end" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>data: {currentData[location] ? currentData[location].length : 0}</IonNote>
                  <IonNote style={{ fontSize: '12px', fontWeight: 'bold' }} slot="end" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Σ: {currentData[location] ? sigmaQty(currentData[location]) : 0}</IonNote>
                </IonItem>))
              }
            </IonList>
          </IonContent>
        </IonPage> : <Count currentUser={currentUser} triggerParent={triggerParent} data={currentData} onBack={(data: any) => { setCurrentData(data); setInvalidScan(false); setLocation(null) }} location={location} />
  );
};

export default Scan;
