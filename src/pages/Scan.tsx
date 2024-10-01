import { IonButtons, IonContent, IonIcon, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import QRScanner from '../components/QRScanner';

import { arrowBack } from 'ionicons/icons';
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
    setInvalidScan(false)
  }

  const checkValidQRCode = (code: string) => {
    return code.split('')[0] === '!' && code.split('')[1] === '@'
  }

  return (
    !settingData.userList ?
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
              <QRScanner invalidScan={invalidScan} handleScan={pushData} focus={true} />
            </IonItem>
          </IonContent>
        </IonPage> : <Count currentUser={currentUser} triggerParent={triggerParent} data={currentData} onBack={(data: any) => { setCurrentData(data); setInvalidScan(false); setLocation(null) }} location={location} />
  );
};

export default Scan;
