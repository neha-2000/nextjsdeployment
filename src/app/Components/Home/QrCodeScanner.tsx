import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrCodeScanner: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const qrCodeRegionId = "qr-code-region";

  // useEffect(() => {
  //   const scanner = new Html5QrcodeScanner(
  //     qrCodeRegionId, 
  //     { fps: 10, qrbox: 250 },
  //     /* verbose= */ false
  //   );

  //   const onScanSuccess = (decodedText: string) => {
  //     setResult(decodedText);
  //     scanner.clear();
  //   };

  //   scanner.render(onScanSuccess);

  //   return () => {
  //     scanner.clear();
  //   };
  // }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div id={qrCodeRegionId} />
      {result && <p>Scanned QR Code: {result}</p>}
    </div>
  );
};


export default QrCodeScanner;
