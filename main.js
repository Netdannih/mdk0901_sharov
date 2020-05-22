let todoControl = document.querySelector (".todo-control"),
todoList = document.querySelector (".todo-list"),
todoCompleted = document.querySelector (".todo-completed"),
todoContainer = document.querySelector (".todo-container");

let obj = JSON.parse(localStorage.getItem("obj"));
obj = obj==null?[]: obj;

const render = () =>{
    todoList.textContent="";
    todoCompleted.textContent="";
    
    if (obj){
        obj.forEach((el) =>{
            const li = document.createElement("li");
            li.classList.add("todo-item");
            li.innerHTML = `<span class="text-todo">${el.value}</span>
            <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
            </div>`;
            if (el.completed) todoCompleted.append(li);
            else todoList.append(li);
        });
        localStorage.obj=JSON.stringify(obj);
    }
};
render();

todoControl.addEventListener("submit", (event) =>{
    event.preventDefault();
    let input = todoControl.querySelector("input");
    if (input.value!=""){
        newObj = {value: input.value, completed: false}
        input.value="";
        obj.push(newObj);
        render();
    }else{
        alert("Введите текст!");
    };
} );

const search = (elem) =>{
    let elemText = elem.querySelector("span").textContent,
    elemCompleted = todoCompleted.contains(elem);
    obj.forEach((el, index) =>{
        if(el.value === elemText) {
            if (el.completed === elemCompleted) ind = index;
        }
    })
    return ind;
}

todoContainer.addEventListener("click", (event) =>{
    event.preventDefault();
    let target = event.target;
    if(!target.matches("button")) return;
    let index = search(target.closest("li"));
    if (target.matches(".todo-remove")){
        delete obj[index];
    }else if (target.matches(".todo-complete")){
        obj[index].completed=obj[index].completed==true?false:true;
    };
    render();
});
