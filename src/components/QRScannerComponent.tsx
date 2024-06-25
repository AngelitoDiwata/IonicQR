// src/components/QrScannerComponent.tsx

import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import { useStorage } from '../hooks/useStorage';

const QRScannerComponent: React.FC<{ onScanSuccess: (result: string) => void, onScanError?: (error: any) => void }> = ({ onScanSuccess, onScanError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanner, setScanner] = useState<BrowserMultiFormatReader | null>(null);
  const { data, addData } = useStorage();



  const startScan = () => {
    if (videoRef.current) {
      scanner?.decodeFromVideoDevice(undefined, videoRef.current, async (result, err) => {
        if (result) {
          await addData(result.getText())
          onScanSuccess(result.getText());
        }
        if (err) {
          if (onScanError) {
            onScanError(err);
          }
        }
      });
    }
  };

  useEffect(() => {
    const codeReader: any = new BrowserMultiFormatReader();
    setScanner(codeReader);
    return () => {
      // codeReader.reset();
      // codeReader.stopContinuousDecode();
    };
  }, []);



  return (
    <IonPage>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Basic Count</IonCardTitle>
            <IonCardSubtitle><IonButton onClick={startScan}>Start Scan</IonButton></IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <video ref={videoRef} style={{ width: '100%' }} />
            </div>
          </IonCardContent>
        </IonCard>


        <IonList>
          {data.map((res) =>
            <IonItem>
              <IonLabel>{res.data}</IonLabel>
            </IonItem>
          )}

        </IonList>


      </IonContent>
    </IonPage>
  );
};

export default QRScannerComponent;
