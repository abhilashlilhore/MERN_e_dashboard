import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function SignUp() {



  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errmsg, setErrmsg]=useState("");
  const navidate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navidate('/');
    }
  })
  const collectData = async () => {
    // console.warn(name,email,password);
    const result = await fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const resfinla = await result.json();
    console.log(resfinla);
    // alert(resfinla.result._id);
    if (resfinla.result._id) {
      localStorage.setItem("user", JSON.stringify(resfinla));
      // setErrmsg(resfinla.result);
      const goto=()=>{
        navidate('/product');
       }
      setTimeout(goto,3000);
      
    }else{
      alert('error');
      setErrmsg(resfinla.result);
    }
  }
  return (
    <div className='signup'>
      <div className='signup2'>
        <h1>SignUp</h1>
        <input placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} /><br />
        <input placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <input placeholder='Enter Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <span className='errormsg'>{errmsg}</span>
        <button onClick={collectData}> Sign-Up</button>
        
      </div>

    </div>
  )
}
