import { useState, useRef } from 'react';

const VanilaScan = () => {
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
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
console.log("imageData1",imageData)

          // Process the image to find and decode the QR code
          decodeQRCode(imageData);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const decodeQRCode = (imageData) => {
    const width = imageData.width;
    const height = imageData.height;
    const imageDataArray = imageData.data;
    console.log("imageData",imageData,imageDataArray)
  
    // Constants for QR code detection (you may need to adjust these)
    const threshold = 128; // Threshold for color detection
  
    // Function to check if a pixel is black
    const isBlack = (r, g, b) => {
      // We assume it's black if the pixel intensity is below the threshold
      const intensity = (r + g + b) / 3;
      return intensity < threshold;
    };

     // Function to get the value of a pixel
     const getPixelValue = (imageDataArray, x, y, width) => {
        const index = (y * width + x) * 4;
        const r = imageDataArray[index];
        const g = imageDataArray[index + 1];
        const b = imageDataArray[index + 2];
        return { r, g, b };
      };
      
//   const getPixelValue = (x, y) => {
//     const index = (y * width + x) * 4;
//     const r = imageDataArray[index];
//     const g = imageDataArray[index + 1];
//     const b = imageDataArray[index + 2];
//     return { r, g, b };
//   };

  const scanQRCode = () => {
    // Here you can implement a custom QR code scanning algorithm
    // For simplicity, we'll implement a basic algorithm that scans the image row by row

    // Define the scan step size (you may need to adjust this depending on the image size)
    const step = 5;

    let qrCodeData = '';

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const { r, g, b } = getPixelValue(imageDataArray,x, y);

        // If the pixel is black, scan the surrounding area for QR code patterns
        if (isBlack(r, g, b)) {
          qrCodeData += '1'; // Append '1' for black pixel
        } else {
          qrCodeData += '0'; // Append '0' for white pixel
        }
      }
    }

    // Convert binary data to text
    const text = binaryToText(qrCodeData);
    console.log("text",text)
    return text;
  };

  // Convert binary data to text
  const binaryToText = (binaryData) => {
    // Split binary data into chunks of 8 bits
    const chunks = binaryData.match(/.{1,8}/g);
    // Convert each chunk to decimal and then to character
    const text = chunks.map(chunk => String.fromCharCode(parseInt(chunk, 2))).join('');
    return text;
  };

  // Scan the image for QR code
  return scanQRCode();
}

  return (
    <div>
      <h1>VanilaScan</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {qrData && <p>QR Code Data: {qrData}</p>}
    </div>
  );
};

export default VanilaScan;
