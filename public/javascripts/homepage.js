fetch("http://localhost:3000/readfiles")
    .then(res => res.json())
    .then(data => {
        if (document.getElementsByClassName("container")[0].innerHTML == "No task yet") {
            document.getElementsByClassName("container")[0].innerHTML = "";
        }
        data.forEach(eachobject => {
            let title = eachobject.title.slice(0, -4);
            let content = eachobject.content;
            document.getElementsByClassName("container")[0].innerHTML = document.getElementsByClassName("container")[0].innerHTML + `<div class="note">
            <p id="title" >${title}</p>
            <p id="note" >${content}</p>
        </div>`
        });
    })



document.getElementById("delete").addEventListener("click", () => {
    fetch(`http://localhost:3000/delete`)
        .then(res => res.json())
        .then((res) => {
            console.log(res);
        })
})