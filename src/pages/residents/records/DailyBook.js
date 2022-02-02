import React, { useEffect, useState } from "react";
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const [values, setValues] = useState(null);
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
          {loading && <p>Daily book is loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          {dailyObservationItems &&
            dailyObservationItems.map((item) => {
              return (
                <div key={item._id} className="ms-2">
                  <label>{item.description}</label>
                  <br />
                  {item.element === "text" ? (
                    <input
                      type={item.element}
                      onChange={(e) =>
                        setValues({ ...values, [item.name]: e.target.value })
                      }
                    />
                  ) : item.element === "textarea" ? (
                    <textarea
                      onChange={(e) =>
                        setValues({ ...values, [item.name]: e.target.value })
                      }
                    ></textarea>
                  ) : item.element === "selection" ? (
                    <select
                      onChange={(e) =>
                        setValues({ ...values, [item.name]: e.target.value })
                      }
                    >
                      {item.values.map((val) => {
                        return <option value={val}>{val}</option>;
                      })}
                    </select>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          <button onClick={handleSubmit}>Save Records</button>
        </>
      )}
    </div>
  );
};

export default DailyBook;
