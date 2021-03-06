const SibApiV3Sdk = require('sendin_blue_api')

const sendinblueApiKey = process.env.SENDINBLUE_API_KEY

const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = sendinblueApiKey

module.exports = {
  contactsApiClient: new SibApiV3Sdk.ContactsApi(),
  smtpApiClient: new SibApiV3Sdk.SMTPApi()
}
