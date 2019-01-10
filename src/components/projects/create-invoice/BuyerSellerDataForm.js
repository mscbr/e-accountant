import React from 'react'

const BuyerSellerDataForm = (props) => {
    const { handleChange } = props;
  return (
    <div>       
        <div className="input-field">
            <label htmlFor="title">Seller info</label>
            <input type="text" id="title" onChange={handleChange} /> 
        </div>
        <div className="input-field">
            <label htmlFor="datepicker">Buyer info</label>
            <input type='date' id='date' onChange={handleChange} />
        </div>
        
        <div className="input-field">
            <label htmlFor="comment">Comment</label>
            <textarea id='comment' className='materialize-textarea' onChange={handleChange}></textarea>
        </div>
    </div>
  )
}

export default BuyerSellerDataForm
