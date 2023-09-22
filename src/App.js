import "./App.css";

function Header() {
  return (
    <div className="header">
      <p className="title">My Note Keeper</p>

      <div className="search-bar">
        <img src={require("./images/search.png")}></img>
        <input className="search-input" placeholder="Search"></input>
      </div>
    </div>
  );
}

export default function App() {
  return <Header />;
}
