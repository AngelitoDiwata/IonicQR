import { useZxing } from "react-zxing";

export default function QRScanner({ handleScan }: any) {

    const { ref } = useZxing({
        onDecodeResult(result) {
            if (result) {
                handleScan(result)
            }
        },
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px', marginBottom: '40px' }}>
            <video ref={ref} style={{ width: '80%', border: '3px dashed white', borderRadius: '10px' }} />
        </div>

    )
}
