import MJMLElement from './MJMLElement'
import React, { Component } from 'react'

function createComponent(ComposedComponent, defaultMJMLDefinition) {

  @MJMLElement(defaultMJMLDefinition)
  class MJMLColumnElement extends Component {

    styles = this.getStyles()

    getStyles () {
      const { mjAttribute } = this.props

      return {
        td: {
          background: mjAttribute('container-background-color'),
          fontSize: 0,
          padding: mjAttribute('padding'),
          paddingTop: mjAttribute('padding-top'),
          paddingBottom: mjAttribute('padding-bottom'),
          paddingRight: mjAttribute('padding-right'),
          paddingLeft: mjAttribute('padding-left')
        }
      }
    }

    render () {
      const { mjAttribute } = this.props

      return (
        <tr>
          <td
            data-legacy-align={mjAttribute('align')}
            data-legacy-background={mjAttribute('container-background-color')}
            style={this.styles.td}>
            <ComposedComponent {...this.props} />
          </td>
        </tr>
      )
    }

  }

  return MJMLColumnElement

}

export default (defaultMJMLDefinition) => {
  if (typeof defaultMJMLDefinition == 'function') {
    return createComponent(defaultMJMLDefinition)
  }

  return ComposedComponent => createComponent(ComposedComponent, defaultMJMLDefinition)
}
