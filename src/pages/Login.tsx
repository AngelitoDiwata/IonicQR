import { useEffect, useState } from 'react'
import QRScanner from '../components/QRScanner'
import { IonAlert, IonButtons, IonContent, IonIcon, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useStorage } from '../hooks/useStorage';
import MainMenu from './MainMenu';
import Cookies from 'js-cookie';
import { arrowBack } from 'ionicons/icons';

export default function Login({ onLogout }: any) {

    const { checkUserExistence } = useStorage();
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({ name: '', type: '' });
    const [isBypass, setIsBypass] = useState(false)

    const handleLoginScan = async (data: any) => {
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

                        <QRScanner paused={isBypass} handleScan={handleLoginScan} focus={true} />
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: 'auto',
                        }}>
                            <div style={{
                                width: '100%',
                                maxWidth: '320px',
                                padding: '24px',
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginBottom: '32px'
                                }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="64"
                                        height="64"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <rect x="7" y="7" width="3" height="3"></rect>
                                        <rect x="14" y="7" width="3" height="3"></rect>
                                        <rect x="7" y="14" width="3" height="3"></rect>
                                        <rect x="14" y="14" width="3" height="3"></rect>
                                    </svg>
                                </div>
                                <h1 style={{
                                    marginBottom: '24px',
                                    fontSize: '24px',
                                    fontWeight: 300,
                                    textAlign: 'center',
                                    color: '#1f2937'
                                }}>
                                    Please scan your user QR code
                                </h1>
                            </div>
                        </div>
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
