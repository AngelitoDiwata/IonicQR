import { IonButton, IonButtons, IonContent, IonFooter, IonIcon, IonInput, IonItem, IonItemDivider, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useStorage } from "../hooks/useStorage";
import { useEffect, useState } from "react";

export default function Settings({ onBack, settingData }: any) {

    const { setAppSetting } = useStorage();
    const [appIP, setAppIP] = useState(settingData.appIP);
    const [currentLocation, setCurrentLocation] = useState('');
    const [locationList, setLocationList] = useState(settingData.locationList);

    const assembleAppSetting = () => {
        return {
            appIP,
            locationList
        }
    }

    const addToLocationList = () => {
        setLocationList([...locationList, currentLocation as never])
    }

    const deleteFromLocationList = (key: number) => {
        const newLocationList = [...locationList];
        newLocationList.splice(key, 1);
        setLocationList(newLocationList)
    }

    useEffect(() => {
        console.log(settingData.appIP)
    }, [settingData])

    return (
        <IonPage>
            <IonToolbar>
                <IonButtons onClick={onBack} slot="start">
                    <IonIcon className="ion-padding" size="medium" icon={arrowBack}></IonIcon>
                </IonButtons>
                <IonTitle>Settings</IonTitle>
            </IonToolbar>
            <IonContent className="ion-padding">

                <h5>Current Server IP: </h5>
                <IonItemDivider>
                    <IonInput value={appIP} onIonChange={(e) => setAppIP(e.detail.value!)} placeholder="Enter text"></IonInput>
                </IonItemDivider>
                <h4>List of Warehouse Locations: </h4>
                <IonItemDivider>
                    <IonInput onIonChange={(e) => setCurrentLocation(e.detail.value!)} placeholder="Enter Location/Lot No:"></IonInput>
                    <IonButton onClick={addToLocationList}>Add</IonButton>
                </IonItemDivider>
                <IonList>

                    {
                        locationList.map((res: any, key: any) => {
                            return (
                                <IonItemSliding key={key}>
                                    <IonItem>
                                        <IonLabel>{res}</IonLabel>
                                    </IonItem>

                                    <IonItemOptions>
                                        <IonItemOption>Edit</IonItemOption>
                                        <IonItemOption onClick={() => deleteFromLocationList(key)} color="danger">Delete</IonItemOption>
                                    </IonItemOptions>
                                </IonItemSliding>
                            )
                        })
                    }

                </IonList>

            </IonContent>
            <IonFooter className="ion-padding">
                <IonToolbar>
                    <IonButton size='large' expand='block' onClick={() => setAppSetting(assembleAppSetting())}>
                        Save
                    </IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    )
}
