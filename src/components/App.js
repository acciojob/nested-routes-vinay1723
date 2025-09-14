// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
} from "react-router-dom";

// --- Layout Component with Navigation ---
function Layout() {
  return (
    <main>
      <h1>Shop Categories</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="women">Women</Link>
          </li>
        </ul>
      </nav>
      {/* <hr /> */}
      <Outlet />
    </main>
  );
}

// --- Category Component ---
function Category({ items }) {
  return (
    <div>
      <p>Women Items:</p>
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            <Link to={item.name}>{item.name}</Link>{" "}
            {/* 👈 use name instead of id */}
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}

function ItemDetail({ items }) {
  const { itemId } = useParams(); // now itemId = item.name
  const item = items.find((i) => i.name === itemId);
  return (
    <div>
      {item ? (
        <p>
          <strong>{item.name}</strong>
        </p>
      ) : (
        <p>Item not found.</p>
      )}
    </div>
  );
}

// --- Data ---
const data = {
  women: [
    { id: 1, name: "Grooming", description: "Beautiful red dress" },
    { id: 2, name: "Shirt", description: "Leather handbag" },
    { id: 2, name: "Trouser", description: "Leather handbag" },
    { id: 2, name: "Jewellery", description: "Leather handbag" },
  ],
  men: [
    { id: 1, name: "Shirt", description: "Formal cotton shirt" },
    { id: 2, name: "Shoes", description: "Running shoes" },
  ],
  kids: [
    { id: 1, name: "Toy Car", description: "Remote control car" },
    { id: 2, name: "Puzzle", description: "100-piece puzzle" },
  ],
};

// --- App Component ---
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Index</div>} />
          {/* Women Category */}
          <Route path="women" element={<Category items={data.women} />}>
            <Route path=":itemId" element={<ItemDetail items={data.women} />} />
          </Route>

          {/* Men Category */}
          <Route path="men" element={<Category items={data.men} />}>
            <Route path=":itemId" element={<ItemDetail items={data.men} />} />
          </Route>

          {/* Kids Category */}
          <Route path="kids" element={<Category items={data.kids} />}>
            <Route path=":itemId" element={<ItemDetail items={data.kids} />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
