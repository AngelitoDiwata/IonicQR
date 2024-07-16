import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import Login from './Login';
import Cookies from 'js-cookie';
import Settings from './Settings';
import { useSelector } from 'react-redux';
import { qrCodeOutline } from 'ionicons/icons';

function Home() {
    const { settingData } = useSelector((state: any) => state.data)
    const [loginSelected, setLoginSelected] = useState(false);
    const [onSetup, setOnSetup] = useState(false);
    const [isBacked, setIsBacked] = useState(false);
    const [loadState, setLoadState] = useState(0)


    const logout = (value: boolean, backed: boolean = false) => {
        setIsBacked(backed)
        Cookies.remove('userData')
        setLoginSelected(value)
    }

    const getSettingData = async () => {
        return await settingData
    }

    useEffect(() => {

        getSettingData().then((res) => {
            const condition = (loadState > 0 && (res.userList && res.locationList)) ? (res.userList.length === 0 || res.locationList.length === 0) : ((res.userList.length === 0 || res.locationList.length === 0) && isBacked)
            setOnSetup(condition)
        })

        setLoadState(loadState + 1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settingData])


    useEffect(() => {
        getSettingData().then((res) => {
            if (res.userList && res.locationList) {
                setOnSetup(false)
            } else {
                setOnSetup(true)
            }
        })


        if (Cookies.get('userData')) {
            setLoginSelected(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        (onSetup && !isBacked) ? <Settings onSetup={onSetup} settingData={settingData} onBack={logout} /> :
            loginSelected ? <Login onLogout={logout} /> : <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonContent className="ion-padding" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonIcon icon={qrCodeOutline} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '70%', height: '60%' }} size="large" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon>
                    <h1 style={{ margin: '20px', textAlign: 'center' }}> QR Counter </h1>
                    <IonButton size='large' style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '50%' }} onClick={() => setLoginSelected(true)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Scan to Log in</IonButton>
                </IonContent>
            </IonPage>
    );
}
export default Home;