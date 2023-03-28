import React from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';

import AddCell from '../AddCell/AddCell';
import CellListItem from '../CellListItem/CellListItem';

function CellList() {
  const cells = useTypedSelector((state) => {
    const { cell } = state;
    const { order, data } = cell;
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => (
    <React.Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </React.Fragment>
  ));

  return (
    <div>
      {renderedCells}
      <AddCell forceVisible={cells.length === 0} nextCellId={null} />
    </div>
  );
}

export default CellList;
