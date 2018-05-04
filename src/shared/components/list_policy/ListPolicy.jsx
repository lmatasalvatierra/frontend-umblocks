import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { connect } from 'react-redux';

const columns = [
  {
    title: 'key',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'value',
    dataIndex: 'value',
    key: 'value',
  },
];

class ListPolicy extends Component {
  render() {
    const { view_policy } = this.props;
    return (
      <Table
        className="table"
        columns={columns}
        dataSource={view_policy}
        showHeader={false}
        pagination={false}
        rowClassName={(record, i) =>
          record.key === 'Policy Number' ? 'table__row--header' : null}
        rowKey={record => record.key}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state.policies,
});

export default connect(mapStateToProps, null)(ListPolicy);
