import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import Login from './Login';
import Cookies from 'js-cookie';

function Home() {
    const [loginSelected, setLoginSelected] = useState(false);

    const logout = (value: boolean) => {
        Cookies.remove('userData')
        setLoginSelected(value)
    }

    useEffect(() => {
        if (Cookies.get('userData')) {
            setLoginSelected(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (

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