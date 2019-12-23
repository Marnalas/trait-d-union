import React from 'react'
import ListOffreItem from './ListOffreItem'
import ListOffreItemApplied from './ListOffreItemApplied'
import client from '../../utils/rest-module'

class ListOffre extends React.Component {
  constructor (props) {
    super(props)
    this.state = { offresCount: 0, offres: [] }
  }

  async componentDidMount () {
    this._mounted = true
    const { data: offres } = await client.get('/offres?status=published')
    if (!this._mounted) return
    this.setState({ offresCount: offres.length })
    this.setState({ offres })
  }

  async componentWillUnmount () {
    this._mounted = false
  }

  render () {
    return (
      <React.Fragment>
        <div className="alice-bg padding-top-40 padding-bottom-40">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="breadcrumb-area">
                  <h1>Liste des offres d'immersion</h1>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        🔍 Pour rechercher dans la liste, appuyez sur CTRL+F (windows) ou CMD+F (macOS)
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="alice-bg section-padding-bottom">
          <div className="container">
            <div className="row no-gutters">
              <div className="col">
                <div className="job-listing-container">
                  <div className="filtered-job-listing-wrapper">
                    <div className="job-view-controller-wrapper">
                      <div className="job-view-controller"/>
                      <div className="showing-number">
                        <span>Actuellement, {this.state.offresCount} immersions sont proposées</span>
                      </div>
                    </div>
                    <div className="job-filter-result">
                      {this.state.offres.map((offre) => {
                          return offre.candidatures.length > 0 ?
                            <ListOffreItemApplied offre={offre} key={offre.id}/>
                            : <ListOffreItem offre={offre} key={offre.id}/>
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default ListOffre
