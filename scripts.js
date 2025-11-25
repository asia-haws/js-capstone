let users = [];

const getNames = async () => {
  const response = await fetch("https://javascript-capstone-backend.onrender.com/users");
  users = await response.json();

  const userListDiv = document.getElementById("user-list");
  userListDiv.innerHTML = "";

  for (let i = 0; i < users.length; i++) {
    userListDiv.innerHTML += '<div class="user-item">' + users[i].first_name + ' ' + users[i].last_name + '</div>';
  }

  const allUserDivs = document.querySelectorAll("#user-list .user-item");

  allUserDivs.forEach((userDiv, index) => {
    userDiv.addEventListener("click", () => {
      allUserDivs.forEach(user => user.classList.remove("highlight"));
      userDiv.classList.add("highlight");
      document.getElementById("selected-name").textContent = users[index].first_name + ' ' + users[index].last_name;
    });
  });

  document.getElementById("random-btn").addEventListener("click", () => {
    const spinner = document.getElementById("spinner");
    spinner.style.display = "inline-block";

    setTimeout(() => {
      const ranNum = Math.floor(Math.random() * users.length);

      allUserDivs.forEach(userDiv => userDiv.classList.remove("highlight"));
      allUserDivs[ranNum].classList.add("highlight");

      const selectedName = document.getElementById("selected-name");
      selectedName.textContent = users[ranNum].first_name + ' ' + users[ranNum].last_name;

      selectedName.classList.add("shake");
      setTimeout(() => selectedName.classList.remove("shake"), 500);

      spinner.style.display = "none";
    }, 500); 
  });
}

getNames();
