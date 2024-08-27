import { IonAlert, IonButton } from "@ionic/react";
import { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { useSelector } from "react-redux";



export default function QRScanner({ handleScan, invalidScan }: any) {

    const { cameraOff } = useSelector((state: any) => state.data)
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isScanMode, setIsScanMode] = useState(false)
    const [scanMsg, setScanMsg] = useState("");

    const { ref } = useZxing({
        onDecodeResult(result) {
            if (result && isScanMode) {
                const audio = new Audio(require("beep.mp3"));
                audio.play();
                handleScan(result)
                setIsScanMode(false)
            }
        },
        paused: cameraOff
    });

    useEffect(() => {
        if (invalidScan) {
            setIsAlertOpen(true)
            setScanMsg('Please scan a valid QR code')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invalidScan])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px', marginBottom: '40px', flexDirection: 'column' }}>
            <video ref={ref} style={{ borderColor: isScanMode ? 'green' : 'grey', width: '80%', border: '3px dashed white', borderRadius: '10px' }} />

            <IonButton onClick={() => setIsScanMode(true)} style={{ width: '80%', height: '50px' }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} expand="block">Scan</IonButton>
            <IonAlert
                isOpen={isAlertOpen}
                header={scanMsg}
                buttons={['Close']}
                onDidDismiss={() => setIsAlertOpen(false)}
            ></IonAlert>
        </div >
    )
}
