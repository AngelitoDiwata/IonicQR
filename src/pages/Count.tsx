import { IonAlert, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonText, IonToolbar } from '@ionic/react';
import { useStorage } from '../hooks/useStorage';
import './Home.css';
import QRScanner from '../components/QRScanner';

import { arrowBack } from 'ionicons/icons';
import { useEffect, useState } from 'react';

const Count = ({ onBack, location, data, camPaused }: any) => {
    const { addData } = useStorage();
    const [currentData, setCurrentData] = useState(data)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [scanMsg, setScanMsg] = useState('')

    const pushData = async (res: any) => {
        if (!isAlertOpen) {
            setScanMsg(res.getText());
            setIsAlertOpen(true)
            setCurrentData(await addData(res.getText(), location));
        }
    }

    useEffect(() => {
        setCurrentData(data)
    }, [])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonIcon size='large' onClick={onBack} icon={arrowBack}></IonIcon>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonText>Location/Lot No: {location}</IonText>
                <IonItem>
                    <QRScanner paused={camPaused} handleScan={pushData} />
                </IonItem>
                <IonList>
                    {
                        currentData[location] && currentData[location].map((todo: any, key: any) => <IonItem key={key}>{todo.task}</IonItem>)
                    }
                </IonList>
            </IonContent>
            <IonAlert
                isOpen={isAlertOpen}
                header="Successful Scan"
                subHeader="data scanned:"
                message={scanMsg}
                buttons={['Close']}
                onDidDismiss={() => setIsAlertOpen(false)}
            ></IonAlert>
        </IonPage>
    );
};

export default Count;
