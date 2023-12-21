export interface Post {
    id: string;
    user: User;
    title: string;
    content: string;
    date: Date
    // Agrega más propiedades según tu modelo de datos
}

export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
}