import { IonButton, IonContent, IonIcon } from '@ionic/react'
import { useEffect, useState } from 'react'
import { qrCode, logOut, document, logIn, power, cog } from 'ionicons/icons';
import Scan from './Scan';
import Login from './Login';
import { useStorage } from '../hooks/useStorage';
import Settings from './Settings';
import { useDispatch } from 'react-redux';
import { setCameraState } from "../store/reducers/DataSlice";

export default function MainMenu({ onLogOut, currentUser, bypass }: any) {
    const [repaint, setRepaint] = useState(false)
    const { data, clearData, settingData, store, SETTINGS_KEY } = useStorage();
    const [currentData, setCurrentData] = useState()
    const [selectedComponent, setSelectedComponent] = useState('')
    const [camPaused, setCampaused] = useState(bypass)
    const dispatch = useDispatch();
    let components: { [key: string]: any } = {
        "Scan": <Scan currentUser={currentUser} triggerParent={() => setRepaint(!repaint)} data={currentData || data} settingData={settingData} onBack={(res: any) => { setCurrentData(res); setCampaused(true); setSelectedComponent('') }} />,
        "Login": <Login />,
        "Settings": <Settings settingData={settingData} onBack={() => setSelectedComponent('')} />
    }

    const [currentComponent, setCurrentComponent] = useState(components[selectedComponent])

    useEffect(() => {
        dispatch(setCameraState(camPaused))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [camPaused])

    useEffect(() => {
        setCampaused(false)
        if (selectedComponent === 'Settings') {
            getSettings().then((res) => {
                setCurrentComponent(<Settings settingData={res} onBack={() => { setCampaused(true); setSelectedComponent('') }} />)
            })
        } else if (selectedComponent === 'Scan') {
            getSettings().then((res) => {
                setCampaused(false)
                setCurrentComponent(<Scan currentUser={currentUser} triggerParent={() => setRepaint(!repaint)} data={currentData || data} settingData={res} onBack={(res: any) => { setCurrentData(res); setCampaused(true); setSelectedComponent('') }} />)
            })
        } else {
            setCurrentComponent(components[selectedComponent])
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedComponent])

    const postData = () => {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const link = window.document.createElement('a');
        link.download = `${new Date().toDateString()}_extract.json`;
        link.href = window.URL.createObjectURL(blob);
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);
        clearData();
        alert("successsfully exported Data")
    };


    const getSettings = async () => {
        const settings = await store?.get(SETTINGS_KEY) || [];
        return settings
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
                    selectedComponent !== '' && currentComponent
                }
            </IonContent>
        )
    )
}
