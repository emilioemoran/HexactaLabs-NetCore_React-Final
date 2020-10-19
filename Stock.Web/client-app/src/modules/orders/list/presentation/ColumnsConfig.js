import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FcSearch } from "react-icons/fc";

const renderToolbar = ({ value }) => {
  let viewButton = (
    <Link className="order-list__button" to={`/orders/view/${value}`}>
      <FcSearch className="order__button-icon" />
    </Link>
  );

  return (
    <span>
      {viewButton}
    </span>
  );
};

const HeaderComponent = props => {
  return (
    <h2>
      {props.title}
    </h2>
  );
};

const productsName = (props) => {
  let names = props.row._original.products.map(products => products.name);
  return (
    <ul>
    {names.map(name => <li key ="name" className= "tableCells">{name}</li>)}
  </ul>
  );
};

HeaderComponent.displayName = "HeaderComponent";


const columns = [
  {
    Header: <HeaderComponent title="Precio total"/>,
    accessor: "totalPrice",
    headerClassName:"tableHeader",
    className : "tableCells",
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Productos comprados" />,
    accessor: "products.name",
    headerClassName:"tableHeader",
    className : "tableCells",
    Cell: productsName
  },
  {
    Header: <HeaderComponent title="Acciones" />,
    accessor: "id",
    headerClassName:"tableHeader",
    className : "tableCells",
    Cell: renderToolbar
  }
];

HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

renderToolbar.propTypes = {
  value: PropTypes.string.isRequired
};

productsName.propTypes = {
  row: PropTypes.string.isRequired
};

export default columns;