import React from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';

import AddCell from '../AddCell/AddCell';
import CellListItem from '../CellListItem/CellListItem';

import './CellList.scss';

function CellList() {
  const cells = useTypedSelector((state) => {
    const { cell } = state;
    const { order, data } = cell;
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </React.Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
}

export default CellList;
