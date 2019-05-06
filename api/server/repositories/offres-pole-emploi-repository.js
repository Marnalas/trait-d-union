module.exports = ({ poleEmploiApiService }) => {
  return {
    getOffres: async ({ codeROME }) => {
      const offres = await searchOffres(poleEmploiApiService)(codeROME)
      return offres.map(sanitizeOffre)
    }
  }
}

const searchOffres = (poleEmploiApiService) => async (codeROME) => {
  const searchParameters = {
    codeROME,
    commune: 57463,
    distance: 10,
    experience: 1,
    range: '1-149',
    sort: 2
  }
  const { resultats } = await poleEmploiApiService.request('/offres/search', searchParameters)
  return resultats
}

function sanitizeOffre (offre) {
  const properties = [
    'id', 'description', 'dureeTravailLibelle', 'secteurActiviteLibelle', 'lieuTravail',
    'appellationlibelle', 'salaire', 'permis', 'natureContrat', 'typeContrat'
  ]

  const result = keepDefinedProperties(offre, properties)

  result.url = offre.origineOffre && offre.origineOffre.urlOrigine
  result.courriel = 'some@email.fr'

  return result
}

function keepDefinedProperties (object, properties) {
  return properties.reduce((result, property) => {
    if (object[property]) {
      result[property] = object[property]
    }
    return result
  }, {})
}
