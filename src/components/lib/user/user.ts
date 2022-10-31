import { Auth, API } from 'aws-amplify';
import { UserAttribute } from '../../../typing/user';

const getUser = async (username: string, userAttributes?: UserAttribute[]) => {
    const apiName = 'apidfd79f3a';
    const path = '/user';
    const params = {
        queryStringParameters: {username: username}
    };
    return await API.get(apiName, path, params);
};

export {getUser}