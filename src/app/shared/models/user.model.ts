export class UserModel {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
    password: string;
    birthDay?: Date;
    gender?: number;
    registrationDate: Date;
    favorites?: string[];
}