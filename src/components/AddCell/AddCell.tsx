import React from 'react';

import useActions from '../../hooks/use-actions';

import './AddCell.scss';

interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

function AddCell(props: AddCellProps) {
  const { insertCellBefore } = useActions();

  function addCodeCellHandler() {
    insertCellBefore({
      id: props.nextCellId,
      type: 'code',
    });
  }

  function addTextCellHandler() {
    insertCellBefore({
      id: props.nextCellId,
      type: 'text',
    });
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
