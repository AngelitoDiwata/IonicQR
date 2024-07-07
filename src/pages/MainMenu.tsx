import { IonButton, IonContent, IonIcon } from '@ionic/react'
import { useEffect, useState } from 'react'
import { qrCode, logOut, document, logIn, power, cog } from 'ionicons/icons';
import Scan from './Scan';
import Login from './Login';
import { useStorage } from '../hooks/useStorage';
import Settings from './Settings';

export default function MainMenu({ onLogOut }: any) {
    const { data, clearData, settingData, store, SETTINGS_KEY } = useStorage();
    const [selectedComponent, setSelectedComponent] = useState('')
    const [camPaused, setCampaused] = useState(false)

    let components: { [key: string]: any } = {
        "Scan": <Scan camPaused={camPaused} data={data} settingData={settingData} onBack={() => setSelectedComponent('')} />,
        "Login": <Login />,
        "Settings": <Settings settingData={settingData} onBack={() => setSelectedComponent('')} />
    }

    const [currentComponent, setCurrentComponent] = useState(components[selectedComponent])


    useEffect(() => {
        setCampaused(false)
        if (selectedComponent === 'Settings') {
            getSettings().then((res) => {
                setCurrentComponent(<Settings settingData={res} onBack={() => setSelectedComponent('')} />)
            })
        } else if (selectedComponent === 'Scan') {
            getSettings().then((res) => {
                setCampaused(false)
                setCurrentComponent(<Scan camPaused={camPaused} data={data} settingData={res} onBack={() => setSelectedComponent('')} />)
            })
        } else {
            setCurrentComponent(components[selectedComponent])
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedComponent])

    const postData = async () => {
        fetch(`${settingData.appIP}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {
            alert("successsfully exported Data")
            clearData();
        }).catch(() => {
            alert("failed to export Data")
        });
    }

    const getSettings = async () => {
        const settings = await store?.get(SETTINGS_KEY) || [];
        return settings
    }



    return (
        (
            <IonContent className="ion-padding">
                <IonButton size='large' expand='block' onClick={() => setSelectedComponent('Scan')}>
                    <IonIcon slot='start' icon={qrCode}></IonIcon> Basic Scan
                </IonButton>
                <IonButton size='large' disabled expand='block' onClick={() => setSelectedComponent('Scan')}>
                    <IonIcon slot='start' icon={logIn}></IonIcon> In to Warehouse
                </IonButton>
                <IonButton size='large' disabled expand='block' onClick={() => setSelectedComponent('Scan')}>
                    <IonIcon slot='start' icon={logOut}></IonIcon> Out from Warehouse
                </IonButton>
                <IonButton size='large' expand='block' onClick={() => postData()}>
                    <IonIcon slot='start' icon={document}></IonIcon> Extract Data
                </IonButton>
                <IonButton size='large' expand='block' onClick={() => setSelectedComponent('Settings')}>
                    <IonIcon slot='start' icon={cog}></IonIcon> Settings
                </IonButton>
                <IonButton size='large' fill="outline" color='danger' expand='block' onClick={onLogOut}>
                    <IonIcon slot='start' icon={power}></IonIcon> Log out
                </IonButton>
                {
                    selectedComponent !== '' && currentComponent
                }
            </IonContent>
        )
    )
}
