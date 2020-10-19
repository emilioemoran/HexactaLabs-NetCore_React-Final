import api from "../../../common/api";
import { normalize } from "../../../common/helpers/normalizer";

const initialState = {
  loading: false,
  ids: [],
  byId: {}
};

/* Action Types */
const LOADING = "ORDERS_LOADING";
const SET = "ORDERS_SET";

export const ActionTypes = {
  LOADING,
  SET
};

/* Reducer handlers */
function handleLoading(state, { loading }) {
  return {
    ...state,
    loading
  };
}

function handleSet(state, { orders }) {
  return {
    ...state,
    ids: orders.map(order => order.id),
    byId: normalize(orders)
  };
}

const handlers = {
  [LOADING]: handleLoading,
  [SET]: handleSet,
};

export default function reducer(state = initialState, action) {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}

/* Actions */
export function setLoading(status) {
  return {
    type: LOADING,
    loading: status
  };
}

export function setOrders(orders) {
  return {
    type: SET,
    orders
  };
}

export function fetchAll() {
    return function (dispatch) {
      dispatch(setLoading(true));
      return api
        .get("/order")
        .then(response => {
          dispatch(setOrders(response.data));
          return dispatch(setLoading(false));
        })
        .catch(() => {
          return dispatch(setLoading(false));
        });
    };
}

export function fetchById(id) {
    return function (dispatch) {
      dispatch(setLoading(true));
      return api
        .get(`/order/${id}`)
        .then(response => {
          dispatch(setOrders(response.data));
          return dispatch(setLoading(false));
        })
        .catch(() => {
          return dispatch(setLoading(false));
        });
    };
  }

/* Selectors */
function base(state) {
    return state.orders.list;
  }

  export function getLoading(state) {
    return base(state).loading;
  }

  export function getOrdersById(state) {
    return base(state).byId;
  }

  export function getOrderById(state, id) {
    return getOrdersById(state)[id] || {};
  }

  export function makeGetOrdersMemoized() {
    let cache;
    let value = [];
    return state => {
      if (cache === getOrdersById(state)) {
        return value;
      }
      cache = getOrdersById(state);
      value = Object.values(getOrdersById(state));
      return value;
    };
  }

  export const getOrders = makeGetOrdersMemoized();