import { useTypedSelector } from './use-typed-selector';

function useCumulativeCode(cellId: string) {
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cell;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
      var show = (value) => {
        const root = document.getElementById('root');

        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root);
            return;
          }
          root.innerHTML = JSON.stringify(value);
          return;
        }
        root.innerHTML = value;
      }
    `;

    const showFuncNOP = `
      var show = () => {};
    `;

    const cumulativeCode = [
      `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
    `,
    ];

    for (const cell of orderedCells) {
      if (cell.type === 'code') {
        if (cell.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNOP);
        }
        cumulativeCode.push(cell.content);
      }
      if (cell.id === cellId) {
        break;
      }
    }

    return cumulativeCode;
  });

  return cumulativeCode.join('\n');
}

export default useCumulativeCode;
