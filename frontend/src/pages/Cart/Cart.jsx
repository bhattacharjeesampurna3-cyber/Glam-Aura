import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();
  const [cart,setCart] = useState([]);

  useEffect(()=>{

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // normalize qty field
    const fixedCart = storedCart.map(item=>({
      ...item,
      qty: item.qty || item.quantity || 1
    }));

    setCart(fixedCart);

    localStorage.setItem("cart",JSON.stringify(fixedCart));

  },[]);


  const updateQty = (index,change)=>{

    const updatedCart = [...cart];

    updatedCart[index].qty += change;

    if(updatedCart[index].qty < 1){
      updatedCart[index].qty = 1;
    }

    setCart(updatedCart);

    localStorage.setItem("cart",JSON.stringify(updatedCart));

  };


  const removeItem = (index)=>{

    const updatedCart = [...cart];

    updatedCart.splice(index,1);

    setCart(updatedCart);

    localStorage.setItem("cart",JSON.stringify(updatedCart));

  };


  // FIXED TOTAL CALCULATION
  const total = cart.reduce((acc,item)=>{

    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;

    return acc + price * qty;

  },0);


  return(

    <div style={{padding:"40px"}}>

      <h1>Cart</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item,index)=>{

        return(

          <div key={index}
            style={{
              display:"flex",
              gap:"20px",
              marginBottom:"20px",
              alignItems:"center"
            }}
          >

            <img
              src={item.image}
              alt={item.name}
              style={{width:"120px"}}
            />

            <div>

              <h3>{item.name}</h3>

              <p>₹{item.price}</p>

              <div style={{display:"flex",gap:"10px",marginTop:"10px"}}>

                <button onClick={()=>updateQty(index,-1)}>
                  -
                </button>

                <span>{item.qty}</span>

                <button onClick={()=>updateQty(index,1)}>
                  +
                </button>

              </div>

              <button
                style={{marginTop:"10px"}}
                onClick={()=>removeItem(index)}
              >
                Remove
              </button>

            </div>

          </div>

        )

      })}


      <h2 style={{marginTop:"40px"}}>
        Total: ₹{total}
      </h2>


      <button
        style={{marginTop:"20px"}}
        onClick={()=>navigate("/checkout")}
      >
        Buy Now
      </button>

    </div>

  )

}

export default Cart;