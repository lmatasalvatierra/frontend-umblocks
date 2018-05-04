import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';

const columns = [
  {
    title: 'key',
    dataIndex: 'key',
    key: 'key',
    width: '50%',
  },
  {
    title: 'value',
    dataIndex: 'value',
    key: 'value',
    width: '50%',
  },
];

class ListCertificate extends Component {
  render() {
    return (
      <Table
        className="table"
        columns={columns}
        dataSource={this.props.certificate}
        showHeader={false}
        pagination={false}
        rowClassName={(record, i) =>
          record.key === 'Certificate Number' ? 'table__row--header' : null}
        rowKey={record => record.key}
      />
    );
  }
}

export default ListCertificate;
