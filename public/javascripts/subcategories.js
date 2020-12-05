function addNewCategory() {
    csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    action = document.getElementById('add-category').getAttribute('action');     
    
    nameValue = document.getElementById('name').value;      
    descriptionValue = document.getElementById('description').value;

    catIdSelectBox = document.getElementById('select-cat-id');
    var opt;
    for(var i=0, len = catIdSelectBox.options.length; i<len; i++){
        opt = catIdSelectBox.options[i];
        if(opt.selected === true){
            break;
        }
    }

    catIdValue = opt.value;
    
    params = {
        name: nameValue,
        description: descriptionValue,
        catId: catIdValue
    }

    params = new URLSearchParams(params).toString();   
    
    var req = new XMLHttpRequest();
    req.open('POST', action);
    req.setRequestHeader('x-csrf-token', csrfToken);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.onload = function () {
        if (req.status == 200) {            
            alert(req.responseText);
        }
        else {
            alert('fail');
        }
    }
    
    req.send(params);
}

// function retrieveSubcategories(){
//     csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

//     catIdSelectBox = document.getElementById('select-cat-id');
//     var opt;
//     for(var i=0, len = catIdSelectBox.options.length; i<len; i++){
//         opt = catIdSelectBox.options[i];
//         if(opt.selected === true){
//             break;
//         }
//     }
//     catIdValue = opt.value;

//     var action = '/categories/' + catIdValue + '/subcategories';
//     var req = new XMLHttpRequest();
//     req.open('GET', action);
//     req.setRequestHeader('x-csrf-token', csrfToken);
//     req.onload = function () {
//         if (req.status == 200) {            
//             alert(req.responseText);
//         }
//         else {
//             alert('fail');
//         }
//     }
    
//     req.send();
// }