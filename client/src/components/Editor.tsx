import React from 'react'
import AceEditor from 'react-ace'
import 'brace/theme/monokai'
import 'brace/mode/markdown'

export default class Editor extends React.PureComponent<
  { onEdit: Function; value: string; height: number; createGoal: Function },
  {}
> {
  handleEdit(value: any) {
    this.props.onEdit(value)
  }

  render() {
    const height = this.props.height
    return (
      <div style={{ maxHeight: `${height - 65}px` }}>
        <AceEditor
          mode="markdown"
          theme="monokai"
          width="100%"
          fontSize={18}
          value={this.props.value}
          editorProps={{
            $blockScrolling: Infinity,
          }}
          className="sidebar-content"
          onChange={(value: any) => this.handleEdit(value)}
          name="ace-editor"
          height={`${height - 65}px`}
          commands={[
            {
              name: 'Create Goal',
              bindKey: { win: 'Alt-g', mac: 'Alt-g' },
              exec: () => {
                this.props.createGoal()
              },
            },
          ]}
        />
      </div>
    )
  }
}
