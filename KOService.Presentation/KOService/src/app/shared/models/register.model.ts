import { Role } from '../enums/Role';

export class RegisterEmployee {
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    userName: string;
    employeeRole: Role;
}
