import Razorpay from 'razorpay';
import React, { useState } from 'react';
import axios from 'axios';

const Order = () => {
    const [order,setOrder]=useState();
    async function createOrder() {
        console.log("order creation started");
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:8080/api/v1/order/create-order",{
            name: "raj",
            email: "rajnk@gmail.com",
            phno: "8660202938",
            course: "Java",
            amount: 10000,
            currency: 'INR'
        },{
            headers: {
            Authorization: token
          }
        });
        setOrder(response.data);

        const order=await response.data;
        console.log("order creation completed", order);
        if(order){
            proceedOrder(order);
        }
    }

    const proceedOrder = (order) => {
        const options={
            //pass order details
            "key_id":"rzp_test_LForrv4px5KNlV",
            "amount":order.amount,
            "currency":"INR",
            "name":"payment_demo",
            "description":"Course Payment",
            "order_id":order.razorPayOrderID,
            "receipt":order.email,
            "callback_url":"http://localhost:8080/order/handle-payment-callback",
            "prefill":{
                "name":order.name,
                "email":order.email,
                "contact":order.phno

            },
            "theme":{
                "color":"#3399cc"
            }

        };

        const rzp1=new window.Razorpay(options);
        rzp1.open();
        e.preventDefault();
    }
  return (
    <div>
      <button onClick={createOrder}>place Order</button>
    </div>
  )
}

export default Order;