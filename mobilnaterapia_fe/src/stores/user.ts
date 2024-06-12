import { defineStore } from "pinia";
import { ref } from "vue";
import { IUser } from "../interfaces/user";
import { alertError, alertSuccess } from "../plugins/sweetalert";
import { post } from "../utils/fetch";
import Swal from "sweetalert2";

export type Patient = {
  name: string;
  surname: string;
  gender: string;
  age: number;
};

export const useUserStore = defineStore("user", () => {
  const user = ref<IUser | null>(null);

  user.value = {
    idUser: 1,
    name: "mockName",
    lastName: "mockLastName",
    mail: "MOCK@gmail.com",
  };

  async function getDoctorPatients(): Promise<Patient[]> {
    let patients: Patient[] = [];
    try {
      if (!user.value) throw new Error("Nie zalogowany lekarz!");
      // patients.value = //GET
      patients = [
        {
          name: "John",
          surname: "Doe",
          gender: "Male",
          age: 35,
        },
        {
          name: "Alice",
          surname: "Smith",
          gender: "Female",
          age: 28,
        },
        {
          name: "Michael",
          surname: "Johnson",
          gender: "Male",
          age: 42,
        },
        {
          name: "Emily",
          surname: "Williams",
          gender: "Female",
          age: 50,
        },
        {
          name: "James",
          surname: "Brown",
          gender: "Male",
          age: 45,
        },
      ];
    } catch (error: any) {
      alertError(error.message);
    }
    return patients;
  }

  async function register(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<void> {
    try {
      await post("/api/auth/register", { user });
      alertSuccess("Utworzono konto");
    } catch (error: any) {
      alertError(error.message);
    }
  }

  async function login(user: {
    login: string;
    password: string;
  }): Promise<void> {
    try {
      const result = await post<{
        id: string;
        lastName: string;
        mail: string;
        message: string;
        name: string;
        token: string;
      }>("http://localhost:8080/loginUser", user);
      const { token, ...rest } = result;
      this.setUserData(rest);
      localStorage.setItem("app.jwt", token);
      alertSuccess("Zalogowano");
    } catch (error: any) {
      alertError(error);
    }
  }

  async function logout(): Promise<void> {
    try {
      await post("/api/auth/logout", {});
      localStorage.removeItem("app.jwt");
      this.setUserData(null);
      alertSuccess("Wylogowano pomyślnie");
    } catch (error: any) {
      alertError(error.message);
    }
  }

  function setUserData(data: any) {
    user.value = data;
  }

  return { user, getDoctorPatients, register, login, logout };
});
