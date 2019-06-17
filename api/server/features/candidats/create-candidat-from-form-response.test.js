const { expect, sinon } = require('../../../tests/test-utils')
const createCandidatFromFormResponse = require('./create-candidat-from-form-response')

describe('Create Candidat from form response (typeform webhook)', () => {
  const formResponse = createFormResponse()
  const Candidat = {
    create: sinon.spy(async () => ({}))
  }
  const expectedCandidatToCreate = {
    id: '71854445-1512-47b1-bc6d-e0491e764a51',
    email: 'an_account@example.com',
    nomPrenom: 'Lorem ipsum dolor Nom Prenom',
    telephone: 'Lorem ipsum dolor Phone',
    cvUrl: 'https://admin.typeform.com/form/P6NFOZ/field/WlLbkyygWkkh/results/file.ext/download'
  }

  it('returns Candidat with values extracted from webhook', async () => {
    const createdCandidat = await createCandidatFromFormResponse({ Candidat }, formResponse)

    expect(createdCandidat).to.eql(expectedCandidatToCreate)
  })

  it('creates Candidat in DB', async () => {
    await createCandidatFromFormResponse({ Candidat }, formResponse)

    expect(Candidat.create).to.have.been.calledWith(expectedCandidatToCreate)
  })
})

function createFormResponse () {
  return {
    'form_id': 'P6NFOZ',
    'token': '01DD81DVVQWSN1SAFHT5RTQF0P',
    'landed_at': '2019-06-13T09:06:49Z',
    'submitted_at': '2019-06-13T09:06:49Z',
    'hidden': {
      'id_offre': 'hidden_value',
      'id_user': '71854445-1512-47b1-bc6d-e0491e764a51'
    },
    'definition': {
      'id': 'P6NFOZ',
      'title': 'Staging - Candidature Trait d\'union',
      'fields': [
        {
          'id': 'PUBOIqGPlWSI',
          'title': 'Merci de saisir votre email',
          'type': 'email',
          'ref': 'fc6d0ec8-0893-4115-9e55-98406deccea7',
          'properties': {}
        },
        {
          'id': 't1XX8lNuvgzf',
          'title': 'Nom et prénom',
          'type': 'short_text',
          'ref': '37afdfcc-545b-45b5-82ff-587bf89bee19',
          'properties': {}
        },
        {
          'id': 'vd777D41TS8n',
          'title': 'Téléphone',
          'type': 'short_text',
          'ref': 'c851647b-d611-4439-9c80-d2cd92b857e3',
          'properties': {}
        },
        {
          'id': 'WlLbkyygWkkh',
          'title': 'Merci de déposer votre CV',
          'type': 'file_upload',
          'ref': 'e0d92cb5-73d0-459b-8d9f-2779e77a32e8',
          'properties': {}
        }
      ],
      'hidden': [
        'id_offre',
        'id_user'
      ]
    },
    'answers': [
      {
        'type': 'email',
        'email': 'an_account@example.com',
        'field': {
          'id': 'PUBOIqGPlWSI',
          'type': 'email',
          'ref': 'fc6d0ec8-0893-4115-9e55-98406deccea7'
        }
      },
      {
        'type': 'text',
        'text': 'Lorem ipsum dolor Nom Prenom',
        'field': {
          'id': 't1XX8lNuvgzf',
          'type': 'short_text',
          'ref': '37afdfcc-545b-45b5-82ff-587bf89bee19'
        }
      },
      {
        'type': 'text',
        'text': 'Lorem ipsum dolor Phone',
        'field': {
          'id': 'vd777D41TS8n',
          'type': 'short_text',
          'ref': 'c851647b-d611-4439-9c80-d2cd92b857e3'
        }
      },
      {
        'type': 'file_url',
        'file_url': 'https://admin.typeform.com/form/P6NFOZ/field/WlLbkyygWkkh/results/file.ext/download',
        'field': {
          'id': 'WlLbkyygWkkh',
          'type': 'file_upload',
          'ref': 'e0d92cb5-73d0-459b-8d9f-2779e77a32e8'
        }
      }
    ]
  }
}