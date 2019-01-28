import * as React from 'react'
import './Editor.css'
import FloatingButton from './FloatingButton'

import M from 'materialize-css'
import { connect } from 'react-redux'
import { createGoal, updateGoal } from '../store/apiCalls'
import { GoalInterface, GoalsInterface } from '../store/goals'
import { setCurrentGoal } from '../store/currentGoal'
import Markdown from './Markdown'
import Editor from './Editor'

const keydown = require('react-keydown').default

class MarkdownEditor extends React.PureComponent<
  {
    goal: GoalInterface
    goals: GoalsInterface
    updateGoal: Function
    setCurrentGoal: Function
    createGoal: Function
  },
  { show: string; width: number; height: number }
> {
  constructor(props: any) {
    super(props)
    this.state = {
      show: 'input',
      width: 0,
      height: 0,
    }
    this.onEdit = this.onEdit.bind(this)
    this.createGoal = this.createGoal.bind(this)
    this.setShow = this.setShow.bind(this)
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  onEdit(text: string) {
    this.props.updateGoal({ ...this.props.goal, text })
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  setShow(toShow: string) {
    this.setState({ show: toShow })
  }

  @keydown('alt+g')
  createGoal() {
    const newGoal = {
      text: '# I want to fly to the moon! :rocket:\n Enter your code here.',
      subGoals: [],
      parentGoal: this.props.goal._id,
      rootGoal: false,
      finished: false,
    }
    this.props.createGoal({ parent: this.props.goal._id, subGoal: newGoal })
  }

  render() {
    const small = this.state.width < 992
    return (
      <main>
        <div className="row" style={{ margin: 0 }}>
          {(this.state.show === 'input' || !small) && (
            <div
              className={`col s12 m12 l${small ? 12 : 6}`}
              style={{
                padding: 0,
                borderLeft: '1px solid black',
                borderRight: '1px solid black',
              }}
            >
              <Editor
                onEdit={this.onEdit}
                value={this.props.goal.text}
                height={this.state.height}
                createGoal={this.createGoal}
              />
            </div>
          )}
          {(this.state.show === 'preview' || !small) && (
            <div
              className={`col s12 m12 l${small ? 12 : 6}`}
              style={{ padding: 0 }}
            >
              <Markdown
                goals={this.props.goals}
                goal={this.props.goal}
                text={this.props.goal.text}
                height={this.state.height}
              />
            </div>
          )}
        </div>

        <FloatingButton
          show={this.state.show}
          small={small}
          setShow={this.setShow}
          createGoal={this.createGoal}
          goal={this.props.goal}
        />
      </main>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    goal: state.goals[state.currentGoal._id],
    goals: state.goals,
  }
}
export default connect(
  mapStateToProps,
  { updateGoal, createGoal, setCurrentGoal }
)(MarkdownEditor)
