"use client";
import Image from "next/image";
import heroProduct from "../../../public/hero-product.jpg";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [products, setProducts] = useState<
    { name: string; price: number; color: string }[]
  >([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("");
  const [minMax, setMinMax] = useState<{ min?: number; max?: number }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(sort ? { sort } : {}),
        ...(minMax.min != null ? { min: minMax.min.toString() } : {}),
        ...(minMax.max != null ? { max: minMax.max.toString() } : {}),
      });

      const res = await fetch(`http://localhost:5000/headphones?${params}`);
      const data = await res.json();

      // handle both wrapped‐and‐raw shapes:
      const items = Array.isArray(data) ? data : data.items;
      const count = Array.isArray(data) ? data.length : data.total;

      setProducts(items);
      setTotal(count);
    };

    fetchProducts();
  }, [page, limit, sort, minMax]);

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
    alert("Added to basket!");
  };

  return (
    <div className="row no-gutter">
      <div className="col-lg-2">
        <p>Sort by prices</p>
        
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

      <div className="col-lg-10">
        <div className="row no-gutter">
          <p className="product-title bold col-lg-10">Our products</p>
          <div className="col-lg-2">
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

        <div className="row">
          {products?.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="col-lg-3 col-6">
                <div className="hero-product-box">
                  <Image
                    src={heroProduct}
                    alt={`${product.name} image`}
                    className="hero-product-image"
                  />
                  <div className="row">
                    <p className="col-6 bold">{product.name}</p>
                    <p className="col-6 text-end">£{product.price}</p>
                  </div>
                  <div className="row">
                    <p className="col-6">{product.color}</p>
                    <button
                      className="col-6 text-end"
                      onClick={() => addToBasket(product)}
                    >
                      Add to basket
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>

        <div className="pagination-controls mt-3">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>
            Page {page} of {Math.ceil(total / limit)}
          </span>
          <button
            disabled={page >= Math.ceil(total / limit)}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              setPage(1);
            }}
          >
            <option value={12}>12 / page</option>
            <option value={25}>25 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
