import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "../src/componentes/Sidebar";
import Section from "../src/componentes/Section";
import GenreCard from "../src/componentes/GenreCard";
import Footer from "../src/componentes/Footer";
import LastProduct from "../src/componentes/LastProduct";
import Header from "./componentes/Header";



import { getAllProducts } from "./utils/api";
import { getAllUsers } from "./utils/users";

function App() {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [users, setUsers] = useState([]); // Estado para almacenar los productos
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataProducts = await getAllProducts();
        const dataUsers = await getAllUsers();
        const sortedProducts = dataProducts.products.sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sortedProducts);
        setProductsByCategory(dataProducts.productsByCategory);
        setUsers(dataUsers.users);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Header/>

      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800"> App Dashboard </h1>
              </div>

              <div className="row first-row">

                <Section title="Total User in Data Base">
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {productsByCategory.User}
                  </div>
                </Section>

                <Section title="Total Product in Data Base">
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {productsByCategory.Product}

                  </div>
                </Section>

                <Section title=" Total Categories in Data Base ">
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {productsByCategory.Categories}

                  </div>
                </Section>
              </div>

              <div className="row">
                <LastProduct products={products} />

                <div className="col-lg-6 mb-4">
                  <div className="card">
                    <div className="card-header py-3">
                      <h4 className="m-0 font-weight-bold text-gray-800">
                        Product in Data Base
                      </h4>
                    </div>
                    <div className="card-body">
                      <h5>Huawei</h5>
                      <div className="row">
                        {products.map((product) => {
                          if (product.brand.name === 'Huawei') {
                            return (
                              <GenreCard key={product.id} name={product.title} />
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                    <div className="card-body">
                      <h5>Xiaomi</h5>
                      <div className="row">
                        {products.map((product) => {
                          if (product.brand.name === 'Xiaomi') {
                            return (
                              <GenreCard key={product.id} name={product.title} />
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header py-3">
                      <h4 className="m-0 font-weight-bold text-gray-800">
                        Users in DataBase
                      </h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        {users !== undefined ? (
                          users.map((user) => (
                            <GenreCard key={user.id} name={user.name} />
                          ))
                        ) : (
                          <p>No hay usuarios en nuestra base de datos.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
