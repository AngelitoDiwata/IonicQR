import React, { useEffect, useRef, useState } from 'react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import './BarcodeScannerComponent.css';

const BarcodeScannerComponent = () => {
    const scannerRef = useRef(null);
    const [scanning, setScanning] = useState(false);

    useEffect(() => {
        const prepareScanner = async () => {
            await BarcodeScanner.prepare();
        };

        prepareScanner();

        return () => {
            BarcodeScanner.stopScan();
            BarcodeScanner.showBackground();
            document.body.classList.remove('scanner-active');
        };
    }, []);

    const startScan = async () => {
        const status = await BarcodeScanner.checkPermission({ force: true });
        if (status.granted) {
            setScanning(true);
            document.body.classList.add('scanner-active');
            BarcodeScanner.hideBackground();
            const result = await BarcodeScanner.startScan({ targetedFormats: ['QR_CODE'] });
            if (result.hasContent) {
                console.log(result.content);
                setScanning(false);
                BarcodeScanner.showBackground();
                document.body.classList.remove('scanner-active');
            }
        } else {
            console.log('Permission not granted');
        }
    };

    const stopScan = async () => {
        setScanning(false);
        await BarcodeScanner.stopScan();
        BarcodeScanner.showBackground();
        document.body.classList.remove('scanner-active');
    };

    return (
        <div>
            <div
                ref={scannerRef}
                style={{
                    position: 'relative',
                    width: '50%',
                    height: '400px',  // Adjust the height as needed
                    overflow: 'hidden',
                    backgroundColor: '#000'
                }}
            >
                {scanning && <div id="scanner-container" style={{ width: '50%', height: '100%' }}></div>}
            </div>
            <button onClick={startScan}>Start Scan</button>
            <button onClick={stopScan}>Stop Scan</button>
            <div className="scan-box"></div>
        </div>
    );
};

export default BarcodeScannerComponent;
