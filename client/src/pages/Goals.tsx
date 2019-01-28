import React from 'react'
import Sidebar from 'react-sidebar'
import MarkdownEditor from '../components/MarkdownEditor'
import Tree from '../components/Tree'
import Spinner from '../components/Spinner'
import { fetchGoals } from '../store/apiCalls'
import { connect } from 'react-redux'

interface GoalsState {
  currentGoal: { id: string }
  sidebarOpen: boolean
  titleLength: number
}

const SidebarStyles = {
  root: {
    position: 'absolute',
    top: '65px',
    overflow: 'hidden',
  },
}

class Goals extends React.Component<
  {
    baseGoal: { id: string }
    fetchGoals: Function
    fetchGoalsStatus: string
  },
  GoalsState
> {
  constructor(props: any) {
    super(props)
    this.state = {
      currentGoal: this.props.baseGoal,
      sidebarOpen: false,
      titleLength: 1,
    }
  }

  countUp() {
    if (this.state.titleLength >= 9) return
    this.setState({ titleLength: this.state.titleLength + 1 })
    setTimeout(() => this.countUp(), 30)
  }

  componentDidMount() {
    if (this.props.fetchGoalsStatus === 'NOT_FETCHED') {
      this.props.fetchGoals()
    }
  }

  setCurrentGoal(goal: any) {
    this.setState({ currentGoal: goal })
  }

  toggleSidebarOpen() {
    if (!this.state.sidebarOpen) this.countUp()
    else this.setState({ titleLength: 1 })
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
  }

  render() {
    if (this.props.fetchGoalsStatus !== 'SUCCESS')
      return (
        <div className="center">
          <Spinner />
        </div>
      )
    return (
      <Sidebar
        sidebar={
          <div style={{ padding: '0 10px' }}>
            <a
              style={{ color: 'white' }}
              onClick={() => {
                this.toggleSidebarOpen()
              }}
            >
              <i className="material-icons">
                {this.state.sidebarOpen ? 'close' : 'keyboard_arrow_right'}
              </i>
            </a>
            {this.state.sidebarOpen && (
              <Tree
                goal={this.props.baseGoal}
                handleGoalClick={(goal: any) => this.setCurrentGoal(goal)}
                titleLength={this.state.titleLength}
              />
            )}
          </div>
        }
        open={true}
        docked={true}
        onSetOpen={() => {}}
        styles={SidebarStyles}
      >
        <div style={{ zIndex: -1 }}>
          <MarkdownEditor
            goal={this.state.currentGoal}
            navigateToGoal={(goal: any) => this.setCurrentGoal(goal)}
          />
        </div>
      </Sidebar>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    baseGoal: state.baseGoal,
    goals: state.goals,
    fetchGoalsStatus: state.fetchGoalsStatus,
  }
}
export default connect(
  mapStateToProps,
  { fetchGoals }
)(Goals)
