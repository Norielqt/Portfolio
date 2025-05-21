import React from "react";

export default function Footer() {
  return (
    <footer className="py-8 text-center text-gray-600 dark:text-gray-400">
      <p>
        &copy; {new Date().getFullYear()} Noriel Fulgencio — All rights reserved.
      </p>
    </footer>
  );
}
