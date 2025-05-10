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

export function MyTable() {
  return (
    <div className="w-full p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Team Members
        </h2>
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-gray-700">Title</TableHead>
              <TableHead className="text-gray-700">Movie/Series</TableHead>
              <TableHead className="text-gray-700">Category</TableHead>
              <TableHead className="text-gray-700">Rating</TableHead>
              <TableHead className="text-right text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {all.map(user =>
              <TableRow
                key={user.email}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.imageUrl} alt={user.name} />
                      <AvatarFallback>
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm font-medium text-gray-900">
                    {user.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.department}
                  </p>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    {user.status}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-900">
                  {user.role}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="text-sm">
                    Edit
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
