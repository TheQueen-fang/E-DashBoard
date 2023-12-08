const express = require('express');
require('./db/config.js');
const cors = require('cors');
const User = require('./db/User.js');
const Product = require('./db/Product.js');
const JWT = require('jsonwebtoken');
const jwtKey = 'e-comm';
const app = express();

app.use(express.json());
app.use(cors());
app.post('/register', async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  JWT.sign({ result }, jwtKey, { expiresIn: '5000h' }, (err, token) => {
        if (err) {
          res.send({ result: 'something went wrong !' });
        }
        res.send({result, auth: token }); 
      })
});

app.post('/login', async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select('-password');
    if (user) {
      JWT.sign({ user }, jwtKey, { expiresIn: '5000h' }, (err, token) => {
        if (err) {
          resp.send({ result: 'something went wrong !' });
        }
        resp.send({ user, auth: token }); 
      })
    //  resp.send(user);
    } else {
      resp.send({ result: "No user found" });
    }
  } else {
    resp.send({ result: "Plz... Enter email and password !" });
  }
});

app.post('/addProduct',verifyToken ,async(req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get('/products', verifyToken,async (req, resp) => {
  let products = await Product.find();

  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ resut: "No result Found" });
  }
});

app.delete('/product/:id',verifyToken, async(req,resp) => {
  // resp.send(req.params.id);
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
})

app.get('/product/:id', verifyToken,async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  console.log(result);
  if (result) {
    //console.log(result)
    resp.send(result);
  } else {
    resp.send({ result: "No record Found" });
  }
});

app.put('/product/:id',verifyToken, async (req, resp) => {
  let result = await Product.updateOne({ _id: req.params.id }, {
    $set: req.body
  });
  resp.send(result);
});
app.get('/search/:key', verifyToken,async (req, resp) => {
  let result = await Product.find({
    "$or": [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } }
    ]
  });
  resp.send(result)
});

function verifyToken(req, resp, next) {
  let token = req.headers['authorization'];
  if (token) {
    token = token.split(' ')[1];

    JWT.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({result:'Plzz.. provide valid token  !'});
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({result:'Plzz.. add token with Header !'});
  }
  next();
}

app.listen(5000);
