import React from "react";
import "./blog-card.css";
import Link from "next/link";

function BlogCard(props) {
  const hotelData = props.data;
  return (
    <div className="hotel-card shadow-md rounded-lg m-auto p-1">
      <Link className="linkClass" href={`/hotel/${hotelData._id}`}>
        <div className="col mt-3">
          <div className="card  border-0 bg-transparent">
            <img
              src={hotelData.images.picture_url}
              className="card-img-top rounded-3"
              alt="..."
            />
            <div className="card-body w-100">
              <div className="d-flex justify-content-between card-title">
                <p className="text-start m-1 text-gray-800">
                  {hotelData.address.street.slice(0, 30) +
                    `${hotelData.address.street.length > 30 ? "..." : ""}`}
                </p>
                <p className="m-1">
                  {Object.keys(hotelData.review_scores).length > 0
                    ? "⭐" +
                      (
                        (parseInt(
                          hotelData.review_scores.review_scores_rating
                        ) /
                          100) *
                        5
                      ).toFixed(1)
                    : "⭐"}
                </p>
              </div>
              <p className=" card-text text-start m-1">
                ₹ {(hotelData.price.$numberDecimal * 83.31).toFixed(0)} / Night
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BlogCard;
