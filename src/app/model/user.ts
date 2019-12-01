/**
 * User - user class
 */
export class User {
    constructor(
        public name: string,
        public password: string) {
    };
}

/**
 * UserMaker - create new user
 */
export class UserMaker {
    static create(user: User) {
        return new User(
            user.name,
            user.password
        );
    }
}
