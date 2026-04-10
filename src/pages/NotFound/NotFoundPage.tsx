import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-950 text-gray-200">
      <span className="text-6xl font-extrabold text-emerald-700">404</span>
      <p className="text-xl text-gray-400">Page not found</p>
      <Link
        to="/"
        className="rounded-sm bg-emerald-950 px-4 py-2 text-sm outline outline-1 outline-emerald-700 hover:bg-emerald-900"
      >
        Go home
      </Link>
    </div>
  );
};
