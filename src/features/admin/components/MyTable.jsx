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

export function MyTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    // ممكن تستدعي هنا جلب الداتا مش الحذف
    // dispatch(fetchMoviesAction());
  }, []);
  const deleteHandler = movieId => {
    dispatch(deleteMovieAction(movieId));
  };

  console.log(all);

  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Team Members
        </h2>
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-gray-700 ps-3">Movie</TableHead>
              <TableHead className="text-gray-700">Category</TableHead>
              <TableHead className="text-gray-700">Audience </TableHead>
              <TableHead className="text-gray-700">Rating</TableHead>
              <TableHead className="text-right text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {all.map(movie =>
              <TableRow
                key={movie.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3  me-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={movie.poster_url} alt={movie.title} />
                      <AvatarFallback>
                        {movie.title.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium mb-2 text-gray-900">
                        {movie.title}
                      </p>
                      <p className="text-sm text-gray-500 break-words whitespace-normal">
                        {movie.release_date}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm font-medium  mb-2 text-gray-900">
                    {movie.genres.join(", ")}
                  </p>
                  <p className="text-sm text-gray-500 break-words whitespace-normal">
                    {movie.reviews.map(r => r.author).join(", ")}
                  </p>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center me-4 rounded-full px-2 py-0.5 text-xs font-medium
      ${movie.adult
        ? "bg-green-100 text-green-700"
        : "bg-blue-100 text-blue-700"}`}
                  >
                    {movie.adult ? "Adults" : "General"}
                  </span>
                </TableCell>
                <TableCell className="text-sm  text-gray-900">
                  <div className="flex flex-col items-start space-y-1">
                    <div className="flex items-center text-sm text-yellow-600 font-medium">
                      ⭐ {movie.vote_average}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      🗳️ {movie.vote_count} votes
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm mx-1 hover:bg-blue-600 text-blue-500 border-blue-500 px-4 py-2 rounded-lg"
                  >
                    <FaEye />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm mx-1 hover:bg-green-600 text-green-500 border-green-500 px-4 py-2 rounded-lg"
                  >
                    <TiEdit />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteHandler(986056)}
                    className="text-sm mx-1 hover:bg-red-600 text-red-500 border-red-500 px-4 py-2 rounded-lg"
                  >
                    <MdDelete />
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
