import React from 'react'
import { GoalInterface, GoalsInterface } from '../store/goals'
import { Line } from 'rc-progress'
import getGoalFinishedRation from '../helpers/getGoalFinishedRatio'

const ReactMarkdown = require('react-markdown')
const emoji = require('emoji-dictionary')

import 'simplebar'
import 'simplebar/dist/simplebar.css'

export default class Markdown extends React.PureComponent<
  { text: string; goal: GoalInterface; goals: GoalsInterface; height: number },
  {}
> {
  render() {
    const emojiSupport = this.props.text.replace(/:([\w|+]+):/gi, name => {
      var e = emoji.getUnicode(name)
      return e ? e : name
    })
    const ratio = getGoalFinishedRation(this.props.goal, this.props.goals)
    const percent = (ratio.finished / ratio.total) * 100
    return (
      <div
        data-simplebar
        style={{
          height: `${this.props.height - 65}px`,
          overflowY: 'scroll',
          overflowX: 'hidden',
          width: '100%',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col s8 m10 l10">
              <Line percent={percent} strokeWidth="1" strokeColor="#2bbbad" />
            </div>
            <div>
              {ratio.finished} / {ratio.total}
            </div>
          </div>
          <ReactMarkdown source={emojiSupport} escapeHtml={false} />
        </div>
      </div>
    )
  }
}
