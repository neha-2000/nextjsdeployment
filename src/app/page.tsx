"use client";

import Scan from './Components/Home/Scan';
import VanilaScan from './Components/Home/VanilaScan'

// import { useEffect, useRef, useState } from "react";

// export default function Home() {
//   const videoRef = useRef();
//   const canvasRef = useRef();

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const devices = await navigator.mediaDevices.enumerateDevices();
//         const videoDevices = devices.filter(
//           (device) => device.kind === "videoinput"
//         );
//         const backCamera = videoDevices.find((device) =>
//           device.label.toLowerCase().includes("back")
//         );

//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { deviceId: backCamera.deviceId },
//         });
//         videoRef.current.srcObject = stream;
//       } catch (error) {
//         console.error("Error accessing camera:", error);
//       }
//     };

//     startCamera();

//     const scanFrame = () => {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");

//       if (video.readyState === video.HAVE_ENOUGH_DATA) {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//         const code = decodeQRCode(imageData);

//         if (code) {
//           alert("QR code detected")
//           console.log("QR code detected:", code);
//           // Handle the scanned QR code data here
//         }

//         requestAnimationFrame(scanFrame);
//       } else {
//         requestAnimationFrame(scanFrame);
//       }
//     };

//     scanFrame();
//     const decodeQRCode = (imageData) => {
//       // This is a basic example of QR code decoding.
//       // You may need to implement a more robust decoding algorithm.
//       // For simplicity, this example just returns the first QR code found.
  
//       // Process imageData to decode QR code here
//       // You can use any image processing algorithm or library
 
//       return "Sample QR code data"; // Replace this with the actual decoded data
//     };
  

//     return () => {
//       if (videoRef.current.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   // console.log("scanner",scanResult)
//   return (
//     <div>
//       <h1>QR scaning here</h1>

//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         style={{ width: "100%" }}
//       ></video>
//       <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
//     </div>
//   );
// }

import React from 'react'
import QrCodeScanner from './Components/Home/QrCodeScanner';

const page = () => {
  return (
    <div>
      {/* <QrCodeScanner/> */}
      <Scan/>
      <VanilaScan/>
    </div>
  )
}

export default page
