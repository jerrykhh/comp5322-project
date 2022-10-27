import { createContext } from "react"
import { CognitoUser } from 'amazon-cognito-identity-js'

interface IUserProps {
    user: CognitoUser | null,
    setUser: React.Dispatch<React.SetStateAction<CognitoUser| null>>
}

export const UserContext = createContext<IUserProps>({
    user: null,
    setUser: () => {}
});
