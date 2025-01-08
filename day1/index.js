/*
Grandpa has a Christmas wish list to keep track of all the gifts he wants to ask for. But there’s a problem: if he forgets he’s already added something, the list gets clogged up with duplicates. This happened last year, and he ended up with 8 talking picture frames on Christmas Day!

Your task is to complete the `checkDuplicate()` function 👇 to ensure no duplicates are added to the list. But here’s the tricky part: Grandpa sometimes hits the spacebar more than once, making it harder to spot duplicates.

For example, only one of these entries should be added to the list — the others should be flagged as duplicates:

- "talking picture frames"
- "talking  picture frames"
- "talking picture    frames"
- " talking picture frames "

**Your tasks:**
1. Ensure no duplicates can be added to the list.
2. Account for extra spaces at the beginning/end and between words.
 
**Stretch Goals:**
1. Case Sensitivity: Handle cases where capitalization differs. For example:
   - `"Cat Hammock"` should be flagged as a duplicate of `"cat hammock"`.
   - Preserve Grandpa’s original capitalization (e.g., if `"Cat Hammock"` is added first, that should be added to the list). Do not simply convert all entries to lower case - Grandpa might well want to capitalize some words. 

2. Additional Features: Add functionality to delete or edit items on the list.
*/

// Get references to DOM elements
const itemInput = document.getElementById('item-input')
const addItemButton = document.getElementById('add-item-button')
const shoppingList = document.getElementById('shopping-list')
const listArr = [];
const displayArr = [];

const editItem = (value) =>(`<input type="text" id="editItem" value=${value}>`);



// Function to check item is not duplicate
function checkDuplicate() {
    
    /* ⚠️ You need to add code to this function! ⚠️*/ 
    
    const itemText = itemInput.value;
    let newItemText = itemText.trim();
    
    if(listArr.includes(newItemText.toLowerCase())){
        alert("You already Have add this item");
    }
    else{
        listArr.push(itemText);
        displayArr.push(itemText);
        
        renderList();
        
    }
    
    
    
}

// Function to add an item to the shopping list
function renderList() {
    shoppingList.innerHTML = ''
    displayArr.forEach((gift, index) => {

        const listItems = document.createElement('div');
        listItems.classList.add('listItems');
        listItems.id = `listItems-${index}`;


        const listItem = document.createElement('li')
       

        listItem.id = `li-${index}`;
        listItem.classList.add(`listItem${index}`);
        console.log(listItem.id);
        listItem.textContent = gift
        
        const deleteButton = document.createElement('button')
        deleteButton.textContent = '❌'
        deleteButton.addEventListener('click', () => deleteItem(index))
        
        const editButton = document.createElement('button')
        editButton.textContent = '✏️';
        editButton.addEventListener('click', () => editText(index, listItem.id))
        
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('editingItem');
        buttonContainer.style.display = 'inline-block';
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        listItems.append(buttonContainer);
        listItems.append(listItem);
        

    
        shoppingList.appendChild(listItems);
    })
    itemInput.value = '' ;// Clear the input field
}

// Add event listener to button
addItemButton.addEventListener('click', checkDuplicate)

// Allow adding items by pressing Enter key
itemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkDuplicate()
    }
})


function deleteItem(index){
    listArr.splice(index,1);
    displayArr.splice(index,1);
    renderList();
}


function editText(index,id){
    let edit = document.getElementById(id);

    const listItems = document.createElement('div');
    listItems.classList.add('listItems');
    
    

    const agreement = document.createElement('button');
    agreement.textContent="✔️";
    agreement.addEventListener('click', () => updateText(index,edit));


    const disagreement = document.createElement('button');
    disagreement.textContent="❌";
    disagreement.addEventListener('click', () => renderList());



    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('editingItem');
    buttonContainer.style.display = 'inline-block';
    buttonContainer.appendChild(agreement);
    buttonContainer.appendChild(disagreement);


    edit.innerHTML=editItem(displayArr[index]);
    edit.appendChild(buttonContainer);
    
}


function updateText(index,edit){

    let newItemText = edit.querySelector('input').value;
    newItemText = newItemText.trim();


    if(listArr.includes(newItemText.toLowerCase())){
        alert("You already Have add this item");
    }
    else{
        displayArr[index] = newItemText;
        
        renderList();
        
    }
    
}
