"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [products, setProducts] = useState<
    { name: string; price: number; color: string; img: string }[]
  >([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [minMax, setMinMax] = useState<{ min?: number; max?: number }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchItem.length >= 3) {
        const res = await fetch(
          `http://localhost:5000/products/headphones?q=${searchItem}`
        );
        const data = await res.json();

        console.log("Api Response:", data);
        setProducts(data.slice((page - 1) * limit, page * limit));
        setTotal(data.length);
      } else {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(sort ? { sort } : {}),
          ...(searchItem ? { q: searchItem } : {}),
          ...(minMax.min != null ? { min: minMax.min.toString() } : {}),
          ...(minMax.max != null ? { max: minMax.max.toString() } : {}),
        });

        const res = await fetch(
          `http://localhost:5000/products/headphones?${params}`
        );
        const data = await res.json();

        // handle both wrapped‐and‐raw shapes:
        const items = Array.isArray(data) ? data : data.items;
        const count = Array.isArray(data) ? data.length : data.total;

        setProducts(items);
        setTotal(count);
      }
    };

    fetchProducts();
  }, [page, limit, sort, minMax, searchItem]);

  const addToBasket = async (product: {
    name: string;
    price: number;
    color: string;
  }) => {
    await fetch("http://localhost:5000/basket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    alert("Product added to basket!");
  };

  return (
    <div className="row no-gutter">
      <div className="col-lg-2">
        <p>Sort by prices</p>
        <div className="filter-radio">
          <input
            type="radio"
            name="range"
            id="range-100+"
            onChange={() => {
              setMinMax({ min: 0 });
              setPage(1);
            }}
          />{" "}
          <label htmlFor="range-100+">All</label>
          <br />
          <input
            type="radio"
            name="range"
            id="range-0-60"
            onChange={() => {
              setMinMax({ min: 0, max: 60 });
              setPage(1);
            }}
          />{" "}
          <label htmlFor="range-0-60">£0–£60</label>
          <br />
          <input
            type="radio"
            name="range"
            id="range-61-100"
            onChange={() => {
              setMinMax({ min: 61, max: 100 });
              setPage(1);
            }}
          />{" "}
          <label htmlFor="range-61-100">£61–£100</label>
          <br />
          <input
            type="radio"
            name="range"
            id="range-100+"
            onChange={() => {
              setMinMax({ min: 100 });
              setPage(1);
            }}
          />{" "}
          <label htmlFor="range-100+">£100+</label>
        </div>
      </div>

      <div className="col-lg-10">
        <div className="row no-gutter">
          <p className="product-title bold col-lg-8 col-6">Our products</p>
          <div className="col-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchItem}
              onChange={(e) => {
                setSearchItem(e.target.value);
                setPage(1);
              }}
              className="search-input"
            />
          </div>
          <div className="col-lg-2 product-sort col-4">
            <select
              className="col-lg-2"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Default</option>
              <option value="price_asc">Low to High</option>
              <option value="price_desc">High to Low</option>
            </select>
          </div>
        </div>

        <div className="row no-gutter">
          {products?.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="col-lg-3 col-6">
                <div className="hero-product-box">
                  <Image
                    src={product.img}
                    alt={`${product.name} image`}
                    className="hero-product-image"
                    width={200}
                    height={200}
                  />
                  <div className="row no-gutter">
                    <p className="col-9 bold">{product.name}</p>
                    <p className="col-3 text-end">£{product.price}</p>
                  </div>
                  <div className="row no-gutter">
                    <p className="col-lg-6 col-4">{product.color}</p>
                    <div className="col-lg-6 col-8">
                      <button
                        className="col-6 text-end basketButton"
                        onClick={() => addToBasket(product)}
                      >
                        Add to basket
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>

        <div className="pagination-controls row no-gutter">
          <div className="col-6">
            <select
              value={limit}
              onChange={(e) => {
                setLimit(parseInt(e.target.value));
                setPage(1);
              }}
            >
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
            </select>
          </div>
          <div className="col-6 text-end pagination-buttons">
            <span>
              Page {page} of {Math.ceil(total / limit)}
            </span>
            <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>

            <button
              disabled={page >= Math.ceil(total / limit)}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
