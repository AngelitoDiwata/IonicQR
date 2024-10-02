import { IonButton, IonContent, IonIcon } from '@ionic/react'
import { useEffect, useState } from 'react'
import { qrCode, logOut, document, logIn, power, cog } from 'ionicons/icons';
import Scan from './Scan';
import Login from './Login';
import { useStorage } from '../hooks/useStorage';
import Settings from './Settings';
import { useDispatch } from 'react-redux';
import { setCameraState } from "../store/reducers/DataSlice";
import { json2csv } from 'json-2-csv';

export default function MainMenu({ onLogOut, currentUser, bypass }: any) {
    const [repaint, setRepaint] = useState(false)
    const { data, clearData, settingData } = useStorage();
    const [currentData, setCurrentData] = useState()
    const [selectedComponent, setSelectedComponent] = useState('')
    const [camPaused, setCampaused] = useState(bypass)
    const dispatch = useDispatch();
    let components: { [key: string]: any } = {
        "Scan": <Scan currentUser={currentUser} isCurrent={selectedComponent === "Scan"} triggerParent={() => selectedComponent === "Scan" && setRepaint(!repaint)} data={currentData || data} settingData={settingData} onBack={(res: any) => { setCurrentData(res); setCampaused(true); setSelectedComponent('') }} />,
        "Login": <Login />,
        "Settings": <Settings settingData={settingData} onBack={() => setSelectedComponent('')} />
    }

    useEffect(() => {
        dispatch(setCameraState(camPaused))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [camPaused])

    const postData = () => {
        if (data.length !== 0) {
            const csvString = json2csv(
                Object.keys(data).map((location) => {
                    return sortDataBeforeExport(data)[location].map((item: any) => {
                        return {
                            created_date: item.created,
                            prod_no: item.scan_data.split(';')[0],
                            uom: item.scan_data.split(';')[3] === undefined ? '' : item.scan_data.split(';')[2],
                            jo_no: item.scan_data.split(';')[item.scan_data.split(';')[3] === undefined ? 2 : 3],
                            qty: item.scan_data.split(';')[1],
                            id: item.id, scanned_by: item.scanned_by, location
                        }
                    })
                }).flat(),
                { arrayIndexesAsKeys: true, expandArrayObjects: true }
            );
            const blob = new Blob([csvString], { type: 'text/csv' });
            const link = window.document.createElement('a');
            link.download = `${new Date().toDateString()}_extract.csv`;
            link.href = window.URL.createObjectURL(blob);
            window.document.body.appendChild(link);
            link.click();
            window.document.body.removeChild(link);
            clearData();
            alert("successsfully exported Data")
        } else {
            alert("No data to export. \n \n Please scan using Basic Scan and try again.")
        }
    };

    const sortDataBeforeExport = (data: any) => {
        let newData = { ...data }
        Object.keys(newData).forEach((location: string) => {

            console.log([...newData[location]].sort((a: any, b: any) => b.created - a.created))
            newData[location] = [...newData[location]].sort((a: any, b: any) => b.created - a.created).map((item: any) => {
                let newItem = { ...item }
                newItem.created = new Date(item.created).toUTCString()
                return newItem
            })
        })

        return newData
    }

    return (
        (
            <IonContent className="ion-padding" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonButton size='large' expand='block' onClick={() => setSelectedComponent('Scan')} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonIcon slot='start' icon={qrCode} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon> Basic Scan
                </IonButton>
                <IonButton size='large' disabled expand='block' onClick={() => setSelectedComponent('Scan')} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonIcon slot='start' icon={logIn} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon> In to Warehouse
                </IonButton>
                <IonButton size='large' disabled expand='block' onClick={() => setSelectedComponent('Scan')} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonIcon slot='start' icon={logOut} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon> Out from Warehouse
                </IonButton>
                {
                    currentUser.type === "Administrator" && (
                        <>
                            <IonButton size='large' expand='block' onClick={() => postData()} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <IonIcon slot='start' icon={document} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon> Extract Data
                            </IonButton>
                            <IonButton size='large' expand='block' onClick={() => setSelectedComponent('Settings')} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <IonIcon slot='start' icon={cog} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon> Settings
                            </IonButton>
                        </>)
                }
                <IonButton size='large' fill="outline" color='danger' expand='block' onClick={onLogOut} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonIcon slot='start' icon={power} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon> Log out
                </IonButton>
                {
                    selectedComponent !== '' && components[selectedComponent]
                }
            </IonContent>
        )
    )
}
