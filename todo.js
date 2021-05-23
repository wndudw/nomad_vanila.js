const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

//할일을 생성했을 때 담아줄 배열 선언
let toDos = [];

// function filterFn(toDo){
//     return toDo.id === 1
// }

//할일 리스트 삭제
function deleteToDo(event){
   // console.log(event.target);
    const btn = event.target;
    // console.log(event.target.parentNode);
    const li = btn.parentNode;
    //제거할 <li>를 삭제 
    toDoList.removeChild(li);
    //filter : toDos의 배열안에 조건을 만족하는 결과를 새로운 배열로 만들어줌.
    const cleanToDos = toDos.filter(function(todo){
        //console.log(toDo.id, li.id);
        // !!클릭된 것(todo.id)를 제외한 나머지 것들만 남도록하기 위해 !== 를 함. 다시 배열에 담아야하기 때문에...!!
        return todo.id !== parseInt(li.id);
    });
    //console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
}

//배열 toDos를 가져와서 로컬에 저장하는 함수 
function saveToDos(){
    /*local storage는 value값에 string으로 저장되기 때문에 
      object(객체)를 String으로 수정해줘야한다.  => JSON.stringify()
    */
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText="❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);   
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    //Array toDos의 값에 toDoObj를 넣는다.
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        //console.log(loadedToDos);
        //String으로 변환한것을 다시 Object로 변환해야함.
        const parsedToDos = JSON.parse(loadedToDos);
       // console.log(parsedToDos);
       //forEach : array에 담겨있는 것들을 각각 한번씩 실행해주는것.
       parsedToDos.forEach(function(toDo){
          //console.log(toDo.text);
          paintToDo(toDo.text);
       })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();