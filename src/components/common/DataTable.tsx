import * as React from "react";
import {
  DataGrid,
  DEFAULT_GRID_OPTIONS,
  GridColDef,
  GridEditCellPropsParams,
  GridRowSelectedParams,
  GridValueGetterParams,
} from "@material-ui/data-grid";
import "./DataTable.css";

const { rowHeight, headerHeight } = DEFAULT_GRID_OPTIONS;

export default function DataTable(props: {
  columns: GridColDef[];
  rowData: any;
  checkboxSelection: boolean;
  editCellChangeCommitedFn: any;
  editRowModel: any;
  rowSelectFn: any;
  apiRef: any;
  selectionModelChangeFn: any;
  isDataTableLoading: boolean;
  isDataTableEditable: boolean;
  isDataTableEditablefn: any;
  isRowSelectionfn?: any;
}) {
  return (
    <div
      className="dataTable"
      style={{
        height: headerHeight + rowHeight * 4,
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <DataGrid
        apiRef={props.apiRef}
        rows={props.rowData}
        columns={props.columns}
        checkboxSelection={props.checkboxSelection}
        hideFooter={true}
        density={"compact"}
        editRowsModel={props.editRowModel}
        disableColumnReorder={true}
        onEditCellChangeCommitted={props.editCellChangeCommitedFn}
        onRowSelected={props.rowSelectFn}
        onSelectionModelChange={props.selectionModelChangeFn}
        loading={props.isDataTableLoading}
        isRowSelectable={(params) => {
          if (props.isRowSelectionfn) {
            return props.isRowSelectionfn(params);
          }
          return true;
        }}
        isCellEditable={(params) => {
          if (props.isDataTableEditablefn) {
            return props.isDataTableEditablefn(params);
          }
          return props.isDataTableEditable == true;
        }}
      />
    </div>
  );
}
