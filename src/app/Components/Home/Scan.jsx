import { useState, useRef } from 'react';
import jsQR from 'jsqr';

const Scan = () => {
  const [qrData, setQrData] = useState('');
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Process the image to find and decode the QR code
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);
          if (code) {
            alert("API call here")
            setQrData(code.data);
          } else {
            setQrData('No QR code found');
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {qrData && <p>QR Code Data: {qrData}</p>}
    </div>
  );
};

export default Scan;
