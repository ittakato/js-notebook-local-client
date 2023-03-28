import React, { useEffect, useState } from 'react';
import { ResizableBox, type ResizableBoxProps } from 'react-resizable';

import './Resizable.scss';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

function Resizable(props: ResizableProps) {
  const EDITOR_INITIAL_WIDTH = 0.75;

  const [innerHeight, setInnerHeight] = useState(
    document.documentElement.clientHeight
  );
  const [innerWidth, setInnerWidth] = useState(
    document.documentElement.clientWidth
  );
  const [width, setWidth] = useState(
    document.documentElement.clientWidth * EDITOR_INITIAL_WIDTH
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timer: any;

    function listener() {
      timer = setTimeout(() => {
        setInnerWidth(document.documentElement.clientWidth);
        setInnerHeight(document.documentElement.clientHeight);

        if (
          document.documentElement.clientWidth * EDITOR_INITIAL_WIDTH <
          width
        ) {
          setWidth(document.documentElement.clientWidth * EDITOR_INITIAL_WIDTH);
        }
      }, 100);
    }

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
      clearTimeout(timer);
    };
  }, [width]);

  let resizableProps: ResizableBoxProps;

  if (props.direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.9, Infinity],
      height: Infinity,
      width: width,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return <ResizableBox {...resizableProps}>{props.children}</ResizableBox>;
}

export default Resizable;
