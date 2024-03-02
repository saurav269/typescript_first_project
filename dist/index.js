"use strict";
// console.log("Hello world")
const getUserName = document.getElementById("user");
const formSubmit = document.querySelector("#form");
const main_container = document.querySelector(".main_container");
//REUSEABLE FUNCTION
const myFunctionPromise = async (url, option) => {
    const res = await fetch(url, option);
    if (!res.ok) {
        throw new Error(`Error is api call ${res.status}`);
    }
    else {
        const data = await res.json();
        console.log(data);
        return data;
    }
};
const showResult = (singleUser) => {
    const { avatar_url, url, login } = singleUser;
    main_container.insertAdjacentHTML('beforeend', `<div class='card'>
      <img src=${avatar_url} alt=${login}  />
      <hr />
      <div class='card-footer'>
      <img src="${avatar_url}" alt="${login}" />
      <a href="${url}">Github</a>
      </div>
      </div>
      `);
};
const fetchData = (url) => {
    myFunctionPromise(url, {}).then((userInfo) => {
        for (const singleUser of userInfo) {
            showResult(singleUser);
        }
    });
};
//Default func calling
fetchData("https://api.github.com/users");
//SEARCH FUNCTION
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = getUserName.value.toLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allUserData = await myFunctionPromise(url, {});
        const matchingUser = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        main_container.innerHTML = "";
        if (matchingUser.length === 0) {
            main_container.insertAdjacentHTML('beforeend', `<p class="empty-msg">No matching Found</p>`);
        }
        else {
            for (const singleUser of matchingUser) {
                showResult(singleUser);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
});
