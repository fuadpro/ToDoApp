let todoapp = document.getElementById('todoapp')
let addButton = document.getElementById('addButton')
let clearButton = document.getElementById('clear')
let count = document.getElementById('count')
let input = document.getElementById('inputTxt')
let ul = document.getElementById('myList')
let html = '';
let editedIndex = -1;
let list = JSON.parse(localStorage.getItem('list'))?.length ? JSON.parse(localStorage.getItem('list')) : []
let inputText;
    
    todoapp.style.background = "#057368"

    input.addEventListener('keyup' , (e)=>{
        inputText = e.target.value
        if(inputText.trim()){
            input.classList.remove('is-invalid')
        }else{
            input.classList.add('is-invalid')
        }
    })
    addButton.addEventListener('click' , (e)=>{
        if(inputText && inputText.trim()){
            if(editedIndex !== -1){
                list[editedIndex] = inputText
                editedIndex = -1;
                addButton.innerHTML = 'Add';
                localStorage.setItem('list' , JSON.stringify(list))
            }else{
                input.classList.remove('is-invalid')
                list.push(inputText)
                localStorage.setItem('list' , JSON.stringify(list))
            }
            input.value = ''
            inputText = ''
            getData()
        }else{
            input.classList.add('is-invalid')
        }
    })
    clearButton.addEventListener('click' , ()=>{
        list = []
        localStorage.setItem('list', JSON.stringify(list))
        getData()
    })
    const deleteItem = (index) => {
        if(input.value==''){
            list.splice(index, 1);
            localStorage.setItem('list', JSON.stringify(list));
            getData()
        }
    }
    const edit = (index) => {
        if(editedIndex !== index && editedIndex !== -1){
            document.getElementById(`button-${editedIndex}`).removeAttribute('disabled')
        }
        editedIndex = index
        if(index !== -1){
            document.getElementById(`button-${index}`).setAttribute('disabled' , true)
            addButton.innerHTML = 'Save'
            input.value = list[index]
        }
        localStorage.setItem('list', JSON.stringify(list));
    };
    const getData = () =>{
        html = ''
        count.innerHTML = `${list?.length} tasks added`
        list.map((todo , index) => {
        html += `<li class="list-group-item mb-1 d-flex align-items-center justify-content-between">
                    ${todo}
                    <div class="d-flex">
                        <button onclick="edit(${index})" type="button" class="btn text-white btn-warning me-1">Edit</button>
                        <button onclick="deleteItem(${index})" type="button" id=button-${index} class="btn btn-danger">Delete</button>
                    </div>
                </li>`
        })
        ul.innerHTML = html
    }
    getData();
       


