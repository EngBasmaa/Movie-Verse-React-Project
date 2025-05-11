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
import { FaEye } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteMovieAction } from "../../movies/movieSlice";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export function MyTable({ type, tableTitle, data, pagination, setPage }) {
  const { currentPage, totalPages } = pagination;
  const dispatch = useDispatch();

  const deleteHandler = movieId => {
    dispatch(deleteMovieAction(movieId));
  };

  return (
    <div className="max-w-full p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-7 text-gray-800">
          {tableTitle}
        </h2>

        <Table className="w-full block md:table">
          <TableHeader className="hidden md:table-header-group">
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
          {data.length === 0 && (
  <TableRow>
    <TableCell colSpan={5} className="text-center text-gray-500">
      No {type} found.
    </TableCell>
  </TableRow>
)}
            {data.map(item =>
              <TableRow
                key={item.id}
                className="flex flex-col md:table-row border border-gray-200 rounded-xl md:rounded-none mb-4 md:mb-0 p-4 md:p-0 shadow-sm md:shadow-none"
              >
                {/* Title + Date */}
                <TableCell className="font-medium break-words whitespace-normal">
                  <div className="md:hidden text-gray-500 text-xs mb-1">
                    {type}
                  </div>
                  <div className="flex items-center space-x-3 me-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item.poster_url} alt={item.title} />
                      <AvatarFallback>
                        {item.title.charAt(0)  }
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium mb-2 text-gray-900 break-words whitespace-normal">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500 break-words whitespace-normal">
                        {item.release_date}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Category */}
                <TableCell>
                  <div className="md:hidden text-gray-500 text-xs mb-1">
                    Category
                  </div>
                  <p className="text-sm font-medium mb-2 text-gray-900 break-words whitespace-normal">
                    {item.genres.join(", ")}
                  </p>
                  <p className="text-sm text-gray-500 break-words whitespace-normal">
                    {item.reviews.map(r => r.author).join(", ")}
                  </p>
                </TableCell>

                {/* Audience */}
                <TableCell className="me-5">
                  <div className="md:hidden text-gray-500 text-xs mb-1">
                    Audience
                  </div>
                  <span
  className={`inline-flex items-center gap-1 me-4 rounded-full px-2 py-0.5 text-xs font-medium
    ${item.adult ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
>
  {item.adult ? (
      <>
      <span className="text-green-500">🔞</span>
      <span>Adults</span>
    </>
  ) : (
    <>
        <span className="text-blue-500">🧒</span>
      <span>General</span>
    </>
  )}
</span>

                </TableCell>

                {/* Rating */}
                <TableCell className="text-sm text-gray-900 me-7">
                  <div className="md:hidden text-gray-500 text-xs mb-1">
                    Rating
                  </div>
                  <div className="flex flex-col items-start space-y-1">
                    <div className="flex items-center text-sm text-yellow-600 font-medium">
                      ⭐ {item.vote_average}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      🗳️ {item.vote_count} votes
                    </div>
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-center">
                  <div className="md:hidden text-gray-500 text-xs mb-1 text-start">
                    Actions
                  </div>
                  <div className="flex justify-start md:justify-center items-center gap-2 mt-2">
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
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete it?")) {
                          deleteHandler(item.id);
                        }
                      }}
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

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center">
          <Button
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            className="mx-2"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-700 mt-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
            className="mx-2"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

MyTable.propTypes = {
  type: PropTypes.string.isRequired,
  tableTitle: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  setPage: PropTypes.func.isRequired
};
