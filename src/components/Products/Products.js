import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";


function Products(props) {
  const history = useHistory();
 
  return (
    <div className="container-fluid mx-3 products__section">
     
    </div>
  );
}


function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     getAllProducts: () => dispatch(getAllProducts()),
//   };
// }

export default connect(mapStateToProps, null)(Products);
