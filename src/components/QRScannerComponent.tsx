// src/components/QrScannerComponent.tsx

import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import { useStorage } from '../hooks/useStorage';

const QRScannerComponent: React.FC<{ onScanSuccess: (result: string) => void, onScanError?: (error: any) => void }> = ({ onScanSuccess, onScanError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanner, setScanner] = useState<BrowserMultiFormatReader | null>(null);
  const { data, addData } = useStorage();



  const startScan = async () => {
    if (videoRef.current && scanner) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoTrack = stream.getVideoTracks()[0];
        const decodedResult = await scanner.decodeOnceFromVideoElement(videoRef.current).then((result) => {
          if (result) {
            addData(result.getText());
            onScanSuccess(result.getText());
          }
        });
        videoTrack.stop();
      } catch (error) {
        if (onScanError) {
          onScanError(error);
        }
      }
    }
  };

  useEffect(() => {
    const codeReader: any = new BrowserMultiFormatReader();
    setScanner(codeReader);
    return () => {
      // scanner.reset();
      // scanner.stopContinuousDecode();
    };
  }, [data]);



  return (
    <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <IonContent placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <IonCard placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <IonCardHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonCardTitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Basic Count</IonCardTitle>
            <IonCardSubtitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}><IonButton onClick={startScan} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Start Scan</IonButton></IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <video ref={videoRef} style={{ width: '100%' }} />
            </div>
          </IonCardContent>
        </IonCard>


        <IonList placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {data.map((res) =>
            <IonItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <IonLabel placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{res.data}</IonLabel>
            </IonItem>
          )}

        </IonList>


      </IonContent>
    </IonPage>
  );
};

export default QRScannerComponent;
