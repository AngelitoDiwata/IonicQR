import { IonAlert, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { useStorage } from '../hooks/useStorage';
import './Home.css';
import QRScanner from '../components/QRScanner';

import { arrowBack } from 'ionicons/icons';
import { useEffect, useState } from 'react';

const Count = ({ onBack, location, data, triggerParent, currentUser }: any) => {
    const { addData, editQty, getData } = useStorage();
    const [currentData, setCurrentData] = useState(data)
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [scanMsg, setScanMsg] = useState('')
    const [invalidScan, setInvalidScan] = useState(false)
    const [scanMode, setScanMode] = useState('single')
    const [batchAlert, setBatchAlert] = useState(false)
    const [batchStash, setBatchStash] = useState()
    const [editIndex, setEditIndex] = useState(0)
    const [editAlert, setEditAlert] = useState(false)
    const [isEditSuccess, setIsEditSuccess] = useState(false)


    const pushData = async (res: any) => {
        if (!checkValidQRCode(res.getText())) {
            setInvalidScan(true)
        }
        else if (!isAlertOpen) {
            if (scanMode === 'batch') {
                setBatchAlert(true)
                setBatchStash(res)

            } else {
                saveData(res, false, currentData);
            }
        }
    }

    const handleBatchAlertClose = (v: any) => {
        let saveArray: any = []
        const scanText = batchStash as any

        Array.from(Array(parseInt(v)).keys()).forEach(() => {
            const newData = {
                task: scanText.getText(),
                created: new Date().getTime(),
                id: crypto.randomUUID(),
                scanned_by: currentUser.name
            }
            saveArray.push(newData)
        })
        setCurrentData(addData(saveArray, location, currentData))
        setBatchAlert(false)
        setIsAlertOpen(true)
    }

    const handleEditAlertClose = (qty: number) => {
        editQty(editIndex, qty, location).then(() => {
            getData().then((res) => {
                console.log(res)
                setCurrentData(res)
                setIsEditSuccess(true)
            })
        })
    }

    const saveData = (res: any, batch: boolean, curData: any) => {
        const newData = {
            task: res.getText(),
            created: new Date().getTime(),
            id: crypto.randomUUID(),
            scanned_by: currentUser.name
        }
        setScanMsg(res.getText());
        !batch && setIsAlertOpen(true)
        setCurrentData(addData(newData, location, curData));
        console.log(currentData)
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
                    <QRScanner invalidScan={invalidScan} handleScan={pushData} />
                </IonItem>

                <IonGrid placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

                    <IonRow style={{ backgroundColor: 'white', color: 'black', borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        {
                            ['PRDCODE', 'UNIT', 'LOT#', 'QTY'].map((item: any, key: any) => (<IonCol style={{ fontWeight: 'bold' }} key={key} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{item}</IonCol>))
                        }
                    </IonRow>
                    {
                        currentData[location] && currentData[location].map((todo: any, key: any) => (
                            <IonRow onClick={() => { setEditIndex(key); setEditAlert(true) }} key={key} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
                isOpen={isEditSuccess}
                header="Successfully edited quantity"
                buttons={['Close']}
                onDidDismiss={() => setIsEditSuccess(false)}
            ></IonAlert>
            <IonAlert
                isOpen={batchAlert}
                header="Please enter batch threshold"
                inputs={[
                    {
                        name: 'batchCount',
                        type: 'number',
                        placeholder: 'Batch count'
                    }
                ]}
                buttons={
                    [{
                        text: 'Save',
                        handler: (alertData) => { //takes the data 
                            handleBatchAlertClose(alertData.batchCount);
                        }
                    }]
                }
            ></IonAlert>

            <IonAlert
                isOpen={editAlert}
                header="Edit Quantity"
                inputs={[
                    {
                        name: 'itemQty',
                        type: 'number',
                        placeholder: 'Enter new quantity'
                    }
                ]}
                buttons={
                    [{
                        text: 'Save',
                        handler: (alertData) => { //takes the data 
                            handleEditAlertClose(alertData.itemQty);
                        }
                    }]
                }
            ></IonAlert>


        </IonPage>
    );
};

export default Count;
