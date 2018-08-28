import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '~/store/actions/todo';

const AddTodo = props => {
  let input;
  return (
    <div className="addTodo">
      <input
        onKeyPress={e => e.key === 'Enter' && props.onClick(input)}
        ref={node => input = node}
        type="text"
      />
      {/* <button onClick={() => props.onClick(input)}>Add Todo</button> */}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  onClick: (input) => {
    if (!input.value.trim()) {
      return;
    }
    dispatch(addTodo(input.value));
    input.value = '';
  }
});

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
