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
    <div>
      <h1>Shop Categories</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="women">Women</Link>
          </li>
          <li>
            <Link to="men">Men</Link>
          </li>
          <li>
            <Link to="kids">Kids</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

// --- Category Component ---
function Category({ items }) {
  return (
    <div>
      <h2>Category Items</h2>
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
      <h3>Item Details</h3>
      {item ? (
        <p>
          <strong>{item.name}</strong> — {item.description}
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
    { id: 1, name: "Dress", description: "Beautiful red dress" },
    { id: 2, name: "Handbag", description: "Leather handbag" },
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
