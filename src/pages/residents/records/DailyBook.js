import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getItems } from "../../../redux/actions/dailyObservationItemActions";
import { getServiceUser } from "../../../redux/actions/serviceUserActions";
import { getService } from "../../../redux/actions/serviceActions";

const DailyBook = () => {
  const dispatch = useDispatch();
  const su = useSelector((state) => state.serviceUserDetails);
  const { dailyObservationItems, loading, error } = useSelector(
    (state) => state.dailyObservationItemList
  );
  const { slug, resident } = useParams();
  useEffect(() => {
    dispatch(getService(slug));
    dispatch(getItems(slug));
    dispatch(getServiceUser(slug, resident));
  }, [dispatch]);
  return (
    <div>
      {su.loading && <p>Loading...</p>}
      {su.error && <p className="text-danger">{error}</p>}
      {su.serviceUser && (
        <>
          <h2>Daily records for {su.serviceUser.name}</h2>
        </>
      )}
    </div>
  );
};

export default DailyBook;
