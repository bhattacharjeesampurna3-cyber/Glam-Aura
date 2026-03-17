import { useEffect,useState } from "react";
import API from "../../utils/api";

function AdminDashboard(){

const [products,setProducts] = useState([]);

const [name,setName] = useState("");
const [price,setPrice] = useState("");
const [image,setImage] = useState("");
const [images,setImages] = useState("");
const [category,setCategory] = useState("");
const [stock,setStock] = useState("");
const [description,setDescription] = useState("");


const fetchProducts = async()=>{

const res = await API.get("/products");

setProducts(res.data);

};


useEffect(()=>{

fetchProducts();

},[]);


const addProduct = async()=>{

await API.post("/products",{

name,
price,
image,
images:images.split(","),
category,
stock,
description

});

alert("Product Added");

fetchProducts();

};


const deleteProduct = async(id)=>{

await API.delete(`/products/${id}`);

fetchProducts();

};


return(

<div style={{padding:"40px"}}>

<h1>Admin Panel</h1>


<div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>

<input placeholder="Product Name"
onChange={(e)=>setName(e.target.value)}/>

<input placeholder="Price"
onChange={(e)=>setPrice(e.target.value)}/>

<input placeholder="Main Image"
onChange={(e)=>setImage(e.target.value)}/>

<input placeholder="Gallery Images (comma separated)"
onChange={(e)=>setImages(e.target.value)}/>


<select onChange={(e)=>setCategory(e.target.value)}>

<option>Select Category</option>
<option value="beauty">Beauty</option>
<option value="fashion">Fashion</option>
<option value="luxury">Luxury</option>

</select>


<input placeholder="Stock"
onChange={(e)=>setStock(e.target.value)}/>

<input placeholder="Description"
onChange={(e)=>setDescription(e.target.value)}/>


<button onClick={addProduct}>Add Product</button>

</div>


<hr/>


{products.map((p)=>{

let status="In Stock";

if(p.stock<=0) status="Sold Out";
else if(p.stock<=5) status="Low Stock";

return(

<div key={p._id} style={{marginBottom:"20px"}}>

<b>{p.name}</b> - ₹{p.price} ({p.category})
| Stock: {p.stock} | {status}

<button onClick={()=>deleteProduct(p._id)}
style={{marginLeft:"10px"}}>

Delete

</button>

</div>

);

})}

</div>

);

}

export default AdminDashboard;