export const EMAIL_CONFIG_TOKEN = Symbol('METADAT:EMAIL_CONFIG');
export const EMAIL_INSTANCE_TOKEN = Symbol('METADATA:EMAIL_INSTANCE');

export const getEmailConfigToken = () => EMAIL_CONFIG_TOKEN;
export const getEmailInstanceToken = () => EMAIL_INSTANCE_TOKEN;

export const verificationEmail = (
  username: string,
  verificationCode: string,
  unterisServer: string,
) => {
  const link = `${unterisServer}/verify?token=${verificationCode}`;
  return `<html>
<body>
  <h3>Welcome ${username}!</h3>
  <div>signing
    <p>Thank you for buying for our Website please confirm your payment by clicking this link <a href=${link}>this link</a>.</p>

    <p>If the above link doesn't work, copy and paste this into your browser.</p>
    <p>${link}</p>

    <p>Happy shopping.</p>
  </div>

  <div>
    <p>Thank you from the Mcommerce team</p>
  </div>
</body>
</html>
`;
};
