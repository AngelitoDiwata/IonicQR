import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';
import Login from './Login';

function Home() {
    const [loginSelected, setLoginSelected] = useState(false);

    return (

        loginSelected ? <Login onLogout={setLoginSelected} /> : <IonPage>
            <IonContent className="ion-padding">
                <IonButton size='large' expand='block' onClick={() => setLoginSelected(true)}> Login </IonButton>
                <IonButton size='large' expand='block' fill="outline" color='danger' > Exit </IonButton>
                {
                    loginSelected && <Login />
                }
            </IonContent>
        </IonPage>
    );
}
export default Home;