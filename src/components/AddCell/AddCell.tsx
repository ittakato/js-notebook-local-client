import React from 'react';

import { useTypedDispatch } from '../../hooks/use-typed-selector';
import { cellSliceActions } from '../../state';

import './AddCell.scss';

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

function AddCell(props: AddCellProps) {
  const dispatch = useTypedDispatch();

  function addCodeCellHandler() {
    dispatch(
      cellSliceActions.insertCellAfter({
        id: props.previousCellId,
        type: 'code',
      })
    );
  }

  function addTextCellHandler() {
    dispatch(
      cellSliceActions.insertCellAfter({
        id: props.previousCellId,
        type: 'text',
      })
    );
  }

  return (
    <div className={`add-cell ${props.forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <button
          className="button is-primary is-rounded is-small"
          onClick={addCodeCellHandler}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-primary is-rounded is-small"
          onClick={addTextCellHandler}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
}

export default AddCell;
