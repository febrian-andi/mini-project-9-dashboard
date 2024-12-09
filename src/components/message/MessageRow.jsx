import React from "react";
import { useDeleteData } from "../../hooks/useDeleteData";
import { useFetchData } from "../../hooks/useFetchData";

export const MessageRow = ({ message, index }) => {
  const { deleteData } = useDeleteData(`/message`);
  const { refetch } = useFetchData("/message");

  const handleDelete = () => {
    deleteData(message.id, refetch);
  };

  return (
    <tr
      key={message.id}
      className="border-b border-gray-200 hover:bg-gray-100"
    >
      <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
      <td className="py-3 px-6 text-left"><span className="line-clamp-3">{message.name}</span></td>
      <td className="py-3 px-6 text-left"><span className="line-clamp-3">{message.email}</span></td>
      <td className="py-3 px-6 text-left"><span className="line-clamp-3">{message.website}</span></td>
      <td className="py-3 px-6 text-left"><span className="line-clamp-3">{message.message}</span></td>
    </tr>
  );
};

export default MessageRow;
