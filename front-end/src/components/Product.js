import React,{useState, useEffect} from 'react'

import { Link } from 'react-router-dom';

export default function Product() {
    const [product, setProduct]=useState([]);    

    useEffect(()=>{
        getProduct();
    },[])

    const getProduct=async()=>{
      console.log(JSON.parse(localStorage.getItem('user')));

        let result=await fetch('http://localhost:5000/product',{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('auth'))}`
          }
        });
        result= await result.json();
        setProduct(result)
    }

const deletePro=async(id)=>{
  
  // const confirm('are you shure');

  let results= await fetch(`http://localhost:5000/product/${id}`,{
    method:'Delete'
  })
   results= await results.json();

   if(results){
    
    getProduct();
   }
}

const searchProduct=async(event)=>{

  if(event.target.value){
  let result= await fetch(`http://localhost:5000/search/${event.target.value}`);

  result = await result.json();
  setProduct(result);
  
  }else{
    getProduct();
  }
}

  return (
    <div className='center'>
      <input type="text" onChange={searchProduct}  placeholder="Search.."/>
        <table>
        <thead>
        <tr>
        <th>Sno.</th>
        <th>Product name</th>
        <th>copmany Name</th>
        <th>price</th>
        <th>Action</th>

        </tr>
        </thead>

     <tbody> 

{ product.length? product.map((item, index)=>
        <tr key={index}>
        <th>{index+1}.</th>
        <th>{item.productName}</th>
        <th>{item.company}</th>
        <th>{item.price}</th>
        <th><button onClick={()=>deletePro(item._id)}>Delete</button><Link to={"/update/"+item._id} >update</Link></th>

        </tr>)

:<tr key={1}>
<th><h1>no product found</h1></th></tr>}
</tbody>

        </table>
    </div>
  )
}
