Feature: Retrieve enterprises that may hire around a given location

  Scenario: One offre found
    Given Referentiel is seed from 'one-offre-from-LBB'
    When GET '/offres'
    Then http status is 200
    And response payload is '/offres-from-LBB/GET_offres_one_result.json'