const db = require('../models/index');


/**
 * ### Todo 전체 조회
 */
exports.todoGet = async (req, res)=>{
  try{ 
    const result= await db.Todo.findAll();
    
    if(result){
      return res.status(200).send({result});  
    }
  }
  catch(err){
    return res.status(500).send({ 
      "message" : "Internal Server Error"
    });
  }
}
/**
 * id 하나에 대해서 todo 조회하기!
 * ### 특정 ID를 갖는 Todo 조회 (case1. 존재하는 Todo ID로 조회하는 경우)
 * ### 특정 ID를 갖는 Todo 조회 (case2. 존재하지 않는 Todo ID로 조회하는 경우)
 */
exports.todoGetById = async (req, res)=>{
  try{
    const id = req.params.id;

    const result = await db.Todo.findOne({
      where: { id }
    })

    if (result) {
      return res.status(200).send({result});
    }else{
      return res.status(404).send({ 
        "message" : "Todo not found"
      });
    }

  }
  catch(err){
    return res.status(500).send({
      "message" : "Internal Server Error"
    });
  }
  
}
/**
 * todo 추가하기
 * ### Todo 추가 (case1. 요청 본문에 title, done 필드 모두 작성하는 경우)
 * ### Todo 추가 (case2. 요청 본문에 title 필드만 작성하는 경우)
 * ### Todo 추가 (case3. 요청 본문에 done 필드만 작성하는 경우)
 * 
 */
exports.todoPost = async (req, res)=>{
  try{
    const titleReq =req.body.title ; 
    const doneReq = req.body.done || false;
    
    // 요청에 todo의 제목이 담기지 않은 경우!!
    if (!titleReq) {
      return res.status(500).send({
        "message" : "Internal Server Error"
      });
    }
    // DB에 작업하기
    const result = await db.Todo.create({
      title : titleReq,
      done : doneReq,
    })
    
    if (result) {
      return res.status(200).send({result});
    }
  }
  catch(err){
    return res.status(500).send({
      "message" : "Internal Server Error"
    });
  }
}


/**
 * todo 수정하기!!
 * ### 특정 ID를 갖는 Todo 수정 (case1. 존재하는 Todo ID로 수정하는 경우)
 * ### 특정 ID를 갖는 Todo 수정 (case2. 존재하지 않는 Todo ID로 수정하는 경우)
 */
exports.todoPatch = async (req, res)=>{
  try{
    const id = req.params.id;
    const title = req.body.title;
    const done = req.body.done;
    
    const result = await db.Todo.findOne({
      where: { id }
    });

    if (!result) {
      return res.status(404).send({
        "message" : "Todo not found"
      })
    }
    
    await result.update({title, done});

    return res.status(200).send({result});
  }
  catch(err){
    return res.status(500).send({
      "message" : "Internal Server Error"
    });
  }
}

/**
 * 삭제하기!!
 * ### 특정 ID를 갖는 Todo 삭제 (case1. 존재하는 Todo ID로 삭제하는 경우)
 * ### 특정 ID를 갖는 Todo 삭제 (case2. 존재하지 않는 Todo ID로 삭제하는 경우)
 */
exports.todoDelete = async (req, res)=>{
  try{
    const id = req.params.id; 
    const result = await db.Todo.destroy({
      where: { id },
    });

    if (result) {
      return res.status(200).send({ 
        "message" : "Todo deleted successfully",
        "deletedId" : "1"
      })
    }else{
      return res.status(404).send({
        "message" : "Todo not found" 
      });
    }
  }
  catch(err){
    return res.status(500).send({ 
      "message" : "Internal Server Error" 
    });
  }
}
