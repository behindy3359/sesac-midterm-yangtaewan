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
          <div class="delete-btn">X</div>
        </div>
      `
      todoList.insertAdjacentHTML('beforebegin', inserHtml);
      i= i+1;
    });
    
  })
}

function addTodo(){

}

document.querySelectorAll('.delete-btn').forEach(function(wrapper) {
  wrapper.addEventListener('click', function(e) {
      let targetE = e.target;
      console.log('3333');
  });
});