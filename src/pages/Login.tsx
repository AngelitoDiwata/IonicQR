import { useEffect, useState } from 'react'
import QRScanner from '../components/QRScanner'
import { IonAlert, IonButtons, IonContent, IonIcon, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useStorage } from '../hooks/useStorage';
import MainMenu from './MainMenu';
import Cookies from 'js-cookie';
import { arrowBack } from 'ionicons/icons';
import { setCameraState } from '../store/reducers/DataSlice';
import { useDispatch } from 'react-redux';

export default function Login({ onLogout }: any) {

    const { checkUserExistence } = useStorage();
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({ name: '', type: '' });
    const [isBypass, setIsBypass] = useState(false)
    const dispatch = useDispatch()

    const handleLoginScan = (data: any) => {
        setUserLoggedIn(true)
        checkUserExistence(data.getText()).then((res) => {
            if (res.length > 0) {
                setUserLoggedIn(true)
                setCurrentUser(res[0])
                const stringData = JSON.stringify(res[0]);
                Cookies.set('userData', stringData);
                setIsAlertOpen(true)
            } else {
                setUserLoggedIn(false)
                setIsAlertOpen(true)
            }
        })
    }


    useEffect(() => {
        if (Cookies.get('userData')) {
            setCurrentUser(JSON.parse(Cookies.get('userData') as any))
            setIsBypass(true)
            //dispatch(setCameraState(false))
            setUserLoggedIn(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>{
            !userLoggedIn ?
                <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <IonButtons onClick={() => onLogout(false)} slot="start" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <IonIcon className="ion-padding" size="medium" icon={arrowBack} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon>
                        </IonButtons>
                        <IonTitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>User Login</IonTitle>
                    </IonToolbar>
                    <IonContent fullscreen placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <IonItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <QRScanner paused={isBypass} handleScan={handleLoginScan} />
                        </IonItem>
                    </IonContent>
                </IonPage> : <MainMenu bypass={isBypass} currentUser={currentUser} onLogOut={() => onLogout(false)} />
        }
            <IonAlert
                isOpen={isAlertOpen}
                header={userLoggedIn ? `Welcome, ${currentUser.name}!` : 'Unknown user. Please try again'}
                buttons={[userLoggedIn ? 'Continue' : 'Close']}
                onDidDismiss={() => setIsAlertOpen(false)}
            ></IonAlert>
        </>
    )
}
