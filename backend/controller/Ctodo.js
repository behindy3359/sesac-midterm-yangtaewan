const db = require('../models/index');

const { Op, where } = require('sequelize'); // sequelize Operator(연산자)

exports.todoGet = async (req, res)=>{
  try{ 
    const result= await db.Todo.findAll();
    
    if(result){
      return res.status(200).send({result});  
    }
  }
  catch(err){
    return res.status(500).send({"message": "Internal Server Error"});
  }
}
exports.todoPost = async (req, res)=>{
  try{
    const titleReq =req.body.title ; 
    const doneReq = req.body.done || false;
    if (!titleReq) {
      return res.status(500).send({"message": "Internal Server Error"});
    }
    const result = await db.Todo.create({
      title : titleReq,
      done : doneReq,
    })
    if (result) {
      return res.status(200).send({result});
    }
  }
  catch(err){
    return res.status(500).send({"message": "Internal Server Error"});
  }
}


exports.todoGetById = async (req, res)=>{
  try{
    const id = req.params.id;

    const result = await db.Todo.findOne({
      where: { id }
    })

    if (result) {
      return res.status(200).send({result});
    }else{
      return res.status(404).send({"message": "Todo not found"});
    }

  }
  catch(err){
    return res.status(500).send({"message": "Internal Server Error"});
  }
  
}
exports.todoPatch = async (req, res)=>{
  try{
    const id = req.params.id;
    const title = req.body.title;
    const done = req.body.done;
    
    const result = await db.Todo.findOne({
      where: { id }
    });

    if (!result) {
      return res.status(404).send({"message": "Todo not found"})
    }
    
    await result.update({title, done});

    return res.status(200).send({result});
  }
  catch(err){
    return res.status(500).send({"message": "Internal Server Error"});
  }
}
exports.todoDelete = async (req, res)=>{
  try{
    const id = req.params.id; 
    const result = await db.Todo.destroy({
      where: { id },
    });

    if (result) {
      return res.status(200).send({"message": "Todo deleted successfully","deletedId": "1"})
    }else{
      return res.status(404).send({"message": "Todo not found"});
    }
  }
  catch(err){
    return res.status(500).send({"message": "Internal Server Error"});
  }
}
