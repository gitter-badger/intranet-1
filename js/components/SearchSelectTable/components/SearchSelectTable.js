import React, { PropTypes } from 'react';
import { Table, Button } from 'react-bootstrap';

import SearchBar from './SearchBar';
import TableHead from './TableHead';
import TableBody from './TableBody';
import EditModal from '../containers/EditModal';

class SearchSelectTable extends React.Component {
  constructor(props) {
    super(props);

    React.Children.forEach(props.children, column => {
      if (column.props.isKey) {
        this.keyField = column.props.dataField;
      }
    });

    this.colDefines = this.createColumnDefines(props.children);
  }

  createColumnDefines(children) {
    return React.Children.map(children, (column, i) => {
      return {
        dataField: column.props.dataField,
        // align: column.props.dataAlign,
        // sort: column.props.dataSort,
        // format: column.props.dataFormat,
        // formatExtraData: column.props.formatExtraData,
        // filterFormatted: column.props.filterFormatted,
        // filterValue: column.props.filterValue,
        // editable: column.props.editable,
        // customEditor: column.props.customEditor,
        // hidden: column.props.hidden,
        // hiddenOnInsert: column.props.hiddenOnInsert,
        // searchable: column.props.searchable,
        // className: column.props.columnClassName,
        // editClassName: column.props.editColumnClassName,
        // columnTitle: column.props.columnTitle,
        width: column.props.width,
        name: column.props.children,
        type: column.props.type,
        options: column.props.options,
        // sortFunc: column.props.sortFunc,
        // sortFuncExtraData: column.props.sortFuncExtraData,
        // export: column.props.export,
        // expandable: column.props.expandable,
        // index: i
      };
    });
  }

  render() {
    const options = this.colDefines.map(data => ({
      name: data.name,
      value: data.dataField
    }));

    return (
      <div>
        <SearchBar options={options}/>

        <Table bordered={true} hover={true} responsive>
          <TableHead colDefines={this.colDefines}
                     onSelectAll={e => this.props.onSelectAll(e)}/>

          <TableBody datas={this.props.datas}
                     selected={this.props.selected}
                     onSelect={this.props.onSelect}
                     onEdit={this.props.onEdit}
                     onDel={this.props.onDel}/>
        </Table>

        <Button onClick={this.props.onMultiEdit}>편집</Button>
        <Button onClick={this.props.onMultiDel}>삭제</Button>
        <Button onClick={this.props.onAdd}>추가</Button>

        <EditModal dataDefines={this.colDefines} data={{}}/>

        {/*<Detail />*/}
      </div>
    );
  }
}

SearchSelectTable.propTypes = {
  schema: PropTypes.object,
  datas: PropTypes.array,
  //selectProps: PropTypes.shape({
    selected: PropTypes.array,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
  //}),
  //updateProps: PropTypes.shape({
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onDel: PropTypes.func,
    onMultiEdit:PropTypes.func,
    onMultiDel: PropTypes.func
  //})
};

SearchSelectTable.defaultProps = {
  schema: {},
  datas: [],
  //selectProps: {
    selected: [],
    onSelect: undefined,
    onSelectAll: undefined,
  //},
  //updateProps: {
    onAdd: undefined,
    onEdit: undefined,
    onDel: undefined,
    onMultiEdit: undefined,
    onMultiDel: undefined
  //}
};

export default SearchSelectTable;
