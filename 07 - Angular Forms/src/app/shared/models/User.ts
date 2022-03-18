export interface User {
    email: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    }
}