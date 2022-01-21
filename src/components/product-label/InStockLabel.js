import React from 'react';


const InStockLabel = ({product, customClassContainer, customClassContent}) => {

    const manageLabel = (product, customClassContent) =>{
        if(product.quantity > 4){
            return (
                <div style = {{backgroundColor: '#67A675', color: 'white'}} className = {customClassContent}>
                    In Stock
                </div>     
           )  
        }
        else if(product.quantity < 4 && product.quantity > 0){
            return(
                <div style = {{backgroundColor: '#ad9f1f', color: 'white'}} className = {customClassContent}>
                    Only {product.quantity} items in stock
                </div> 
            )
        }
        else{
            return(
                <div style = {{backgroundColor: '#999794', color: 'white'}} className = {customClassContent}>
                    Out of Stock
                </div> 
            )
        }
    }

    return (
        <div className = {`${customClassContainer}`} style = {{letterSpacing: '0.1rem', fontWeight: 'bold'}}>
            {manageLabel(product, customClassContent)}
        </div>
    )
}

export default InStockLabel
