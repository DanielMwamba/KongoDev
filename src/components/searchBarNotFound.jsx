import React from "react";

export default function SearchBarNotFound() {
  return (
    <>
      <div className="px-16 py-20 text-center">
        <h2 className="font-semibold text-black">Aucun résultat trouvé</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Nous ne trouvons rien avec ce terme pour le moment, essayez de
          chercher autre chose.
        </p>
      </div>
    </>
  );
}
