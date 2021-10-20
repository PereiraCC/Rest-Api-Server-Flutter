import {OAuth2Client, TokenPayload} from 'google-auth-library';

const client  = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


export async function verify( token : string  = '') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      // audience: process.env.GOOGLE_CLIENT_ID
      audience: [
        process.env.GOOGLE_CLIENT_ID_FLUTTER ?? '',
        process.env.GOOGLE_CLIENT_ID ?? ''
      ]
  });
  const { name, picture, email} = ticket.getPayload() as TokenPayload;

  return {
      name,
      picture,
      email
  }
  

}