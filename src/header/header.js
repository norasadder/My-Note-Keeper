import "./header.css";
export default function Header({ changeSearchVal }) {
  function handleChange(event) {
    changeSearchVal(event.target.value);
  }
  return (
    <div className="header">
      <p className="title">My Note Keeper</p>

      <div className="search-bar">
        <img src={require("../images/search.png")}></img>
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          onChange={handleChange}
        ></input>
      </div>
    </div>
  );
}
