import { IonButton, IonButtons, IonContent, IonFooter, IonIcon, IonInput, IonItem, IonItemDivider, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useStorage } from "../hooks/useStorage";
import { useEffect, useState } from "react";

export default function Settings({ onBack, settingData }: any) {

    const { setAppSetting } = useStorage();
    const [appIP, setAppIP] = useState(settingData.appIP);
    const [currentLocation, setCurrentLocation] = useState();
    const [editKey, setEditKey] = useState();
    const [locationList, setLocationList] = useState(settingData.locationList);

    const assembleAppSetting = () => {
        return {
            appIP,
            locationList
        }
    }

    const addToLocationList = () => {
        if (editKey !== undefined) {
            editLocationList()
        } else {
            const currentList = locationList || []
            setLocationList([...currentList, currentLocation as never])
        }
    }

    const editLocationList = () => {
        if (editKey !== undefined) {
            const newLocationList = [...locationList];
            newLocationList[editKey] = currentLocation;
            setLocationList(newLocationList)
            setEditKey(undefined)
            setCurrentLocation(undefined)
        }
    }

    const deleteFromLocationList = (key: number) => {
        const newLocationList = [...locationList];
        newLocationList.splice(key, 1);
        setLocationList(newLocationList)
    }

    useEffect(() => {

        console.log(editKey)
        if (editKey !== undefined) {
            setCurrentLocation(locationList[editKey])
        }
    }, [editKey])

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
                    <IonInput value={currentLocation} onIonChange={(e) => setCurrentLocation(e.detail.value! as never)} placeholder="Enter Location/Lot No:"></IonInput>

                    <IonButton onClick={addToLocationList}>{editKey !== undefined ? 'Update' : 'Add'}</IonButton>

                </IonItemDivider>
                <IonList>

                    {
                        (locationList && locationList.length > 0) && locationList.map((res: any, key: any) => {
                            return (
                                <IonItemSliding key={key}>
                                    <IonItem>
                                        <IonLabel>{res}</IonLabel>
                                    </IonItem>

                                    <IonItemOptions>
                                        <IonItemOption onClick={() => setEditKey(key)}>Edit</IonItemOption>
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
