const { CognitoIdentityServiceProvider } = require('aws-sdk');

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const userPoolId = process.env.USERPOOL;


async function getUser(username) {
    const params = {
      UserPoolId: userPoolId,
      Username: username,
    };
  
    console.log(`Attempting to retrieve information for ${username}`);
  
    try {
      const result = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function listUsers(Limit, PaginationToken) {
    const params = {
      UserPoolId: userPoolId,
      ...(Limit && { Limit }),
      ...(PaginationToken && { PaginationToken }),
    };
  
    console.log('Attempting to list users');
  
    try {
      const result = await cognitoIdentityServiceProvider.listUsers(params).promise();
  
      // Rename to NextToken for consistency with other Cognito APIs
      result.NextToken = result.PaginationToken;
      delete result.PaginationToken;
  
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }


  module.exports = {
    // addUserToGroup,
    // removeUserFromGroup,
    // confirmUserSignUp,
    // disableUser,
    // enableUser,
    getUser,
    listUsers,
    // listGroups,
    // listGroupsForUser,
    // listUsersInGroup,
    // signUserOut,
  };