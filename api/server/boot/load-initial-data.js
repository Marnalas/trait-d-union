const loadReferentiels = require('../features/referentiels/load-referentiels')
const referentiels = require('../features/referentiels')

module.exports = async (app) => {
  await app.datasources.db.automigrate()
  return loadReferentiels(app.models, referentiels)
}