let title;
let note;

document.getElementById("btn").addEventListener("click",()=>{  
    title = document.getElementById("title").value  
    note = document.getElementById("note").value  
    
    fetch("/createfile",{
        method:"Post",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
            "title":title,
            "note":note
        })
    })
})