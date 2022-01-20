
import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import logo from './buzcafe.jpg';
import eraswap from './eraswap_logo.jpg';
 
const truncate = (data) =>`${data.slice(0, 10)}....${data.slice(38)}`;

function QrCodeScanner(props) {
  const printRef = React.useRef();
 
  const [inputText, setInputText] = useState('');
  const [qrCodeText, setQRCodeText] = useState('');

  // generate QR code
  const generateQRCode = () => {
    setQRCodeText(inputText);
  }

  
 
  // download QR code
  const downloadQRCode = () => {
    const qrCodeURL = document.getElementById('qrCodeEl')
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL) 
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  }
 
  return (
    <div className="mx-auto text-center" style={{width: '20rem'}}>
      
     

      <div className="card p-3 m-2" style={{width: '20rem',border:"5px solid #f4831f"}}>
        
        <img src={logo} className="card-img-top" alt="..." />
        <div className="card-body" >
        <QRCode
        id="qrCodeEl"        
        value={props.address && ''}
        size={256}
        lavel="H"
        includeMargin={false}
        imageSettings={{
          src:  eraswap,
          x: null,
          y: null,
          height: 40,
          width: 48,
          excavate: false,
        }}
      />
        <h6 style={{color : '#f4831f'}} className="card-title text-center">Scan and Pay with Eraswap </h6> 
        <hr style={{color : '#f4831f'}} />
        <p className="text-small text-center text-dark">{props.address} </p>

        </div>

      </div>

      <button
        className="btn btn-block btn-lg btn-outline-warning"
        onClick={downloadQRCode}
      ><i class="fa fa-download" aria-hidden="true"></i> Download</button>
    </div>
  );
}
 
export default QrCodeScanner;
