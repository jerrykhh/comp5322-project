import {  API } from 'aws-amplify';
import { UserAttribute } from '../../../typing/user';
import {  CognitoUserSession } from 'amazon-cognito-identity-js'

const getUser = async (username: string, userAttributes?: UserAttribute[]) => {
    const apiName = 'apidfd79f3a';
    const path = '/user';
    const params = {
        queryStringParameters: {username: username}
    };
    return await API.get(apiName, path, params);
};

const getUserContextUserId= async (user: CognitoUserSession, attribute: string) => {
    return (await user!.getIdToken().payload[`${attribute}`])
}

export {getUser, getUserContextUserId}