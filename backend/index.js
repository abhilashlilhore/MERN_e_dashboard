const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const app = express();
const jwt = require('jsonwebtoken');

const jwtkey='e-com';

app.use(express.json());
app.use(cors());

app.post('/addProduct', async (req, resp) => {
    const product = new Product(req.body)
    let result = await product.save();
    result = result.toObject();
    resp.send(result);
})


app.post('/register', async (req, resp) => {

    if (req.body.name && req.body.email && req.body.password ) {
        // let checkEmail = await User.findOne(req.body.email)
        // checkEmail = checkEmail.toObject();

        // resp.send(checkEmail);
        // return false;

        // if (checkEmail) {

        //     let result = { "result": "this email is allready in use" }
        //     resp.send(result);
        // } else {

            let user = new User(req.body);
            let result = await user.save();
            result = result.toObject();
           
            delete result.password;
            // resp.send(result);

            // jwt.sign({result},jwtkey,{expiresIn:"2h"},(error,token)=>{

            //     if(error){
            //         resp.send('sumthing went wrong in jwt token');
            //     }else{
            //     resp.send({result,auth:token});
            //     }

                resp.send({result});
            // })
        // }
    } else {
        let result = { "result": "all fields required" }
        resp.send(req.body);
    }
});

app.post('/login', async (req, resp) => {

    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            jwt.sign({user},jwtkey,{expiresIn:"2h"},(error,token)=>{

                if(error){
                    resp.send('sumthing went wrong in jwt token');
                }else{
                resp.send({user,auth:token});
                }
            })
            
        } else {
            resp.send({ result: 'user not found' })
        }
    } else {
        resp.send({ result: 'sumthing went wrong' });
    }
});

app.get('/product',async (req, resp)=>{

    let  products= await Product.find();

    if(products.length>0){
        resp.send(products);
    }else{
        resp.send('no product found');
    }
})

app.delete("/product/:id",verifytoken,async(req,resp)=>{

     let result = await Product.deleteOne({_id:req.params.id})

     resp.send(result);
} )

app.get("/product/:id",verifytoken,async(req,resp)=>{

    let result = await Product.findOne({_id:req.params.id})

    resp.send(result);
})
app.put('/product/:id',verifytoken,async(req,resp)=>{
    let result = await Product.updateOne({_id:req.params.id},
        {
            $set:req.body
        })

    resp.send(result);
})

app.get('/search/:key',verifytoken,async(req,resp)=>{
    let reqult=await Product.find({ 
        '$or':[
            {productName:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {price:{$regex:req.params.key}}
        ]
    })

    resp.send(reqult);
});

function verifytoken(req,resp,next){
    let token=req.headers['authorization'];
    if(token){
        token=token.split(" ")[1];
        jwt.verify(token,jwtkey,(err,valid)=>{

            if(err){
                resp.send('not a valied token');

            }else{
                next();
            }
        })
    }else{
resp.send('no token found');
    }
    console.log(token);
    
}




app.listen(5000)