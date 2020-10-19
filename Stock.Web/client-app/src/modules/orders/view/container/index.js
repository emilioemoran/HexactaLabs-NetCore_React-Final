import { connect } from "react-redux";
import { push } from "connected-react-router";
import { getOrderById, getLoading, fetchById} from "../../list/index";
import Presentation from "../presentation";

const mapStateToProps = (state, ownProps) => {
  return {
    data: getOrderById(state, ownProps.match.params.id),
    dataLoading: getLoading(state),
    defaultPageSize: 5
  };
};

const mapDispatchToProps = {
  fetchById,
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentation);