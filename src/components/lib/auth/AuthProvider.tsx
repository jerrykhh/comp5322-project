import { useEffect, useState } from "react";
import { CognitoUser ,CognitoUserSession} from 'amazon-cognito-identity-js';
import { UserContext } from "../../../contexts/user/user";
import { Auth } from "aws-amplify";


type Props = {
    children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<CognitoUserSession | null>(null);

    useEffect(() => {

        const verifySession = async() => {
            await Auth.currentSession().then((sessionUser) => {
                console.log('set user');
                setUser(sessionUser)
            })
        } 

        if (user)
            return;


        if (!user || user === null || user === undefined) 
            verifySession()
     

    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthProvider;