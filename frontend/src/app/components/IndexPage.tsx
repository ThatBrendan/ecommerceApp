"use client";

import Image from "next/image";
import hero from "../../../public/hero-image.jpg";
import heroProduct from "../../../public/hero-product.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";

const IndexPage = () => {
  const [products, setProducts] = useState<
    Array<{ name: string; color: string; price: string }>
  >([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/headphones");
        const data = await response.json();
        setProducts(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="row no-gutter">
      <div className="hero-image-container col-12">
        <div>
          <Image src={hero} alt="Hero Image" className="hero-image" />
        </div>

        <div className="hero-text-box hide-mobile">
          <p className="hero-title bold">Welcome to our website</p>
          <span className="hero-text">
            Your one stop shop for the best headphones
          </span>
        </div>
      </div>

      <div className="hero-product-container row no-gutter">
        <p className="product-title bold">Our products</p>
        <div className="product-link">
          <Link href="/products" className="hero-product-link">
            <p className="text-underline">See more products</p>
          </Link>
        </div>

        {products.map((product, index) => (
          <div key={index} className="col-lg-4 col-6">
            <div className="hero-product-box">
              <Image
                src={heroProduct}
                alt={`${product.name} image`}
                className="hero-product-image"
              />
              <p className="bold">{product.name}</p>
              <div className="row no-gutter">
                <p className="col-6">{product.color}</p>
                <p className="col-6 text-end">{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
