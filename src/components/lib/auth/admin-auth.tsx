

const useAdminSessionCheck = (user: any, serverSideChecking: boolean=false) => {
    
    if(user == null)
        throw Error('Account is not allow to login this portal, please contact your Supervisor')

    const groups = (serverSideChecking)? user.idToken.payload['cognito:groups']: user.signInUserSession.accessToken.payload['cognito:groups'];
    for(const group of groups){
        if(group === "admin")
            return true
    }
    throw Error('Account is not allow to login this portal, please contact your Supervisor')
}

export {useAdminSessionCheck};