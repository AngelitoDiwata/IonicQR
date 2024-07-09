import { IonAlert, IonButton, IonButtons, IonContent, IonFooter, IonIcon, IonInput, IonItem, IonItemDivider, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useStorage } from "../hooks/useStorage";
import { useEffect, useState } from "react";

export default function Settings({ onBack, settingData }: any) {

    const { setAppSetting } = useStorage();
    const [appIP, setAppIP] = useState(settingData.appIP);
    const [currentLocation, setCurrentLocation] = useState();
    const [editKey, setEditKey] = useState();
    const [locationList, setLocationList] = useState(settingData.locationList);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
    const [isDBSaveAlertOpen, setIsDBSaveAlertOpen] = useState(false);

    const assembleAppSetting = () => {
        return {
            appIP,
            locationList
        }
    }
    const addToLocationList = () => {
        if (locationList !== undefined && checkDuplicates(currentLocation)) {
            setIsErrorAlertOpen(true)
        }
        else if (editKey !== undefined) {
            editLocationList()
        } else {
            const currentList = locationList || []
            setLocationList([...currentList, currentLocation as never])
            setIsAlertOpen(true)
        }
    }
    const closeSuccessAlert = () => {
        setIsAlertOpen(false)
        setCurrentLocation(undefined)
    }
    const editLocationList = () => {
        if (locationList !== undefined && checkDuplicates(currentLocation)) {
            setIsErrorAlertOpen(true)
        }
        else if (editKey !== undefined) {
            const newLocationList = [...locationList];
            newLocationList[editKey] = currentLocation;
            setLocationList(newLocationList)
            setIsAlertOpen(true)
            setEditKey(undefined)
            setCurrentLocation(undefined)
        }
    }
    const checkDuplicates = (value: string | undefined) => {
        return locationList.includes(value)
    }

    const deleteFromLocationList = (key: number) => {
        const newLocationList = [...locationList];
        newLocationList.splice(key, 1);
        setLocationList(newLocationList)
    }

    useEffect(() => {
        if (editKey !== undefined) {
            setCurrentLocation(locationList[editKey])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editKey])

    return (
        <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonButtons onClick={onBack} slot="start" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonIcon className="ion-padding" size="medium" icon={arrowBack} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon>
                </IonButtons>
                <IonTitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Settings</IonTitle>
            </IonToolbar>
            <IonContent className="ion-padding" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

                <h5>Current Server IP: </h5>
                <IonItemDivider placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonInput value={appIP} onIonChange={(e) => setAppIP(e.detail.value!)} placeholder="Enter text" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonInput>
                </IonItemDivider>
                <h4>List of Warehouse Locations: </h4>
                <IonItemDivider placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonInput value={currentLocation} onIonChange={(e) => setCurrentLocation(e.detail.value! as never)} placeholder="Enter Location/Lot No:" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonInput>
                    <IonButton onClick={addToLocationList} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{editKey !== undefined ? 'Update' : 'Add'}</IonButton>
                </IonItemDivider>
                <IonList placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {
                        (locationList && locationList.length > 0) && locationList.map((res: any, key: any) => {
                            return (
                                <IonItemSliding key={key} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    <IonItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        <IonLabel placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{res}</IonLabel>
                                    </IonItem>

                                    <IonItemOptions placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        <IonItemOption onClick={() => setEditKey(key)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Edit</IonItemOption>
                                        <IonItemOption onClick={() => deleteFromLocationList(key)} color="danger" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Delete</IonItemOption>
                                    </IonItemOptions>
                                </IonItemSliding>
                            )
                        })
                    }

                </IonList>

            </IonContent>
            <IonFooter className="ion-padding" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonButton size='large' expand='block' onClick={() => { setAppSetting(assembleAppSetting()); setIsDBSaveAlertOpen(true); }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Save
                    </IonButton>
                </IonToolbar>
            </IonFooter>
            <IonAlert
                isOpen={isAlertOpen}
                header={`Successfully ${editKey !== undefined ? 'updated' : 'added'} location`}
                subHeader={`Data saved: ${currentLocation}`}
                buttons={['Close']}
                onDidDismiss={() => closeSuccessAlert()}
            ></IonAlert>
            <IonAlert
                isOpen={isErrorAlertOpen}
                header="Location already exist!"
                subHeader="Kindly save a new location name"
                buttons={['Okay']}
                onDidDismiss={() => setIsErrorAlertOpen(false)}
            ></IonAlert>
            <IonAlert
                isOpen={isDBSaveAlertOpen}
                header="Settings saved!"
                subHeader="You are going back to the main menu"
                buttons={['Okay']}
                onDidDismiss={() => { onBack(); setIsDBSaveAlertOpen(false) }}
            ></IonAlert>
        </IonPage>
    )
}
