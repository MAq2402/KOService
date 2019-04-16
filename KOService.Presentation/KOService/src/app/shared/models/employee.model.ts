import { Role } from '../enums/Role';

export class Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    identityEmployeeRole: Role;
}
