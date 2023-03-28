import React from 'react';

import TextEditor from '../TextEditor/TextEditor';
import CodeCell from '../CodeCell/CodeCell';
import ActionBar from '../ActionBar/ActionBar';

import type { Cell } from '../../state';

import './CellListItem.scss';

interface CellListItemProps {
  cell: Cell;
}

function CellListItem(props: CellListItemProps) {
  let child: JSX.Element;

  if (props.cell.type === 'code') {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={props.cell.id} />
        </div>
        <CodeCell cell={props.cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={props.cell} />
        <ActionBar id={props.cell.id} />
      </>
    );
  }

  return <div className="cell-list-item">{child}</div>;
}

export default CellListItem;
