const { info } = require('../infrastructure/logger')
const retrieveCandidatureFromMessageId = require('../features/notify-opened-message/retrieve-candidature-from-message-id')
const setCandidatureOpened = require('../features/notify-opened-message/set-candidature-opened')
const sendAccuseLecture = require('../features/notify-opened-message/send-accuse-lecture')

module.exports = function (Candidature) {
  Candidature.firstOpeningEvent = async (messageId) => {
    info(`New "First opening" event received from sendinblue webhook (messageId: ${messageId})`)
    const candidature = await retrieveCandidatureFromMessageId({ Candidature }, messageId)
    if (candidature) {
      await setCandidatureOpened(candidature)
      await sendAccuseLecture(candidature)
    }
  }

  Candidature.remoteMethod('firstOpeningEvent', {
    http: { path: '/first-opening-event', verb: 'POST' },
    accepts: { arg: 'message-id', type: 'string' },
    returns: { arg: 'candidature', type: 'string', root: true }
  })

  Candidature.afterRemote('firstOpeningEvent', async (context) => {
    context.res.statusCode = 201
  })
}
