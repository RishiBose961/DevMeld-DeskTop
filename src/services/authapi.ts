// services/registerUser.ts
import axios from "axios";

interface IFormInput {
  fullName: string;
  emailAddress: string;
  password: string;
  companyName: string;
}

interface IFormInputLogin {
  emailAddress: string;
  password: string;
}

export const registerUser = async (data: IFormInput) => {
  const response = await axios.post(
    "http://localhost:5000/api/register/startup",
    data
  );
  return response.data;
};

export const loginUser = async (data: IFormInputLogin) => {
  const response = await axios.post(
    "http://localhost:5000/api/login/startup",
    data
  );
  return response.data;
};
