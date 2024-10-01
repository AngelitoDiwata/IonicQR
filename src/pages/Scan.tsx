import { IonAlert, IonButtons, IonContent, IonIcon, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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
    setInvalidScan(false)
    if (!checkValidQRCode(data.getText())) {
      setInvalidScan(true)
    } else {
      await setLocation(data.getText());
    }
  }

  const checkValidQRCode = (code: string) => {
    return code.split('')[0] === '!' && code.split('')[1] === '@'
  }

  return (
    <>
      {!settingData.userList ?
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
              <QRScanner handleScan={pushData} focus={true} />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'auto',
              }}>
                <div style={{
                  width: '100%',
                  maxWidth: '320px',
                  padding: '24px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '32px'
                  }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <rect x="7" y="7" width="3" height="3"></rect>
                      <rect x="14" y="7" width="3" height="3"></rect>
                      <rect x="7" y="14" width="3" height="3"></rect>
                      <rect x="14" y="14" width="3" height="3"></rect>
                    </svg>
                  </div>
                  <h1 style={{
                    marginBottom: '24px',
                    fontSize: '24px',
                    fontWeight: 300,
                    textAlign: 'center',
                    color: '#1f2937'
                  }}>
                    Please scan a Location QR code.
                  </h1>
                </div>
              </div>
            </IonContent>
          </IonPage> : <Count currentUser={currentUser} triggerParent={triggerParent} data={currentData} onBack={(data: any) => { setCurrentData(data); setInvalidScan(false); setLocation(null) }} location={location} />
      }
      <IonAlert
        isOpen={invalidScan}
        header={'Unknown location. Please try a valid one.'}
        buttons={['Close']}
        onDidDismiss={() => setInvalidScan(false)}
      ></IonAlert>
    </>
  );
};

export default Scan;
