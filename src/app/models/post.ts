export interface Post {
    _id: string;
    user: User;
    title: string;
    content: string;
    date: Date
    likes: number;
    likedBy: string[];
    // Agrega más propiedades según tu modelo de datos
}

export interface User {
    _id: number;
    username: string;
    password: string;
    email: string;
}