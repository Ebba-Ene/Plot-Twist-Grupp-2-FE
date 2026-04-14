import { getBaseUrl } from "./src/utils/api.js";

let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
let loginBtn = document.querySelector("#login");

loginBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    alert("Fyll i både e-post och lösenord.");
    return;
  }

  try {
    const url = `${getBaseUrl()}auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Inloggning lyckades!", data);
      localStorage.setItem("token", data.token);
    } else {
      console.error("Fel:", data.message);
      alert(data.message || "Något gick fel.");
    }

  } catch (error) {
    console.error("Nätverksfel:", error);
    alert("Kunde inte nå servern.");
  }
});

let registerEmail = document.querySelector("#registerUserEmail");
let registerPassword = document.querySelector("#registerUserPassword");
let signupBtn = document.querySelector("#signupBtn");

signupBtn.addEventListener("click", async () => {
  const email = registerEmail.value;
  const password = registerPassword.value;

  // Enkel validering
  if (!email || !password) {
    alert("Fyll i både e-post och lösenord.");
    return;
  }

    try {
    const url = `${getBaseUrl()}auth/register`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        console.log("Registrering lyckades!", data);
        localStorage.setItem("token", data.token);
    } else {
        console.error("Fel:", data.message);
        alert(data.message || "Något gick fel.");
    }

    } catch (error) {
    console.error("Nätverksfel:", error);
    alert("Kunde inte nå servern.");
    }
})