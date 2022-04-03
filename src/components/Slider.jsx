import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Spinner from "./Spinner";
import "swiper/css";
import "swiper/css/bundle";
SwiperCore.use(Navigation, Pagination, Scrollbar, A11y);

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListing(listings);
      setLoading(false);
    };

    getListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    listing && (
      <>
        <p className="exploreHeading">Recommended Listings</p>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          style={{ height: "300px" }}
        >
          {listing.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="swiperSlideDiv"
              >
                <p className="swiperSlideText">{data.name}</p>
                <p className="swiperSlidePrice">
                  $ {data.discountedPrice ?? data.regularPrice}
                  {data.type === "rent" && "/ Month"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}

export default Slider;
