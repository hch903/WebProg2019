// get element
const input = document.getElementById("todo-app__input");
const count = document.getElementsByClassName("todo-app__total");
const view_buttons = document.getElementsByTagName("li")
var id = 0;
var cnt = 0;
var todo_list_array = [];

input.addEventListener("keypress", event => {
    if(event.keyCode == 13 && event.target.value !== "")
    {
        // 若沒有todo thing, 新增ul element
        if(id === 0)
            create_ul();
        create_todo(id, event.target.value);
        // id,cnt加一
        id = id + 1;
        cnt = cnt + 1;

        // 清空input box的文字
        event.target.value = "";

        // 改變計數器
        count[0].innerHTML = cnt + " left";
    }
});

// buttons' function
view_buttons[0].onclick = "select_all";
view_buttons[1].onclick = "select_active";
view_buttons[2].onclick = "select_completed";

function create_ul() {
    // 新增todo的ul節點
    const ul_Node = document.createElement("ul");
    
    // get root element
    const footer = document.getElementById("todo-footer");

    // 設定節點的attribute
    ul_Node.setAttribute("id", "todo-list");
    ul_Node.setAttribute("class", "todo-app__list");

    // 插入ul至input後面
    root.insertBefore(ul_Node, footer);
};

function create_todo(id, text) {
    // 新增todo的li,div,input,h1,img節點
    const itemNode = document.createElement("li");
    const wrapper = document.createElement("div");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const itemName = document.createElement("h1");
    const img = document.createElement("img");

    // 設定節點的attribute
    itemNode.setAttribute("class", "todo-app__item");
    itemNode.setAttribute("id", id);
    wrapper.setAttribute("class", "todo-app__checkbox");
    checkbox.setAttribute("id", id);
    checkbox.setAttribute("type", "checkbox");
    label.setAttribute("for", id);
    itemName.setAttribute("class", "todo-app__item-detail");
    img.setAttribute("class", "todo-app__item-x");
    itemName.innerHTML = text;
    img.src = "./img/x.png";
    
    // 刪除todo的function
    img.onclick = function(){
        delete_node(id);
    };
    
    // 勾選完成todo的function
    label.onclick = function() {
        change_status(id);
    }
    
    // 新增checkbox及label到wrapper中
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    
    // 新增wrapper及itemName到itemNode中
    itemNode.appendChild(wrapper);
    itemNode.appendChild(itemName);
    itemNode.appendChild(img);

    // 新增newItem object
    let newItem = {
        node: itemNode, 
        isComplete: false
    };

    // 將newItem放入todo_list_array中
    todo_list_array.push(newItem);

    // get ul element
    let ul = document.getElementById("todo-list");

    // 新增itemNode到ul中
    ul.appendChild(itemNode);
};

function delete_node(id) {
    // get itemNode, ul element
    const removeNode = document.getElementById(id);
    const ul = document.getElementById("todo-list");

    // 從ul中移除
    ul.removeChild(removeNode);

    // 從todo_list_array中移除
    let minus_one = true;
    for(let i = 0; i <= todo_list_array.length; i++)
    {
        if(todo_list_array[i].node.innerHTML === removeNode.innerHTML)
        {
            if(todo_list_array[i].isComplete == true)
                minus_one = false;
            todo_list_array.splice(i, 1);
            break;
        }
    }
    
    // 改變計數器
    if(minus_one === true){
        cnt = cnt - 1;
        count[0].innerHTML = cnt + " left";
    }
};

function change_status(id) {
    // get completed todo element
    const completeNode = document.getElementById(id);

    // 改變complete狀態
    for(let i = 0; i <= todo_list_array.length; i++)
    {
        if(todo_list_array[i].node.innerHTML === completeNode.innerHTML)
        {
            if(todo_list_array[i].isComplete === true)
                todo_list_array[i].isComplete = false;
            else
                todo_list_array[i].isComplete = true;
            break;
        }
    }

    // 改變input的checked value
    const input_tag = completeNode.getElementsByTagName("input");
    if(input_tag[0].checked === false)
    {
        input_tag[0].setAttribute("checked", "true");
        // 改變text的style
        completeNode.style["textDecoration"] = "line-through";
        completeNode.style["opacity"] = 0.5;
        
        // 改變計數器
        cnt = cnt - 1;
        count[0].innerHTML = cnt + " left";
    }
    else
    {
        // 移除checked, style
        input_tag[0].removeAttribute("checked");
        completeNode.removeAttribute("style");

        // 改變計數器
        cnt = cnt + 1;
        count[0].innerHTML = cnt + " left";
    }   
}

function select_all() {
    
}