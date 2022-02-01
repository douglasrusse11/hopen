/* eslint-disable-line */ const aws = require('aws-sdk');

exports.handler = async event => {

  const cognitoProvider = new aws.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
  });

  let isAdmin = false;

  const adminEmails = ['douglas.russell7@btinternet.com', 'agnieszka.koltun.89@gmail.com', 'mikaelplata@gmail.com'];

  if (adminEmails.indexOf(event.request.userAttributes.email) != -1) {
    isAdmin = true;
  }

  if (isAdmin) {
    const groupParams = {
      GroupName: process.env.GROUP,
      UserPoolId: event.userPoolId,
    };
    const addUserParams = {
      GroupName: process.env.GROUP,
      UserPoolId: event.userPoolId,
      Username: event.userName,
    };
    
    try {
      await cognitoProvider.getGroup(groupParams).promise();
    } catch (e) {
      await cognitoProvider.createGroup(groupParams).promise();
    }

    return cognitoProvider.adminAddUserToGroup(addUserParams).promise();

} else {
  return null;
}
};
