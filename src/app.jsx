import { useEffect, useState } from "react";
import "./App.css";
let apiUrl = "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiUrl, {
      headers: {
        "dev-email-address": "vitorromero97@hotmail.com",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          if (
            (response.status === 500) ||
            response.status === 502 ||
            response.status === 503 ||
            response.status === 504 ||
            response.status === 507 ||
            response.status === 508 ||
            response.status === 509
          ) {
            throw new Error(
              `O servidor falou em responder, tente recarregar a página`
            );
          } else {
            throw new Error("Erro ao carregar os dados");
          }
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="container mx-auto">
        {loading && <div>Loading...</div>}
        {error && (
          <div>{`O servidor falhou em responder, tente recarregar a página`}</div>
        )}
        <div className="grid grid-cols-3 gap-4">
          {data &&
            data.map((item) => (
              <div className="card" key={item.id}>
                <img src={item.thumbnail} alt="" />
                <h3 className="text-left">{item.title}</h3>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;