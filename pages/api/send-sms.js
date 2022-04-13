// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async (req, res) => {
  try {
    const { body } = req;
    const { phoneNumber } = body || {};

    if (!phoneNumber) throw new Error('phone number required');

    const { JIBBER_API_MASTER_KEY, JIBBER_API_URL, JIBBER_API_APP_ID } = process.env;

    if (!JIBBER_API_URL) throw new Error('ours api url is required');
    if (!JIBBER_API_APP_ID) throw new Error('app id is required');
    if (!JIBBER_API_MASTER_KEY)
      throw new Error('api key is required to send sms');

    const message = `Open the app to verify your phone number. https://ourown.chat/onboarding?phoneNumber=${phoneNumber}`;
    const { data } = await axios.post(
      `${JIBBER_API_URL}/functions/sendSMS`,
      { phoneNumber, message },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Parse-Application-Id': JIBBER_API_APP_ID,
          'X-Parse-Master-Key': JIBBER_API_MASTER_KEY,
        },
      }
    );

    res.statusCode = 200;
    res.json({ message: data.result });
  } catch (error) {
    res.statusCode = 500;
    res.json({ error: error.message });
  }
};
