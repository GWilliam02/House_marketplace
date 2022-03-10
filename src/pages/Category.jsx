import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  setDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Fetch a reference
        const listingsRef = collection(db, "listing");

        //create a query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        //Excute Query
        const querySnap = await getDocs(q);

        let listings = [];
        querySnap.forEach(async (doc) => {
          console.log(doc);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  });

  return <div>Category</div>;
}

export default Category;
