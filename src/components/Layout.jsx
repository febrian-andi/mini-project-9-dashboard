import React from "react";

function Layout({ children }) {
  return (
    <div className="md:ml-64 py-6 px-10 mt-16 md:mt-0">
        <div className="bg-white rounded-lg p-6">
            {children}
        </div>
    </div>
  );
}

export default Layout;
