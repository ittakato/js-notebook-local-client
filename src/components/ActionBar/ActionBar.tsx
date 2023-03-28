import React from 'react';

import useActions from '../../hooks/use-actions';

import './ActionBar.scss';

interface ActionBarProps {
  id: string;
}

function ActionBar(props: ActionBarProps) {
  const { moveCell, deleteCell } = useActions();

  function moveCellUpHandler() {
    moveCell({
      id: props.id,
      direction: 'up',
    });
  }

  function moveCellDownHandler() {
    moveCell({
      id: props.id,
      direction: 'down',
    });
  }

  function deleteCellHandler() {
    deleteCell({
      id: props.id,
    });
  }

  return (
    <div className='action-bar'>
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
