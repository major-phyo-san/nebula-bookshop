function addNewCategory() {
    csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    action = document.getElementById('add-category').getAttribute('action');     
    
    nameValue = document.getElementById('name').value;      
    descriptionValue = document.getElementById('description').value;
    
    params = {
        name: nameValue,
        description: descriptionValue
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