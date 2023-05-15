import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
const UpdateProduct = () => {
    const [productName,setproductName]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    const [price,setPrice]=useState("");
    const[error,setError]=useState(false);
    const newrout=useNavigate()
    const allparams=useParams();

        

    useEffect(()=>{
        getProduct();
    },[])

    const getProduct=async()=>{
        let result=await fetch(`http://localhost:5000/product/${allparams.id}`);
        result= await result.json();
        setPrice(result.price);
        setproductName(result.productName);
        setCategory(result.category);
        setCompany(result.company);
        
    }
   
    const foruserid =JSON.parse(localStorage.getItem('user'));

    const userid=foruserid._id;
   const updateProducts=async()=>{
    console.log(productName,category,company,price);

    if(!productName||!category||!company||!price){
        setError(true);
        return false;
    }
    

    // return false;


    const result= await fetch(`http://localhost:5000/product/${allparams.id}`,{
        method:'put',
        body:JSON.stringify({productName,category,company,price}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const result1= await result.json();
    console.log(result1);
    if(result1){
        newrout('/product');
    }
   }
    return (
        <div className="signup">
            <div className='signup2'>
          
                <input value={productName} placeholder="Name of product" onChange={(e)=>setproductName(e.target.value)} /><br />
                {error && !productName && <small className="error">Enter product name</small>}
                <input  value={company} placeholder="companyName" onChange={(e)=>setCompany(e.target.value)} /><br />
                {error && !company && <small className="error">Enter company name</small>}
                <input value={category} placeholder="category" onChange={(e)=>setCategory(e.target.value)} /><br />
                {error && !category && <small className="error">Enter category name</small>}
                <input value={price} placeholder="price" onChange={(e)=>setPrice(e.target.value)} /><br />
                {error && !price &&<small className="error">Enter price </small>}
                
                <button onClick={updateProducts}>Update Product </button>
            </div>
        </div>
    )
}
export default UpdateProduct;