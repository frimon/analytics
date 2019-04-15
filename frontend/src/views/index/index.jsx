import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'semantic-ui-react'
import { increaseCount } from './actions'
// import { Grid } from 'semantic-ui-react'

class Index extends Component {
  constructor(props) {
    super(props)
    this.increaseCount = this.increaseCount.bind(this)
  }

  increaseCount() {
    this.props.increaseCount()
  }

  render() {
    return (
      <div>
        <div>
          {`Count: ${this.props.count}`}
        </div>
        <Button onClick={this.increaseCount}>Increase count</Button>
      </div>
    )
  }
}

Index.propTypes = {
  count: PropTypes.number.isRequired,
  increaseCount: PropTypes.func.isRequired,
}

Index.defaultProps = {
}

function mapStateToProps(applicationState) {
  const state = applicationState.index

  return {
    count: state.get('count'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    increaseCount,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
