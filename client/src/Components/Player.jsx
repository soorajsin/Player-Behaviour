import React, { useState } from "react";
import axios from "axios";

function Player() {
  const [url, setUrl] = useState("");
  const [players, setPlayers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/${url}`
      );
      const html = response.data;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const playerElements = doc.querySelectorAll(
        ".cb-col.cb-col-100.cb-font-14.cb-ltst-wgt-hdr"
      );
      const playerData = Array.from(playerElements).map(
        (player) => player.innerText
      );
      setPlayers(playerData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Cricket Player Behavior App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Website URL (e.g., cricbuzz.com):
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <h2>Player Behaviors</h2>
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Behavior</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player}</td>
              <td>Behavior Here</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Player;
