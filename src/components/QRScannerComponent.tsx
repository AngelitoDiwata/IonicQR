import React, { useEffect, useState } from 'react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { IonButton, IonContent, IonPage } from '@ionic/react';

const QRScannerComponent: React.FC = () => {
    const [scanning, setScanning] = useState(false);
    const [scanResult, setScanResult] = useState<string | null>(null);


    useEffect(() => {
        startScan();
        return () => {
            BarcodeScanner.stopScan();
            BarcodeScanner.showBackground();
        };
    }, []);

    const startScan = async () => {
        setScanning(true);

        await BarcodeScanner.checkPermission({ force: true });

        //BarcodeScanner.hideBackground();

        const result = await BarcodeScanner.startScan({
            targetedFormats: ['QR_CODE'],
            cameraDirection: 'back'  // Use the back camera
        });
        if (result.hasContent) {
            setScanResult(result.content);
            alert(`Scanned text: ${result.content}`);
        }

        setScanning(false);
        BarcodeScanner.showBackground();
    };

    const stopScan = () => {
        BarcodeScanner.stopScan();
        BarcodeScanner.showBackground();
        setScanning(false);
    };

    return (
        <IonPage>
            <IonContent className="ion-padding">
                {scanResult && <div>Scanned result: {scanResult}</div>}
                <IonButton onClick={startScan} disabled={scanning}>
                    Start Scanning
                </IonButton>
                {scanning && (
                    <IonButton onClick={stopScan}>
                        Stop Scanning
                    </IonButton>
                )}
            </IonContent>
        </IonPage>
    );
};

export default QRScannerComponent;