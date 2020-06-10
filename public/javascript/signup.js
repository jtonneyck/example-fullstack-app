let $errorMessage = document.querySelector(".error-message");
let $usernameInput = document.querySelector("#username");

$usernameInput.addEventListener("blur", (event)=> {
    let username = event.target.value;
    axios.get(`http://localhost:3000/users/username-available/${username}`)
        .then((response)=> {
            if(response.data.available) {
                $errorMessage.style.display = "none";
            }else {
                $errorMessage.style.display = "block";
            }
        })
        .catch((error)=> {
            // handle error on page
        })
});