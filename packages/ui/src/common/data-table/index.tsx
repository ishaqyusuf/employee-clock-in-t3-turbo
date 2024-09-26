import { Fragment } from "react";
import { ColumnDef, flexRender } from "@tanstack/react-table";

import { cn } from "../..";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../table";
import {
  dataTableContext,
  useComposeDataTable,
  useDataTableContext,
} from "./data-table";
import { DataTablePagination } from "./data-table-pagination";
import { TableCellProps } from "./table-cells";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  children?;
  cellVariants: TableCellProps;
  addFilterCol(col: String);
}
function BaseDataTable<TData, TValue>({
  children,
  data,
  pageCount,
  columns,
  cellVariants,
  addFilterCol,
}: DataTableProps<TData, TValue>) {
  const ctx = useComposeDataTable(
    data,
    columns,
    pageCount,
    cellVariants,
    addFilterCol,
  );

  return (
    <dataTableContext.Provider value={ctx}>
      <div className="w-full space-y-3 overflow-auto">{children}</div>
    </dataTableContext.Provider>
  );
}
function _Table({}) {
  const { table, columns } = useDataTableContext();
  return (
    <div className="sm:rounded-lg sm:border">
      <Table className="">
        <TableHeader className={cn("")}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                if (!header.id.includes("_"))
                  return (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className={cn("")}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row
                  .getVisibleCells()
                  .map((cell) =>
                    cell.id.includes("__") ? null : (
                      <Fragment key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Fragment>
                    ),
                  )
                  .filter(Boolean)}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
function Footer() {
  const { table, columns } = useDataTableContext();
  return <DataTablePagination table={table} />;
}
export let DataTable = Object.assign(BaseDataTable, {
  Table: _Table,
  Footer,
});
