import * as React from 'react';
import * as cn from 'classnames';
import { StylesProps, provideStyles } from './Table.style';

type MakeFnComponentProps<P = {}, C = any> = P & { children?: C };

type ISharedProps = StylesProps & { className?: string };

interface ICellProps {
  align?: 'left' | 'center' | 'right';
}

interface ITableProps {
  separated?: boolean;

}
class Table extends React.Component<ISharedProps & ITableProps> {

  public render() {
    const { classes, children, className, separated } = this.props;
    return (
      <table
        className={cn(
          classes.root,
          className,
          {
            [classes.separated]: separated,
          })}
      >
        {children}
      </table>);
  }
}

const TableComponent = provideStyles(Table);

const TableHead = provideStyles((props: MakeFnComponentProps<ISharedProps>) => {
  return <thead className={props.className}>{props.children}</thead>;
});

const TableBody = provideStyles((props: MakeFnComponentProps<ISharedProps>) => {
  return <tbody className={props.className}>{props.children}</tbody>;
});

const TableRow = provideStyles((props: MakeFnComponentProps<ISharedProps>) => {
  const { classes, children, className } = props;
  return <tr className={cn(classes.row, className)}>{children}</tr>;
});

const TableCell = React.memo(provideStyles((props: MakeFnComponentProps<ISharedProps & ICellProps>) => {
  const { classes, children, align, className } = props;
  return <td align={align} className={cn(classes.cell, className)}>{children}</td>;
}));

export { TableComponent as Table, TableHead, TableBody, TableRow, TableCell };
