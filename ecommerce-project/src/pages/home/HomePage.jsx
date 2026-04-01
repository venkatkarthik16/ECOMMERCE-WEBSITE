import axios from "axios";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({ cart, loadCart, searchQuery, setSearchQuery }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };

    getHomeData();
  }, []); // []empty dependency array means this will only run once when the component first mounts

  const filteredProducts = products.filter((product) => {
    const search = searchQuery.toLowerCase();

    return (
      product.name.toLowerCase().includes(search) ||
      product.keywords.some((keyword) => keyword.toLowerCase().includes(search))
    );
  });

  return (
    <>
      <title>Ecommerce Project</title>

      <Header cart={cart} setSearchQuery={setSearchQuery} />

      <div className="home-page">
        {searchQuery && filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>😕 Product not found</h2>
            <p>Try searching with different keywords</p>
          </div>
        ) : (
          <ProductsGrid products={filteredProducts} loadCart={loadCart} />
        )}
      </div>
    </>
  );
}
