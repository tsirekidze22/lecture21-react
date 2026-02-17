import Header from "./components/Header";
import ProductsList from "./components/ProductsList";

const ProductsArray = [
  { id: 1, title: "Keyboard", description: "Gaming Keyboard" },
  { id: 2, title: "Laptop", description: "Asus Laptop" },
  { id: 3, title: "Monitor", description: "4K Monitor" },
  { id: 4, title: "Mouse", description: "Gaming Mouse" },
];

function App() {
  return (
    <>
      <Header />
      <ProductsList products={ProductsArray} />
    </>
  );
}

export default App;
