import React from "react";

export const formatDate = (dateString) => {
    const date = new Date(dateString);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const options = {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const timeWIB = date.toLocaleTimeString("en-US", options);

    const formattedTimeWIB = `${timeWIB.replace(":", ".")} WIB`;

    return `${day} ${month} ${year}, ${formattedTimeWIB}`;
};
