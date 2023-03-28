import React from 'react';

import { useTypedDispatch } from '../../hooks/use-typed-selector';
import { cellSliceActions } from '../../state';

import './ActionBar.scss';

interface ActionBarProps {
  id: string;
}

function ActionBar(props: ActionBarProps) {
  const dispatch = useTypedDispatch();

  function moveCellUpHandler() {
    dispatch(
      cellSliceActions.moveCell({
        id: props.id,
        direction: 'up',
      })
    );
  }

  function moveCellDownHandler() {
    dispatch(
      cellSliceActions.moveCell({
        id: props.id,
        direction: 'down',
      })
    );
  }

  function deleteCellHandler() {
    dispatch(
      cellSliceActions.deleteCell({
        id: props.id,
      })
    );
  }

  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={moveCellUpHandler}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={moveCellDownHandler}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={deleteCellHandler}
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
}

export default ActionBar;
