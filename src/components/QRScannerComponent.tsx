import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useStorage } from '../hooks/useStorage';

const QRScannerComponent: React.FC<{ onScanSuccess: (result: string) => void, onScanError?: (error: any) => void }> = ({ onScanSuccess, onScanError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanner, setScanner] = useState<BrowserMultiFormatReader | null>(null);
  const { data, addData } = useStorage();

  useEffect(() => {
    const codeReader: any = new BrowserMultiFormatReader();
    setScanner(codeReader);
    console.log(data)
    startScan();
    return () => {
      // codeReader.reset();
      // codeReader.stopContinuousDecode();
    };
  }, [data]);

  const startScan = () => {
    if (videoRef.current) {
      scanner?.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
        if (result) {
          onScanSuccess(result.getText());
          addData(result.getText());
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
    <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <IonContent placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <video ref={videoRef} style={{ width: '100%' }} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default QRScannerComponent;
