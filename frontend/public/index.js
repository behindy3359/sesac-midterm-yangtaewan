console.log('1');







let pagestate=0;
const todoList = document.querySelector('.todo-list');

document.addEventListener('DOMContentLoaded',()=>{
  getTodos();
});

function getTodos(){
  axios({
    method :'get',
    url: 'https://jsonplaceholder.typicode.com/todos',
  }).then((res)=>{
    
    const todoPage = res.data.slice(0,10);
    console.log(todoPage);
    todoPage.forEach(element => {
      let i = 0;
      const inserHtml = 
      `
        <div class="todo-list-element" id="todo-list-element${element.id}">
          <input type="checkbox" name="${element.id}th-content" id="content-${element.id}">
          <label for="${element.id}th-content">${element.title}</label>
          <div class="delete-btn" id="delete${element.id}">X</div>
        </div>
      `
      todoList.insertAdjacentHTML('afterbegin', inserHtml);
      i= i+1;
    });
  })
}

document.querySelector('.search-btn').addEventListener('click', async ()=>{
  addTodo();
})

document.querySelector('.search-input').addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

async function addTodo(){

  let searchText = document.querySelector('.search-input').value;
  if ( searchText==='' || !searchText) {
    return alert('빈 값이 입력될 수 없습니다.');
  }

  document.querySelector('.todo-list').innerHTML = '';
  document.querySelector('.search-input').value = '';
  
  await axios({
    method:'get',
    url: 'https://jsonplaceholder.typicode.com/todos',
  }).then((res)=>{
    let selectList = [];
    for(let i=0 ; i < 10 ; i++){
      selectList.push(Math.floor(Math.random() * 200 + 1));
    }
    selectList.forEach( element =>{
      console.log();
      const inserHtml = 
      `
        <div class="todo-list-element" id="todo-list-element${res.data[element].id}">
          <label for="${res.data[element].id}th-content">${res.data[element].title}</label>
          <input class="check-box" type="checkbox" name="${res.data[element].id}th-content">
          <button="delete${res.data[element].id}" class="delete-btn">X</button>
        </div>
      `
      todoList.insertAdjacentHTML('afterbegin', inserHtml);
    })
    
  })
}

document.querySelectorAll('.delete-btn').forEach((element)=>{
  element.addEventListener('click', function(e) {
      let targetE = e.target;
      let reqId = e.target.id;
      console.log('44124124');

  });
});




// document.querySelector(".delete-btn").addEventListener("click", function (e) {
//     // 삭제 버튼 클릭 처리
//       console.log("리뷰가 삭제되었습니다.");

//     if (e.target.closest(".delete-btn")) {
//       const reviewId = e.target
//         .closest(".delete-btn")
//         .getAttribute("id")
//         .replace("delete", "");
//     }
//   })

// function myEventListener(event) {
//   const clickedElement = event.target; // 클릭한 요소 가져오기
//   // 클릭한 요소에 대한 처리
// }