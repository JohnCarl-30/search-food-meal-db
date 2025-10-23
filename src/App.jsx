import { useState, useEffect } from "react";

function Header() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        textAlign: "center",
      }}
    >
      <h1>Searching your favorite meal by Meal Db</h1>
    </nav>
  );
}

function MealItem({ meal }) {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        margin: "10px",
        padding: "10px",
        width: "300px",
      }}
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ width: "100%" }}
      />
      <h3>{meal.strMeal}</h3>

      {showInstructions && (
        <p style={{ textAlign: "justify" }}>{meal.strInstructions}</p>
      )}

      <button
        style={{
          display: "block",
          cursor: "pointer",
          marginTop: "10px",
          padding: "8px",
        }}
        onClick={() => setShowInstructions(!showInstructions)}
      >
        {showInstructions ? "Hide" : "Show"} Instructions
      </button>
    </div>
  );
}

function Meals({ meals }) {
  if (!meals) {
    return (
      <p style={{ textAlign: "center" }}>
        No meals found. Try searching for something else!
      </p>
    );
  }

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {meals.map((meal) => (
        <MealItem key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}

function Form({ query, setQuery }) {
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ textAlign: "center", margin: "20px" }}
    >
      <input
        type="text"
        value={query}
        placeholder="Search for your favorite meal"
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "300px",
          height: "35px",
          fontSize: "16px",
          padding: "0 10px",
        }}
      />
      <select>
        <option>Select by</option>
        <option value={category} onChange={(e) => setCategory(e.target.value)}>
          Category
        </option>
        <option value={area} onChange={(e) => setArea(e.target.value)}>
          Country
        </option>
      </select>
    </form>
  );
}

function App() {
  const [meals, setMeals] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchMeals() {
      if (query.trim() === "") {
        setMeals([]);
        return;
      }
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error("Failed to fetch meals:", error);
        setMeals([]);
      }
    }
    fetchMeals();
  }, [query]);

  return (
    <div>
      <Header />
      <Form query={query} setQuery={setQuery} />
      <Meals meals={meals} />
    </div>
  );
}

export default App;
