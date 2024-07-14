import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import Login from './Login';
import Cookies from 'js-cookie';
import Settings from './Settings';
import { useSelector } from 'react-redux';

function Home() {
    const { settingData } = useSelector((state: any) => state.data)
    const [loginSelected, setLoginSelected] = useState(false);
    const [onSetup, setOnSetup] = useState(true);


    const logout = (value: boolean) => {
        Cookies.remove('userData')
        setLoginSelected(value)
    }

    useEffect(() => {



        console.log(settingData)
        settingData && setOnSetup(settingData.userList.length === 0 || settingData.locationList.length === 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settingData])

    useEffect(() => {
        if (Cookies.get('userData')) {
            setLoginSelected(true)
        }


        console.log(settingData)
        //setOnSetup(settingData.userList.length === 0 || settingData.locationList.length === 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        onSetup ? <Settings onSetup={onSetup} settingData={settingData} onBack={logout} /> :
            loginSelected ? <Login onLogout={logout} /> : <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonContent className="ion-padding" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonButton size='large' expand='block' onClick={() => setLoginSelected(true)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}> Login </IonButton>
                    <IonButton size='large' expand='block' fill="outline" color='danger' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} > Exit </IonButton>
                    {
                        loginSelected && <Login />
                    }
                </IonContent>
            </IonPage>
    );
}
export default Home;