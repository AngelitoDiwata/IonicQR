import { IonAlert, IonButton, IonButtons, IonContent, IonFooter, IonIcon, IonInput, IonItem, IonItemDivider, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useStorage } from "../hooks/useStorage";
import { useEffect, useState } from "react";

export default function Settings({ onBack, settingData, onSetup }: any) {

    const { setAppSetting } = useStorage();
    const [currentLocation, setCurrentLocation] = useState();
    const [editKey, setEditKey] = useState();
    const [locationList, setLocationList] = useState(settingData.locationList);

    const [currentUser, setCurrentUser] = useState();
    const [userType, setUserType] = useState();
    const [userEditKey, setUserEditKey] = useState();
    const [userList, setUserList] = useState(settingData.userList);

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isUserAlertOpen, setIsUserAlertOpen] = useState(false)
    const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
    const [isUserErrorAlertOpen, setIsUserErrorAlertOpen] = useState(false)
    const [isEmptyAlertOpen, setIsEmptyAlertOpen] = useState(false);
    const [backDisabled, setBackDisabled] = useState(onSetup)

    const assembleAppSetting = () => {
        setBackDisabled(false)
        return {
            locationList,
            userList
        }
    }
    const addToLocationList = () => {
        if (currentLocation && (currentLocation as string).trim() !== '') {
            if (locationList !== undefined && checkDuplicates(locationList, currentLocation)) {
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
    }

    const addToUserList = () => {
        if ((currentUser && (currentUser as string).trim() !== '' && userType)) {
            if (userList !== undefined && checkDuplicates(userList, currentUser)) {
                setIsUserErrorAlertOpen(true)
            }
            else if (userEditKey !== undefined) {
                editUserList()
            } else {
                const currentList = userList || []
                setUserList([...currentList, { name: currentUser, type: userType } as never])
                setIsUserAlertOpen(true)
            }
        }
    }
    const closeSuccessAlert = () => {
        setIsAlertOpen(false)
        setCurrentLocation(undefined)
    }
    const closeUserSuccessAlert = () => {
        setIsUserAlertOpen(false)
        setCurrentUser(undefined)
    }
    const editLocationList = () => {
        if (locationList !== undefined && checkDuplicates(locationList, currentLocation)) {
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

    const editUserList = () => {
        if (userList !== undefined && checkDuplicates(userList, currentUser)) {
            setIsUserErrorAlertOpen(true)
        }
        else if (userEditKey !== undefined) {
            const newUserList = [...userList];
            newUserList[userEditKey] = { name: currentUser, type: userType };
            setUserList(newUserList)
            setIsUserAlertOpen(true)
        }

        setUserEditKey(undefined)
        setCurrentUser(undefined)
        setUserType(undefined)
    }
    const checkDuplicates = (array: any[], value: string | undefined) => {
        return array.includes(value)
    }

    const deleteFromLocationList = (key: number) => {
        const newLocationList = [...locationList];
        newLocationList.splice(key, 1);
        setLocationList(newLocationList)
    }

    const deleteFromUserList = (key: number) => {
        const newUserList = [...userList];
        newUserList.splice(key, 1);
        setLocationList(newUserList)
    }

    const validateDataBeforeSave = () => {
        if (locationList && userList) {
            if (locationList.length === 0 || userList.length === 0) {
                setIsEmptyAlertOpen(true)
            } else {
                setAppSetting(assembleAppSetting())
            }

            onSetup && onBack(false, true)
        } else {
            alert('Please save Location or User before proceeding')
        }
    }

    useEffect(() => {
        (userList && locationList && !onSetup) && validateDataBeforeSave()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userList, locationList])

    useEffect(() => {
        if (editKey !== undefined) {
            setCurrentLocation(locationList[editKey])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editKey])

    useEffect(() => {
        if (userEditKey !== undefined) {
            setCurrentUser(userList[userEditKey].name)
            setUserType(userList[userEditKey].type)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userEditKey])

    return (
        <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {
                    !backDisabled && <IonButtons onClick={() => onBack(false, true)} slot="start" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <IonIcon className="ion-padding" size="medium" icon={arrowBack} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon>
                    </IonButtons>
                }
                <IonTitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{onSetup ? 'Initial Setup' : 'Settings'}</IonTitle>
            </IonToolbar>
            <IonContent className="ion-padding" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

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

                <h4>List of users: </h4>
                <IonItemDivider placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonInput value={currentUser} onIonChange={(e) => setCurrentUser(e.detail.value! as never)} placeholder="Enter user name" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonInput>
                    <IonSelect value={userType} onIonChange={(e) => setUserType(e.detail.value! as never)} placeholder="User Type" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <IonSelectOption value="User" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>User</IonSelectOption>
                        <IonSelectOption value="Administrator" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Administrator</IonSelectOption>
                    </IonSelect>
                    <IonButton onClick={addToUserList} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{userEditKey !== undefined ? 'Update' : 'Add'}</IonButton>
                </IonItemDivider>
                <IonList placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {
                        (userList && userList.length > 0) && userList.map((res: any, key: any) => {
                            return (
                                <IonItemSliding key={key} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    <IonItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        <IonLabel placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{res.name} - {res.type}</IonLabel>
                                    </IonItem>

                                    <IonItemOptions placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        <IonItemOption onClick={() => setUserEditKey(key)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Edit</IonItemOption>
                                        <IonItemOption onClick={() => deleteFromUserList(key)} color="danger" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Delete</IonItemOption>
                                    </IonItemOptions>
                                </IonItemSliding>
                            )
                        })
                    }

                </IonList>




            </IonContent>
            {
                (onSetup) && <IonFooter className="ion-padding" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <IonButton size='large' expand='block' onClick={validateDataBeforeSave} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            Save and Go to Main menu
                        </IonButton>
                    </IonToolbar>
                </IonFooter>
            }
            <IonAlert
                isOpen={isAlertOpen}
                header={`Successfully ${editKey !== undefined ? 'updated' : 'added'} location`}
                subHeader={`Data saved: ${currentLocation}`}
                buttons={['Close']}
                onDidDismiss={() => closeSuccessAlert()}
            ></IonAlert>

            <IonAlert
                isOpen={isUserAlertOpen}
                header={`Successfully ${userEditKey !== undefined ? 'updated' : 'added'} a user!`}
                subHeader={`Data saved: ${currentUser}`}
                buttons={['Close']}
                onDidDismiss={() => closeUserSuccessAlert()}
            ></IonAlert>

            <IonAlert
                isOpen={isErrorAlertOpen}
                header="Location already exist!"
                subHeader="Kindly save a new location name"
                buttons={['Okay']}
                onDidDismiss={() => setIsErrorAlertOpen(false)}
            ></IonAlert>

            <IonAlert
                isOpen={isUserErrorAlertOpen}
                header="User already exist!"
                subHeader="Kindly save a new user"
                buttons={['Okay']}
                onDidDismiss={() => setIsUserErrorAlertOpen(false)}
            ></IonAlert>

            <IonAlert
                isOpen={isEmptyAlertOpen}
                header="Please input locations/users"
                subHeader="Cannot proceed without set of locations/users"
                buttons={['Okay']}
                onDidDismiss={() => { setIsEmptyAlertOpen(false) }}
            ></IonAlert>
        </IonPage>
    )
}
