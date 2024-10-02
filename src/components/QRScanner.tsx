import { useEffect, useRef, useState } from "react";

export default function QRScanner({ handleScan, focus }: any) {
    const inputRef = useRef<any>(null);
    const [code, setCode] = useState("");

    useEffect(() => {
        // Check if code contains CR LF
        if (code.includes('\n')) {
            handleScan({
                getText: () => {
                    return code.trim()
                }
            })?.then(() => {
                setCode(() => "")
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code])

    useEffect(() => {
        if (inputRef.current && focus) {
            inputRef.current.focus();
            const preventBlur = (e: Event) => {
                if (e.target !== inputRef.current) {
                    e.preventDefault();
                    if (inputRef.current) {
                        inputRef.current.focus();  // Always refocus the input
                    }
                }
            };

            document.addEventListener('mousedown', preventBlur);

            // Cleanup event listener when the component unmounts
            return () => {
                document.removeEventListener('mousedown', preventBlur);
            };
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [focus])

    // Create a function that will check for enter keypress from an input.
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    })


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '0%', left: "0px", marginRight: "auto" }}>
            {/* <video ref={ref} style={{ borderColor: isScanMode ? 'green' : 'grey', width: '80%', border: '3px dashed white', borderRadius: '10px' }} /> */}
            <textarea ref={inputRef} style={{ outline: "none", border: "none", opacity: "0", width: "-1", resize: "none" }} value={code} onChange={(e) => setCode(e.target.value)} id="input" autoFocus onKeyDown={(e) => {
                if (!e.key || e.key === 'Backspace' || e.key === 'Delete') {
                    e.preventDefault();
                }
            }}></textarea>
        </div >
    )
}
