import { createContext } from "react"
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js'

interface IUserProps {
    user:  CognitoUserSession | null,
    setUser: React.Dispatch<React.SetStateAction<CognitoUserSession | null>>
}

export const UserContext = createContext<IUserProps>({
    user: null,
    setUser: () => {}
});
