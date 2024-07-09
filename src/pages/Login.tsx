import { useState } from 'react'
import QRScanner from '../components/QRScanner'
import { IonContent, IonHeader, IonItem, IonPage } from '@ionic/react'
//import { useStorage } from '../hooks/useStorage';
import MainMenu from './MainMenu';

export default function Login({ onLogout }: any) {

    //.const { checkUserExistence } = useStorage();
    const [userLoggedIn, setUserLoggedIn] = useState(true);

    const handleLoginScan = (data: any) => {
        setUserLoggedIn(true)
        console.log(data)
        // checkUserExistence(data.getText()).then((res) => {
        //     res && setUserLoggedIn(res)
        // })
    }

    return (
        !userLoggedIn ?
            <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                </IonHeader>
                <IonContent fullscreen placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <QRScanner handleScan={handleLoginScan} />
                    </IonItem>
                </IonContent>
            </IonPage> : <MainMenu onLogOut={() => onLogout(false)} />
    )
}
