import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

import { cellSliceActions } from '../state';

function useActions() {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(cellSliceActions, dispatch);
  }, [dispatch]);
}

export default useActions;
