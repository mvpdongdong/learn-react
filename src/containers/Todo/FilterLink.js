import { connect } from 'react-redux';
import { setVisibilityFilter } from '~/store/actions/todo';
import Link from '~/components/Todo/Link';

const mapStateToProps = (state, ownProps) => ({
  active: state.visibilityFilter === ownProps.filter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);
