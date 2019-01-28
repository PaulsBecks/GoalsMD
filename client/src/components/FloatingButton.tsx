import React from 'react'
import { GoalInterface } from '../store/goals'
import { updateGoal } from '../store/apiCalls'
import { connect } from 'react-redux'

interface FloatingButtonProps {
  show: String
  small: Boolean
  setShow: Function
  createGoal: Function
  goal: GoalInterface
  updateGoal: Function
}

class FloatingButton extends React.PureComponent<
  FloatingButtonProps,
  { finishedHovered: boolean }
> {
  constructor(props: any) {
    super(props)
    this.state = {
      finishedHovered: false,
    }
  }

  initActionButton() {
    var elems = document.querySelectorAll('.fixed-action-btn')
    M.FloatingActionButton.init(elems, {})
  }

  componentDidUpdate() {
    this.initActionButton()
  }

  componentDidMount() {
    this.initActionButton()
  }

  toggleFinishedHover() {
    this.setState({ finishedHovered: !this.state.finishedHovered })
  }

  updateGoal() {
    this.props.updateGoal({
      ...this.props.goal,
      finished: !this.props.goal.finished,
    })
  }

  render() {
    const checked = this.props.goal.finished
    return (
      <div className="fixed-action-btn" style={{ right: '5vw' }}>
        <a className="btn-floating btn-large">
          <i className="large material-icons">menu</i>
        </a>
        <ul>
          {this.props.show === 'input' && this.props.small && (
            <li>
              <a className="btn-floating">
                <i
                  className={`material-icons`}
                  onClick={() => {
                    this.props.setShow('preview')
                  }}
                >
                  visibility
                </i>
              </a>
            </li>
          )}
          {this.props.show === 'preview' && this.props.small && (
            <li>
              <a className="btn-floating">
                <i
                  className="material-icons"
                  onClick={() => {
                    this.props.setShow('input')
                  }}
                >
                  mode_edit
                </i>
              </a>
            </li>
          )}
          <li>
            <a className="btn-floating">
              <i
                className="material-icons"
                onClick={() => {
                  this.props.createGoal()
                }}
              >
                add
              </i>
            </a>
          </li>
          <li>
            <a
              className="btn-floating white"
              style={{ paddingTop: '7px', paddingLeft: '11px' }}
            >
              <label>
                <input type="checkbox" checked={checked} onChange={() => {}} />
                <span
                  onMouseOver={() => this.toggleFinishedHover()}
                  onMouseLeave={() => this.toggleFinishedHover()}
                  onClick={() => this.updateGoal()}
                />
              </label>
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default connect(
  null,
  { updateGoal }
)(FloatingButton)
