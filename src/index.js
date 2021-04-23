const api = "https://randomuser.me/api";
const addUser = document.getElementById("user-btn");
const descsortBtn = document.getElementById("sort-desc");
const ascsortBtn = document.getElementById("sort-asc");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
const appstate = [];

class User {
  constructor(title, firstname, lastname, gender, email) {
    this.title = `${title}`;
    this.name = `${firstname} ${lastname}`;
    this.email = email;
    this.gender = gender;
  }
}

addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userJason = await userData.json();
  console.log(userJason.results[0]);
  const user = userJason.results[0];
  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );
  appstate.push(classUser);
  console.log(appstate);

  domRenderer(appstate);
});

const domRenderer = (stateArr) => {
  userList.innerHTML = null;
  stateArr.forEach((userObj) => {
    const userEl = document.createElement("div");
    userEl.innerHTML = `<div>
    Name: ${userObj.title} ${userObj.name} 
    <ol>
    <li>${userObj.gender}</li>
    <li>${userObj.email}</li>
    </ol>
    </div>`;
    userList.appendChild(userEl);
  });
};

searchInput.addEventListener("keyup", (e) => {
  console.log(e, searchInput.value);
  const filteredAppState = appstate.filter(
    (user) =>
      user.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      //  user.name.last.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  domRenderer(filteredAppState);
});
descsortBtn.addEventListener("click", () => {
  const appstateCopy = [...appstate];
  appstateCopy.sort((a, b) => (a.name < b.name ? -1 : 1));

  domRenderer(appstateCopy);
});
ascsortBtn.addEventListener("click", () => {
  const appstateCopy = [...appstate];
  appstateCopy.sort((a, b) => (a.name < b.name ? -1 : 1));

  domRenderer(appstateCopy);
});
