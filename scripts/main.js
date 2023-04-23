window.localStorage.setItem("username", "admin");
window.localStorage.setItem("password", "admin");

const validate = () => {
  const userName = document.getElementById("uname").value;
  const password = document.getElementById("pswd").value;

  if (
    userName === window.localStorage.getItem("username") &&
    password === window.localStorage.getItem("password")
  ) {
    location.href = "home.html";
  } else alert("Invalid username or password");
};

const preventBack = () => {
  window.history.forward();
};

setTimeout("preventBack()", 0);
