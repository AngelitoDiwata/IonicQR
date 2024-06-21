// src/components/QrScannerComponent.tsx

import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { IonButton, IonContent, IonPage } from '@ionic/react';

const QRScannerComponent: React.FC<{ onScanSuccess: (result: string) => void, onScanError?: (error: any) => void }> = ({ onScanSuccess, onScanError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanner, setScanner] = useState<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    const codeReader: any = new BrowserMultiFormatReader();
    setScanner(codeReader);

    return () => {
      codeReader.reset();
      codeReader.stopContinuousDecode();
    };
  }, []);

  const startScan = () => {
    if (videoRef.current) {
      scanner?.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
        if (result) {
          onScanSuccess(result.getText());
        }
        if (err) {
          console.error(err);
          if (onScanError) {
            onScanError(err);
          }
        }
      });
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <video ref={videoRef} style={{ width: '100%' }} />
        </div>
        <IonButton onClick={startScan}>Start Scan</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default QRScannerComponent;
