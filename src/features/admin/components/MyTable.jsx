import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { all } from "./localData";
import { FaEye } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteMovieAction } from "../../movies/movieSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export function MyTable({ type, tableTitle }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // ممكن تستدعي هنا جلب الداتا مش الحذف
    // dispatch(fetchMoviesAction());
  }, []);

  const deleteHandler = movieId => {
    type === "movie" && dispatch(deleteMovieAction(movieId));
    type === "series" && dispatch(deleteMovieAction(movieId));
    type === "all" && dispatch(deleteMovieAction(movieId));
  };

  console.log(all);

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-7 text-gray-800">
          {tableTitle}
        </h2>
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-gray-700 ps-3">
                {type}
              </TableHead>
              <TableHead className="text-gray-700">Category</TableHead>
              <TableHead className="text-gray-700">Audience</TableHead>
              <TableHead className="text-gray-700">Rating</TableHead>
              <TableHead className="text-gray-700 text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {all.map(item =>
              <TableRow
                key={item.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3  me-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item.poster_url} alt={item.title} />
                      <AvatarFallback>
                        {item.title.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium mb-2 text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500 break-words whitespace-normal">
                        {item.release_date}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm font-medium  mb-2 text-gray-900">
                    {item.genres.join(", ")}
                  </p>
                  <p className="text-sm text-gray-500 break-words whitespace-normal">
                    {item.reviews.map(r => r.author).join(", ")}
                  </p>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center me-4 rounded-full px-2 py-0.5 text-xs font-medium
      ${item.adult
        ? "bg-green-100 text-green-700"
        : "bg-blue-100 text-blue-700"}`}
                  >
                    {item.adult ? "Adults" : "General"}
                  </span>
                </TableCell>
                <TableCell className="text-sm  text-gray-900">
                  <div className="flex flex-col items-start space-y-1">
                    <div className="flex items-center text-sm text-yellow-600 font-medium">
                      ⭐ {item.vote_average}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      🗳️ {item.vote_count} votes
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center items-center gap-2">
                    <Link
                      to={`/admin/${item.id}`}
                      className="p-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white transition duration-200"
                      title="View"
                    >
                      <FaEye size={16} />
                    </Link>

                    <Link
                      to={`/admin/${item.id}/${type === "movie"
                        ? "editMovie"
                        : "editSeries"}`}
                      className="p-2 rounded-md border border-green-500 text-green-500 hover:bg-green-600 hover:text-white transition duration-200"
                      title="Edit"
                    >
                      <TiEdit size={18} />
                    </Link>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteHandler(item.id)}
                      className="p-2 rounded-md border border-red-500 text-red-500 hover:bg-red-600 hover:text-white transition duration-200"
                      title="Delete"
                    >
                      <MdDelete size={18} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

MyTable.propTypes = {
  type: PropTypes.string.isRequired,
  tableTitle: PropTypes.string.isRequired
};
