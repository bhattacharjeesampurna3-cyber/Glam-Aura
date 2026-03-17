import { useEffect,useState } from "react";
import API from "../../utils/api";

function AdminOrders(){

const [orders,setOrders] = useState([]);

useEffect(()=>{

fetchOrders();

},[]);


const fetchOrders = async()=>{

const res = await API.get("/orders");

setOrders(res.data);

};


const updateStatus = async(id,status)=>{

await API.put(`/orders/${id}`,{status});

fetchOrders();

};


return(

<div style={{padding:"40px"}}>

<h1>Orders</h1>

{orders.map(order=>(

<div key={order._id} style={{border:"1px solid #333",padding:"20px",marginBottom:"20px"}}>

<p><b>Order ID:</b> {order._id}</p>

<p><b>Total:</b> ₹{order.totalPrice}</p>

<p><b>Status:</b> {order.status}</p>

<select onChange={(e)=>updateStatus(order._id,e.target.value)}>

<option>Processing</option>
<option>Shipped</option>
<option>Delivered</option>

</select>

</div>

))}

</div>

);

}

export default AdminOrders;