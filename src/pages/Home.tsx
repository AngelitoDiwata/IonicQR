import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';
import Login from './Login';

function Home() {
    const [loginSelected, setLoginSelected] = useState(false);

    return (

        loginSelected ? <Login onLogout={setLoginSelected} /> : <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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