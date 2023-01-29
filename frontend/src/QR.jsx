import { useState } from 'react'
import {QRCodeSVG} from 'qrcode.react'
import { useEffect } from 'react'

const QR = ({location})=>{
    const [uid, setUID] = useState("");
    const changeQR = async ()=>{
      const res = await fetch("http://localhost:3000/generate_qr",{
        method:"POST",
        body:JSON.stringify({
          location
        }),
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await res.json();
      console.log(data.uid)
      setUID(data.uid);
    }
  
    const getQR = async ()=>{
      const res = await fetch(`http://localhost:3000/qr?location=${location}`);
      const data = await res.json();
      console.log(data);
      setUID(data.uid);
    }
    
    useEffect(()=>{
      getQR();
      const interval = setInterval(async()=>{
      await changeQR();
    },1000000)
      return ()=>{clearInterval(interval)};
    },[]);
  
  
    return (
      <div className="App">
        <h1>{location}</h1>
          <QRCodeSVG value={uid} />
          <p>{uid}</p>
      </div>
    )
}

export default QR;