import { createUserInfo } from "/js/utils/components/profile/createAccount/createUser.js";
import { fields } from "/js/utils/components/profile/createAccount/fields.js";
import { loadError } from "/js/utils/auth/messages.js";
import {
  createAccountBtn,
  createAccountBackArrow,
} from "/js/utils/general/constants.js";

export function createAccountEvents() {
  try {
    createAccountBtn.addEventListener("click", () => {
      const loginForm = document.querySelector(".logInForm");
      if (loginForm) {
        loginForm.style.display = "none";
      }

      const newUserFormContainer = document.createElement("div");
      newUserFormContainer.classList.add("newUserFormContainer");

      const newUserForm = document.createElement("form");
      newUserForm.classList.add("newUserForm", "form-container");
      if (newUserForm) {
        createAccountBtn.style.display = "none";
        createAccountBackArrow.style.display = "block";
      }

      // fields.forEach((field) => {
      //   const input = document.createElement("input");
      //   input.id = field.id;
      //   input.type = field.type;
      //   input.placeholder = field.placeholder;

      //   Object.keys(field.attributes).forEach((attr) => {
      //     input.setAttribute(attr, field.attributes[attr]);
      //   });

      //   newUserForm.appendChild(input);
      // });

      fields.forEach((field) => {
        const input = document.createElement("input");
        input.id = field.id;
        input.type = field.type;
        input.placeholder = field.placeholder;

        Object.keys(field.attributes).forEach((attr) => {
          input.setAttribute(attr, field.attributes[attr]);
        });

        newUserForm.appendChild(input);
      });

      const submitButton = document.createElement("button");
      submitButton.type = "button";
      submitButton.classList.add("saveAccountBtn");
      submitButton.innerText = "Create account";
      newUserForm.appendChild(submitButton);

      const createAccountContainer = document.querySelector(
        ".createAccount-container"
      );

      newUserFormContainer.appendChild(newUserForm);
      createAccountContainer.appendChild(newUserFormContainer);

      submitButton.addEventListener("click", () => {
        const FirstName = document.querySelector("#FirstName").value;
        const LastName = document.querySelector("#LastName").value;
        const UserName = FirstName + " " + LastName;

        // if (!validator.isEmail(userInfo.UserEmail)) {
        //   loadError("Invalid email address");
        //   return;
        // }

        const userInfo = {
          UserName: UserName,
          UserEmail: document.querySelector("#UserEmail").value,
          UserPassword: document.querySelector("#UserPassword").value,
          BirthDate: document.querySelector("#BirthDate").value,
          Address: document.querySelector("#Address").value,
          PostalCode: document.querySelector("#PostalCode").value,
          Country: document.querySelector("#Country").value,
          active: false,
        };

        createUserInfo(userInfo);
      });
    });
  } catch (error) {
    loadError("Couldn't create account");
    console.error("Error occurred when creating account:", error);
  }
}