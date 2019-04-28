import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LineChart from '../charts/LineChart'
import { fetchData } from './actions'

class VisitorLineChart extends React.PureComponent {
  render() {
    function tranformData(data) {
      const transformRow = ([date, value]) => [new Date(date), value]
      const dataHeader = [
        { type: 'date', label: 'Day' }, 'Visitors',
      ]

      return [dataHeader, ...data.map(transformRow)]
    }

    return (
      <LineChart
        chartType="LineChart"
        chartName=""
        height="300px"
        data={tranformData(this.props.data)}
        fetchData={this.props.fetchData}
        fromDate={this.props.fromDate}
        toDate={this.props.toDate}
        options={{
          title: 'Visitors',
        }}
      />
    )
  }
}

VisitorLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
}

function mapStateToProps(applicationState) {
  const visitorState = applicationState.visitors
  const globalState = applicationState.global

  return {
    data: visitorState.get('data').toJS(),
    fromDate: globalState.get('fromDate'),
    toDate: globalState.get('toDate'),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchData,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VisitorLineChart)
