const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

console.log(process.env.PORT)
console.log("teper tut")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("zdesya")

   const location = search.value
   messageOne.textContent = "Loading...";
   messageTwo.textContent = "";
  
   fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
        }
        else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
            
    })
    });
})