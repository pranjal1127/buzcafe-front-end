import { ethers } from 'ethers';
import React,{useState,useEffect} from 'react'
import { logEvents } from './LogEvents';
import { sendTransaction } from './sendTransaction';

const truncate = (data) =>`${data.slice(0, 10)}....${data.slice(38)}`;
export default function PayTo(props) {

    const [amount,setAmount] = useState('');
    const [des,setDes] = useState('');
    
    
    const PayMoney = async (e) =>{
      e.preventDefault();

      await sendTransaction(
        window.buzcafeInst,"payAmount",
        [props.data[0],des,{value : ethers.utils.parseEther(amount)}],
        "Eraswap Transferred Successfully"
    )
    }


    return (
        <div style={style.transactionBox} className="mx-auto center border border-warning rounded m-3 p-2">

          {/* Component */}
            <div className="d-flex justify-content-between">
             <div style={{verticalAlign : 'middle',width:"60px",height:"60px"}} className={`avatar my-auto text-center align-items-center mr-3`}> <img src={props.data[5]} style={{verticalAlign : 'middle'}} /></div>
             <div>
              <h3>{props.data[3]}</h3>
              <p>{truncate(props.data[0])}</p>
             </div>
             <a href="/" className="link">View Shop</a>
           </div>
           <hr />
            <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Enter Amount</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <img className="logo" src="https://s2.coinmarketcap.com/static/img/coins/200x200/4860.png" alt="ES"/>
              </div>
            </div>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="form-control" placeholder="Amount" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Description (Optional)</label>
          <textarea value={des} onChange={e => setDes(e.target.value)} className="form-control" rows="2"></textarea>
        </div>
       
        <button onClick={PayMoney} className="btn btn-lg btn-block btn-warning">Pay</button>
      </form>
        </div>
    )
}


const style = {
    transactionBox : {
        maxWidth: '575px',
        margin: 'auto'
    }
}