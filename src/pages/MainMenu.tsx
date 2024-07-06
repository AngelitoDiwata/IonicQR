import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react'
import { useState } from 'react'
import { qrCode, logOut, document, logIn, power } from 'ionicons/icons';
import Scan from './Scan';
import Login from './Login';
import { useStorage } from '../hooks/useStorage';

export default function MainMenu({ onLogOut }: any) {
    const { data, clearData } = useStorage();
    const [selectedComponent, setSelectedComponent] = useState('')
    const components: { [key: string]: any } = {
        "Scan": <Scan onBack={() => setSelectedComponent('')} />,
        "Login": <Login />
    }

    const postData = async () => {
        fetch('https://192.0.0.2:3000', {
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


    return (
        selectedComponent === '' ?
            (<IonPage>
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
                    <IonButton size='large' fill="outline" color='danger' expand='block' onClick={onLogOut}>
                        <IonIcon slot='start' icon={power}></IonIcon> Log out
                    </IonButton>
                </IonContent>
            </IonPage>) : components[selectedComponent]
    )
}
