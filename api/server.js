const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')
const Pack = require('./package')
const configurationService = require('./src/services/configuration-service')
const routes = require('./src/routes')

exports.createServer = async () => {
  const serverInstance = new Hapi.Server({
    port: configurationService.get('PORT'),
    host: configurationService.get('HOST')
  })
  serverInstance.event('onPreStart', () => {
  })
  return serverInstance
}

exports.registerPlugins = async (server) => {
  const swaggerOptions = {
    info: {
      title: 'Trait d\'Union API - Documentation',
      version: Pack.version
    },
    grouping: 'tags',
    basePath: '/api/v1/'
  }
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])
  server.route(routes)

  return server
}
