const AWS = require('aws-sdk');
const SES = new AWS.SES();

const FROM_EMAIL_ADDRESS = process.env.FROM_EMAIL_ADDRESS;
const TO_EMAIL_ADDRESS = process.env.TO_EMAIL_ADDRESS;

function sendEmail(formData){
    const emailParams = {
        Source: FROM_EMAIL_ADDRESS,
        ReplyToAddresses: ['testReply@email.com'],
        Destination: {
            ToAdresses: [TO_EMAIL_ADDRESS],
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'utf8',
                    Data: `Thanks for your message: ${formData.message}\n\n Name: ${formData.name}\n Email: ${formData.email}\n 
                    We will reply as soon as possible\n Thanks`,
                },
            },
            Subject: {
                Charset: 'utf8',
                Data: 'Reply to your enquiry'
            },
        }, 
    };
    console.log(emailParams)

    const promise = SES.sendEmail(emailParams).promise();
    console.log(promise);
    return promise
}


exports.sendEmail = async(event) => {
    console.log('Send email called')

    const dynamodb = event.Records[0].dynamodb
    console.log(dynamodb);

    const formData = {
        name : dynamodb.NewImage.name.$,
        message: dynamodb.NewImage.message.$,
        email : dynamodb.NewImage.email.$
    }
    console.log(formData);

    return sendEmail(formData).then(data => {
        console.log(data);
    }).catch(error =>{
        console.log(error);
    })
}