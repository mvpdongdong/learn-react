import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <div className="undo-redo">
    <button onClick={onUndo} disabled={!canUndo}>
      Undo
    </button>
    <button style={{ marginLeft: '4px' }} onClick={onRedo} disabled={!canRedo}>
      Redo
    </button>
  </div>
);

const mapStateToProps = state => ({
  canUndo: state.todos.past.length > 0,
  canRedo: state.todos.future.length > 0
});

const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedo);
