const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
let todos = [];
let id = 100;

GetToJson();

function todo({ text, id, checked }) {
  return `
    <li class="list-group-item">
        <input type="checkbox" class="form-check-input me-2" id="${id}" ${checked ? 'checked' : ''} onclick = "checkTodo(${id})" />
        <label for="${id}"><span class="${checked ? 'text-decoration-line-through text-success' : ''}" >${text}</span></label>
        <button onclick="deleteTodo(${id})"class="btn btn-danger btn-sm float-end">delete</button>
    </li>
  `
}
function newTodo() {
  //alert('New TODO button clicked!')
  let text = prompt('enter todo');
  // list.insertAdjacentHTML("beforeend", todo(text));
  // updateCounter()
  let todo = { id: id++, text, checked: false };
  todos.push(todo);
  SetToJson();
  render();
  console.log(todos);

}

function render() {
  list.innerHTML = todos.map(todoObj => todo(todoObj)).join('');
  updateCounter();
}


document.addEventListener("click", function (e) {
  if (e.target.tagName == "INPUT") {
    updateCounter();
  }
})

function updateCounter() {
  const checkbox = list.querySelectorAll("input[type='checkbox']");
  for (let i = 0; i < checkbox.length; i++) {
    const id = parseInt(checkbox[i].id);
    const todoI = todos.find(t => t.id == id);
    if (todoI) {
      todoI.checked = checkbox[i].checked;
    }
  }
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  SetToJson();
  render();
}

function checkTodo(id) {
  const todoI = todos.find(todo => todo.id == id);
  if (todoI) {
    todoI.checked = !todoI.checked;
  }
  SetToJson();
  render();
}
// function updateCounter()
// {
//   itemCountSpan.textContent = list.children.length;
//   uncheckedCountSpan.textContent = [...list.children]
//   .map(item => item.firstElementChild)
//   .filter(el => !el.checked).length;
// }
function SetToJson()
{
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("id", id.toString());
}
function GetToJson()
{
  const getTodos = localStorage.getItem('todos');
  const getId = localStorage.getItem('id');
  if(getTodos)
  {
    todos = JSON.parse(getTodos);
  }
  if(getId)
  {
    id = parseInt(getId);
  }
  render();
}


