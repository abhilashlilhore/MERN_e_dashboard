import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');

        if(auth){
            navigate('/');
        }

    })

    const [email, setName] = useState('');
    const [password, setPass] = useState('');

   

    const loginthis = async () => {
        console.log(email, password)

        const result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email,password }),
            headers: { 'Content-Type': 'application/json' },
          });

       let result1 =await result.json();

        console.log(result1);
        if(result1.name){
            localStorage.setItem('user',JSON.stringify(result1))
            navigate('/add');
        }else{
            alert('email or password is wrong');
        }


    }


    return (
        <div className='signup' >
            <div className='signup2'>
                <input name="" value={email} placeholder='Enter email' onChange={(e) => setName(e.target.value)} /><br /><br />
                <input type="" value={password} name="passowrd" placeholder='Enter password' onChange={(e) => setPass(e.target.value)} /><br />
                <button onClick={loginthis}>Login</button>
                <br />
            </div>
        </div>

    )
}

export default Login;