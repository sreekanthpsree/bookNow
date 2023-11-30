import React from "react";
import "./blog-card.css";
import Link from "next/link";

function BlogCard(props) {
  const hotelData = props.data;
  return (
    <div className="hotel-card">
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
                <p className="text-start ">
                  {hotelData.address.street.slice(0, 30) +
                    `${hotelData.address.street.length > 30 ? "..." : ""}`}
                </p>
                <p className="">
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
              <p className=" card-text text-start">
                ₹ {hotelData.price.$numberDecimal * 83.31} / Night
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BlogCard;
