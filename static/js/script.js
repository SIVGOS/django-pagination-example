function setText(){
    document.getElementById('output').innerText = document.getElementById('input').value;
    document.getElementById('display').hidden = false;
}

document.getElementById('button1').addEventListener('click', setText);