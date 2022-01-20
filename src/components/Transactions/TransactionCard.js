import React from 'react'

export default function TransactionCard(props) {
    return (
        <div onClick={()=>window.open(
            `https://eraswap.info/txn/${props.transactionHash}`,
            "",
            "width=1001,height=650"
                )} className='card shadow p-1 px-2 my-1 '>
            <div className='row'>
                <div  className='col-2 my-auto align-middle'>
                    <div 
                     style={{verticalAlign : 'middle'}}
                     className={`avatar text-center align-items-center  ${props.mode == "RECEIVE" ? 'bg-success' : 'bg-danger' }`}> <i style={{verticalAlign : 'middle'}} className={`fa fa-${props.mode == "RECEIVE" ? 'plus' : 'minus' }`} ></i></div>
                </div>
                <div className='col-6'>
                <h4>{props.mode == "RECEIVE" ? 'Receive from' : 'Paid to'}  </h4>
                <p className='text-muted text-truncate m-0 p-0'  data-toggle="tooltip" data-placement="top" title={props.address}> {props.address}</p>
                {props.data != "" ? <p className='m-0 p-0 text-small text-truncate'>Message : {props.data}</p>: null}
                </div>

                <div className='col-4 my-auto text-right'>
                    <h2 >
                        {props.mode == "RECEIVE" ? '+' : '-' }
                        { props.value}
                        <img className="logo" src="https://s2.coinmarketcap.com/static/img/coins/200x200/4860.png" alt="ES"/>
                    </h2>
                </div>
            </div>
            <p className='text-small my-0 text-right'> <i className='fa fa-clock'></i> {props.time}</p>

        </div>
    )
}
