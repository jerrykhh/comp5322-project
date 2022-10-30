import { CognitoUser ,CognitoUserSession} from 'amazon-cognito-identity-js';

const useAdminSessionCheck = (user: CognitoUser|CognitoUserSession, serverSideChecking: boolean=false) => {
    console.log(user)
    if(user == null)
        throw Error('Account is not allow to login this portal, please contact your Supervisor')

    console.log('b')
    
    let idTokenObj;
    
    try{
        if (user instanceof CognitoUser){
            idTokenObj = user.getSignInUserSession()!.getIdToken()
        }else{
            idTokenObj = user.getIdToken();
        }
        
        const groups = idTokenObj.payload['cognito:groups']
        
        for(const group of groups){
            if(group === "admin")
                return true
        }
    }catch(err){
        console.log(err);
    }
    console.log('d')
    throw Error('Account is not allow to login this portal, please contact your Supervisor')
}

export {useAdminSessionCheck};