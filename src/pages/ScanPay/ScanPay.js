import React,{useState} from 'react';
import PayTo from '../../components/PayTo';
import QRCodeScanner from '../../components/QRCodeScanner';



export default function ScanPay() {
    const [scanner, setScanner] = useState(true);
    const [address,setAddress] = useState("");
    const [error,setError] = useState(false);
    const [data,setData] = useState();
    const toggleScanner = () => {
        console.log("ACTION", "toggleScanner");
        setScanner(!scanner);
      };
    const Retry = () => 
      <div className='text-center mx-auto'>
          Something went wrong,Please  try again <br/><br/>
          {error ? <div class="alert alert-danger" role="alert">Scanned Address is not listed on Buzcafe or address is broken</div> : null}
          <button onClick={toggleScanner} className='btn btn-warning'>Scan</button>
      </div>;

    const onQRCodeValidate = (data) => {
      const res = {
        error:null,
        result:null,
      };
      try {
        res.result = data;
      } catch (error) {
        res.error = error;
      }

      return res;
    };
    const onQRCodeScan = async (data) => {
      const uri = typeof data === "string" ? data : "";
      if (uri) {
        console.log("Sender", uri);
  
        await setAddress(uri);
        await checkShop(uri); 
        toggleScanner();
      }
    };
    const onQRCodeError = (error) => {
      throw error;
    };

    const checkShop = async (uri) => {
      try{
        const res =  await window.buzcafeInst.Shops(uri);
        setData([uri, ...res]);
        console.log(data);
      }catch(e) {
        setError(true);
        console.log(e);
      }
    }



    return (
        <div className='container'>
            <br />
            <br />
            <br />
            <br />
            <br />
            {address && data ? <PayTo address={address} data={data} /> : <Retry />}
            {scanner && (
              <QRCodeScanner
                onValidate={onQRCodeValidate}
                onScan={onQRCodeScan}
                onError={onQRCodeError}
                onClose={toggleScanner}
              />
            )}
            <br />
        </div>
    )
}

const style = {
    transactionBox : {
        maxWidth: '1035px',
        margin: 'auto'
    }
}
