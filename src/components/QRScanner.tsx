import { IonAlert } from "@ionic/react";
import { useEffect, useState } from "react";
import { useZxing } from "react-zxing";

export default function QRScanner({ handleScan, paused, invalidScan }: any) {

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [scanMsg, setScanMsg] = useState("");

    const { ref } = useZxing({
        onDecodeResult(result) {
            if (result) {
                handleScan(result)
            }
        },
        paused
    });

    useEffect(() => {
        if (invalidScan) {
            setIsAlertOpen(true)
            setScanMsg('Please scan a valid QR code')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invalidScan])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px', marginBottom: '40px' }}>
            <video ref={ref} style={{ width: '80%', border: '3px dashed white', borderRadius: '10px' }} />
            <IonAlert
                isOpen={isAlertOpen}
                header={scanMsg}
                buttons={['Close']}
                onDidDismiss={() => setIsAlertOpen(false)}
            ></IonAlert>
        </div>

    )
}
