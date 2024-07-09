import { IonAlert, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
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
    const [invalidScan, setInvalidScan] = useState(false)

    const pushData = async (res: any) => {
        if (!checkValidQRCode(res.getText())) {
            setInvalidScan(true)
        }
        else if (!isAlertOpen) {
            setScanMsg(res.getText());
            setIsAlertOpen(true)
            setCurrentData(await addData(res.getText(), location));
        }
    }

    const checkValidQRCode = (code: string) => {
        return code.split(',').length === 4
    }

    useEffect(() => {
        setCurrentData(data)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <IonPage>
            <IonToolbar>
                <IonButtons onClick={onBack} slot="start">
                    <IonIcon className="ion-padding" size="medium" icon={arrowBack}></IonIcon>
                </IonButtons>
                <IonTitle>Location/Lot#: {location}</IonTitle>
            </IonToolbar>
            <IonContent className="ion-padding">
                <IonItem>
                    <QRScanner invalidScan={invalidScan} paused={camPaused} handleScan={pushData} />
                </IonItem>

                <IonGrid>

                    <IonRow style={{ backgroundColor: 'white', color: 'black', borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                        {
                            ['PRDCODE', 'UNIT', 'LOT#', 'QTY'].map((item: any, key: any) => (<IonCol style={{ fontWeight: 'bold' }} key={key}>{item}</IonCol>))
                        }
                    </IonRow>
                    {
                        currentData[location] && currentData[location].map((todo: any, key: any) => (
                            <IonRow key={key}>
                                {
                                    todo.task.split(",").map((item: any, key2: any) => <IonCol style={{ paddingTop: '10px', paddingBottom: '10px' }} key={key2}>{item}</IonCol>)
                                }
                            </IonRow>
                        ))
                    }

                </IonGrid>
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
