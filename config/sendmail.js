import nodemailer from 'nodemailer';
import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config();


const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

// client id -secret and sender email in cloud console
//refresh-token in outh_playground
const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;


const sendEmail = async (to,subject,html) => {
  console.log(CLIENT_ID,CLIENT_SECRET,REFRESH_TOKEN,SENDER_MAIL)
    const oAuth2Client = new OAuth2Client(
      CLIENT_ID,
      CLIENT_SECRET,
      OAUTH_PLAYGROUND
    );
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    try {
      const access_token = await oAuth2Client.getAccessToken();
  
      ///custom transport configuration
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: SENDER_MAIL,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          access_token,
        },
      });

    
  
      ///cutsom message
      const mailOptions = {
        from: SENDER_MAIL,
        to: to,
        subject: subject,
        html: html,
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

export default sendEmail;
