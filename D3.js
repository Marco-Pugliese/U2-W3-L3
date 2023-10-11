const row = document.getElementById("container");

const myLink = "https://striveschool-api.herokuapp.com/books";
fetch(myLink)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error while getting the data");
    }
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      let newdiv = row.appendChild(document.createElement("div"));
      newdiv.innerHTML = `<img src="${data[i].img}" class=" card-img-top" alt="data-img" />
     <div class="card-body d-flex flex-column justify-content-between">
     <h5 class="card-title flex-grow-1 my-2">${data[i].title}</h5>
     <p class="card-text text-end mt-4">
       ${data[i].price} $
     </p>
     <div class="d-flex justify-content-around align-items-center">
     <a href="#" class="btn btn-danger ">Scarta</a>
     <a href="#" class="btn btn-primary ">Add +</a></div>`;
      newdiv.classList.add("my-3");
      newdiv.classList.add("col-6");
      newdiv.classList.add("col-lg-3");
      newdiv.classList.add("d-flex");
      newdiv.classList.add("flex-column");
      newdiv.classList.add("ustify-content-between");
      const btn = document.querySelectorAll(".btn-danger");

      for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", (e) => {
          e.target.parentElement.parentElement.parentElement.classList.add(
            "d-none"
          );
        });
      }
    }
    let myList = [];
    const myKey = "myKey";
    const btnAdd = document.querySelectorAll(".btn-primary");
    const list = document.querySelector(".list-group");
    for (let i = 0; i < btnAdd.length; i++) {
      btnAdd[i].addEventListener("click", () => {
        let newLi = document.createElement("li");
        newLi.classList.add("list-group-item");
        list.appendChild(newLi).innerHTML = `
        <div class="d-flex justify-content-between align-items-center bg-light">
        <div>
        ${data[i].title} </div>
        <div>
        <a href="#" class="btn btn-danger remove">Scarta</a>
        </div>
        </div>
        `;

        myList.push(newLi.innerHTML);
        localStorage.setItem(myKey, JSON.stringify(myList));
        const removeLiBtn = document.querySelectorAll(".remove");
        for (let i = 0; i < removeLiBtn.length; i++) {
          removeLiBtn[i].addEventListener("click", (e) => {
            e.target.parentElement.parentElement.parentElement.classList.add(
              "d-none"
            );
          });
        }
      });
    }
    const load = () => {
      let storedList = JSON.parse(localStorage.getItem(myKey));
      for (let i = 0; i < storedList.length; i++) {
        const newLiLi = document.createElement("li");
        newLiLi.classList.add("text-black");
        newLiLi.innerHTML = storedList[i];
        list.appendChild(newLiLi);
        newLiLi.classList.add("list-group-item");
        const removeLiBtn = document.querySelectorAll(".remove");
        for (let i = 0; i < removeLiBtn.length; i++) {
          removeLiBtn[i].addEventListener("click", (e) => {
            e.target.parentElement.parentElement.parentElement.classList.add(
              "d-none"
            );
          });
        }
      }
    };
    load();
  })
  .catch((err) => {
    console.log(err);
  });
