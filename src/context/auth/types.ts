import { ActionTypes } from "./actionTypes.enum";
const faker = require("faker");

type AuthAction = {
  type:
    | ActionTypes.LOGIN
    | ActionTypes.LOGOUT
    | ActionTypes.CHECK_STATE
    | ActionTypes.LOAD_PERSONAL_DATA
    | ActionTypes.CHANGE_PERSONAL_DATA;
  payload: { [key: string]: any };
};

interface PersonalData {
  [key: string]: string;
}

type AuthType = { logged: boolean } & { personalData: PersonalData };

interface AuthContextType extends AuthType {
  login(): void;

  logout(): void;

  checkState(): void;

  loadPersonalData(): void;

  changePersonalData(newData: { [key: string]: any }): void;
}

const initialState: AuthType = {
  logged: false,
  personalData: {
    username: faker.internet.userName,
    name: faker.name.firstName,
    surname: faker.name.lastName,
    email: faker.internet.email,
    phoneNumber: faker.phone.phoneNumber,
    about: faker.lorem.paragraph,
    lastAttendance: faker.time.recent
  }
};

export { initialState };
export type { AuthAction, AuthType, AuthContextType, PersonalData };
