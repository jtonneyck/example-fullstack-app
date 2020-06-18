function createError(error){
    
    let $div = document.createElement("div");
    $div.setAttribute("class", "dynamic-error");

    $div.innerHTML = `<h3>${error.message}</h3>`;
    document.body.appendChild($div);

    setTimeout(()=> {
        document.body.removeChild($div);
    },2500)
}