import React from "react";
import PersonCard from "./PersonCard";

export default function PeopleList({ people }) {
  return (
    <div className="people-list">
      {people.length === 0 ? (
        <p>No people found</p>
      ) : (
        people.map((person) => <PersonCard key={person.id} person={person} />)
      )}
    </div>
  );
}