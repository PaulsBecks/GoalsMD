import React from 'react'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="row" style={{ marginTop: '5vw' }}>
          <div className="col s12 m8 l6  offset-m2  offset-l3 ">
            <img
              className="materialboxed z-depth-5"
              style={{ width: '100%' }}
              src="img/goalifier.png"
            />
          </div>
        </div>
      </div>
    )
  }
}
