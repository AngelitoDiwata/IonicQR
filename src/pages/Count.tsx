import { IonAlert, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { useStorage } from '../hooks/useStorage';
import './Home.css';
import QRScanner from '../components/QRScanner';

import { arrowBack } from 'ionicons/icons';
import { useEffect, useState } from 'react';

const Count = ({ onBack, location, data, camPaused, triggerParent }: any) => {
    const { addData } = useStorage();
    const [currentData, setCurrentData] = useState(data)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [scanMsg, setScanMsg] = useState('')
    const [invalidScan, setInvalidScan] = useState(false)
    const [scanMode, setScanMode] = useState('single')
    const [batchCount, setBatchCount] = useState(0)
    const [batchAlert, setBatchAlert] = useState(false)
    const [batchStash, setBatchStash] = useState()


    const pushData = async (res: any) => {
        if (!checkValidQRCode(res.getText())) {
            setInvalidScan(true)
        }
        else if (!isAlertOpen) {
            if (scanMode === 'batch') {
                setBatchAlert(true)
                setBatchStash(res.getText())

            } else {
                saveData(res, false);
            }
        }
    }

    const handleBatchAlertClose = async () => {
        Array.from(Array(batchCount).keys()).forEach(() => {
            saveData(batchStash, true)
        })
        setIsAlertOpen(true)
    }

    const saveData = async (res: any, batch: boolean) => {
        setScanMsg(res.getText());
        !batch && setIsAlertOpen(true)
        setCurrentData(await addData(res.getText(), location));
        triggerParent();
    }

    const checkValidQRCode = (code: string) => {
        return code.split(',').length === 4
    }

    useEffect(() => {
        setCurrentData(data)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonButtons onClick={() => onBack(currentData)} slot="start" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonIcon className="ion-padding" size="medium" icon={arrowBack} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon>
                </IonButtons>
                <IonTitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Location/Lot#: {location}</IonTitle>
            </IonToolbar>
            <IonContent className="ion-padding" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonSegment value={scanMode} onIonChange={(val) => setScanMode(val.detail.value as any)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonSegmentButton value="single" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <IonLabel placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Single</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="batch" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <IonLabel placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Batch</IonLabel>
                    </IonSegmentButton>
                </IonSegment>

                <IonItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <QRScanner invalidScan={invalidScan} paused={camPaused} handleScan={pushData} />
                </IonItem>

                <IonGrid placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

                    <IonRow style={{ backgroundColor: 'white', color: 'black', borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        {
                            ['PRDCODE', 'UNIT', 'LOT#', 'QTY'].map((item: any, key: any) => (<IonCol style={{ fontWeight: 'bold' }} key={key} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{item}</IonCol>))
                        }
                    </IonRow>
                    {
                        currentData[location] && currentData[location].map((todo: any, key: any) => (
                            <IonRow key={key} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                {
                                    todo.task.split(",").map((item: any, key2: any) => <IonCol style={{ paddingTop: '10px', paddingBottom: '10px' }} key={key2} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{item}</IonCol>)
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
            <IonAlert
                isOpen={batchAlert}
                header="Please enter batch threshold"
                buttons={['Save']}
                inputs={[
                    {
                        type: 'number',
                        placeholder: 'Batch count'
                    }
                ]}
                onDidDismiss={() => handleBatchAlertClose()}
            ></IonAlert>


        </IonPage>
    );
};

export default Count;
