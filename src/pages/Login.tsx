import { useState } from 'react'
import QRScanner from '../components/QRScanner'
import { IonContent, IonHeader, IonItem, IonPage } from '@ionic/react'
import { useStorage } from '../hooks/useStorage';
import MainMenu from './MainMenu';

export default function Login({ onLogout }: any) {

    const { checkUserExistence } = useStorage();
    const [userLoggedIn, setUserLoggedIn] = useState(true);

    const handleLoginScan = (data: any) => {
        setUserLoggedIn(true)
        // checkUserExistence(data.getText()).then((res) => {
        //     res && setUserLoggedIn(res)
        // })
    }

    return (
        !userLoggedIn ?
            <IonPage>
                <IonHeader>
                </IonHeader>
                <IonContent fullscreen>
                    <IonItem>
                        <QRScanner handleScan={handleLoginScan} />
                    </IonItem>
                </IonContent>
            </IonPage> : <MainMenu onLogOut={() => onLogout(false)} />
    )
}
