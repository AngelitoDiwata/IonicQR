import React, { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import { useStorage } from '../hooks/useStorage';

const QRScannerComponent: React.FC<any> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { data, addData } = useStorage();


  useEffect(() => {
    const codeReader: any = new BrowserMultiFormatReader();

    if (videoRef.current) {
      codeReader?.decodeFromVideoDevice(undefined, videoRef.current, (result: any, err: any) => {
        if (result) {
          addData(result.getText()).then(() => {
            alert(result.getText())
          })
        }
      });
    }
    return () => {
      // codeReader.reset();
      // codeReader.stopContinuousDecode();
    };
  });

  return (
    <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <IonContent placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <IonCard placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <IonCardHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonCardTitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Basic Count</IonCardTitle>
          </IonCardHeader>
          <IonCardContent placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <video ref={videoRef} style={{ width: '100%' }} />
            </div>
          </IonCardContent>
        </IonCard>


        <IonList placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {data.map((res: any) =>
            <IonItem key={res.id} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <IonLabel placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{res.data}</IonLabel>
            </IonItem>
          )}

        </IonList>


      </IonContent>
    </IonPage>
  );
};

export default QRScannerComponent;
