import sgMail from '@sendgrid/mail';

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
export async function getUncachableSendGridClient() {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;

  if (!apiKey) {
    throw new Error('SENDGRID_API_KEY environment variable is not set');
  }
  if (!fromEmail) {
    throw new Error('SENDGRID_FROM_EMAIL environment variable is not set');
  }

  sgMail.setApiKey(apiKey);
  return {
    client: sgMail,
    fromEmail,
  };
}
