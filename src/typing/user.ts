export type UserAttribute = {
    Name: string;
    Value: string;
}

export type CognitoUserData = {
    UserAttributes: UserAttribute[],
    UserCreateDate: string,
    UserLastModifiedDate: string,
    UserStatus: string
}