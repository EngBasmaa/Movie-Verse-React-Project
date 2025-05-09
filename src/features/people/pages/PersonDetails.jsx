import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPersonByIdAction } from "../peopleSlice";

export function PersonDetails() {
  const { id } = useParams();
  const { selectedPerson, isLoading, errors } = useSelector(
    (store) => store.peopleSlice
  );
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPersonByIdAction(id));
  }, [id, dispatch]);
  
  // UI
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  
  if (errors) {
    return (
      <div>
        <h1>Error {errors}</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Person Details</h1>
      <p>test</p>
    </div>
  );
}