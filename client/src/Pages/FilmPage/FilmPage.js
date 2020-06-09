import React, { useState } from "react";

const FilmPage = (props) => {
  const filmId = props.match.params.filmId;
  const user = props.user;
  const [note, setNote] = useState("")
  const updateNote = (e) => {
    setNote(e.target.value)
  }
  return (
    <div>
      <div>
        {filmId}
      </div>

      {user
        ? (
          <select
            value={note}
            onChange={updateNote}
          >
            <option value={0}>Non noté</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>)
        : null
      }
    </div>);
};

export default FilmPage;
