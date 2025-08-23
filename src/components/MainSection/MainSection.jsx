"use client";




const MainSection = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
     
      {/* Navbar */}
      <header className="p-4 shadow bg-white">My Navbar</header>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>

      {/* Footer */}
      <footer className="p-4 text-center bg-gray-100">My Footer</footer>
    </div>
  );
};

export default MainSection;
