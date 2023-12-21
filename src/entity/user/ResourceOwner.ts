export class ResourceOwner {
    id: string;
    firstLoginDateTime: Date;
    lastLoginDateTime: Date;
    firstName: string;
    secondName: string;
    middleName: string;
    birthday: Date;
    avatarUrl: string;
    username: string;
    email: string;
    roles: string[];
    active: boolean;

    constructor(id: string, firstLoginDateTime: Date, lastLoginDateTime: Date,
                firstName: string, secondName: string, middleName: string, birthday: Date,
                avatarUrl: string, username: string, email: string, roles: string[], active: boolean) {
        this.id = id;
        this.firstLoginDateTime = firstLoginDateTime;
        this.lastLoginDateTime = lastLoginDateTime;
        this.firstName = firstName;
        this.secondName = secondName;
        this.middleName = middleName;
        this.birthday = birthday;
        this.avatarUrl = avatarUrl;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.active = active;
    }
}