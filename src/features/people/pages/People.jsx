import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPeopleAction } from "../peopleSlice";
import PeopleList from "../components/PeopleList";

export function People() {
  const { people, isLoading, errors } = useSelector(
    (store) => store.peopleSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPeopleAction());
  }, []);

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
      <h1>People</h1>
      <PeopleList people={people} />
    </div>
  );
}
