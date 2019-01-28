import React from 'react'
import { connect } from 'react-redux'
import './Tree.css'
import { setCurrentGoal } from '../store/currentGoal'
import { GoalInterface } from '../store/goals'

const TreeView = require('react-treeview')

class Tree extends React.Component<
  {
    goal: GoalInterface
    goals: any
    setCurrentGoal: Function
    titleLength: number
  },
  { collapsedBookkeeping: boolean }
> {
  constructor(props: any) {
    super(props)
    this.state = {
      collapsedBookkeeping: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.collapseAll = this.collapseAll.bind(this)
  }

  handleClick() {
    this.setState({ collapsedBookkeeping: !this.state.collapsedBookkeeping })
  }

  collapseAll() {
    this.setState({
      collapsedBookkeeping: true,
    })
  }

  renderLabel() {
    return (
      <span
        className="node"
        onClick={() => {
          this.props.setCurrentGoal(this.props.goal)
        }}
      >
        {this.props.goal.text.slice(0, this.props.titleLength)}
      </span>
    )
  }

  render() {
    const collapsedBookkeeping = this.state.collapsedBookkeeping
    return (
      <div>
        {this.props.goal.subGoals.length === 0 ? (
          this.renderLabel()
        ) : (
          <TreeView
            nodeLabel={this.renderLabel()}
            collapsed={collapsedBookkeeping}
            onClick={() => {
              this.handleClick()
            }}
            itemClassName="tree-view_item"
            treeViewClassName="tree-view"
            childrenClassName="tree-view_children"
          >
            {this.props.goal.subGoals.map((goalId: string, i: number) => {
              return (
                <Tree {...this.props} goal={this.props.goals[goalId]} key={i} />
              )
            })}
          </TreeView>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    goal: state.goals[ownProps.goal._id],
    goals: state.goals,
  }
}
export default connect(
  mapStateToProps,
  { setCurrentGoal }
)(Tree)
