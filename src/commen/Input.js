import React, {Component} from 'react'
import PropTypes from 'prop-types'

function proxyHoc(WrappedComponent) {
  return class extends Component {
    static contextTypes = {
      model: PropTypes.object,
      changeModel: PropTypes.func
    }

    onChange = event => {
      const { changeModel } = this.context
      const { onChange } = this.props
      const { v_model } = this.props
      changeModel(v_model, event.target.value)
      if (typeof onChange === 'function') {
        onChange(event)
      }
    }

    render() {
			const { model } = this.context
			console.log('model', model)
			const { v_model } = this.props
      return (
        <WrappedComponent
          {...this.props}
          value={model[v_model]||''}
          onChange={this.onChange}
        />
      )
    }
  }
}
@proxyHoc
class Input extends Component {
  render() {
    return <input {...this.props} />
  }
}
export default  Input