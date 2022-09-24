import React, { useState } from "react";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import { I_Repo } from "../models/models";

export const RepoCart = ({ repo }: { repo: I_Repo }) => {
  const { addFavourite, removeFavourite } = useActions();
  const { favoutites } = useAppSelector((state) => state.github);

  const [isFav, setIsFav] = useState(favoutites.includes(repo.html_url));

  const addToFavourites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavourite(repo.html_url);
    setIsFav(true);
  };

  const removeFromFavourites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavourite(repo.html_url);
    setIsFav(false);
  };
  return (
    <div className="border px-5 py-3 rounded mb-2 hover:shadow-md hover:bg-pink-400 transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className=" text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>
      </a>

      {!isFav && (
        <button
          onClick={addToFavourites}
          className="py-2 px-4 mr-2 bg-pink-200 rounded hover:bg-white transition-all"
        >
          {" "}
          ADD{" "}
        </button>
      )}
      {isFav && (
        <button
          onClick={removeFromFavourites}
          className="py-2 px-4 bg-rose-200 rounded hover:bg-pink-600 transition-all"
        >
          {" "}
          REMOVE{" "}
        </button>
      )}
    </div>
  );
};
