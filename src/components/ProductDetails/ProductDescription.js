import React from "react";

function ProductDescription({ product }) {
  return (
    <div className="border p-3 productDetailsParent mb-5">
      <h4 className="py-2 text-secondary">সম্পদের বিস্তারিত বর্ণনা</h4>
      <div className="d-flex justify-content-around pb-3 border-bottom">
        <h5>ক্যাটাগরি: {product.category}</h5>
        <h5>সম্পদের অবস্থা: {product.condition || "ব্যবহৃত"}</h5>
      </div>
      <div>
        <h5 className="mt-4">{product.description}</h5>
      </div>
    </div>
  );
}

export default ProductDescription;
