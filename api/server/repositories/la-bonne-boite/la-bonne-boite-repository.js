module.exports = ({ poleEmploiApiService }) => {
  return {
    getOffres: async ({ codeROME }) => {
      if (codeROME === 'metier-avec-une-seule-offre-from-LBB') {
        return [
          {
            'id': '66204311602105',
            'sessions': [
              {
                'id': 1,
                'numero': 20191,
                'communeCodeInsee': 42,
                'actionNumero': 1928,
                'dateDebut': '2018-09-01T00:00:00.000Z',
                'dateFin': '2018-10-01T00:00:00.000Z',
                'duration': 1
              }
            ],
            // eslint-disable-next-line max-len
            'url': 'https://labonneboite.pole-emploi.fr/66204311602105/details?rome_code=A1101&utm_medium=web&utm_source=api__emploi_store_dev&utm_campaign=api__emploi_store_dev__test'
          }
        ]
      } else {
        return []
      }
    }
  }
}