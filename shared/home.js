(function () {
  "use strict";

  const list = document.getElementById("gameList");

  function normalizeGame(game) {
    return {
      title: typeof game.title === "string" ? game.title : "無題のゲーム",
      desc: typeof game.desc === "string" ? game.desc : "",
      path: typeof game.path === "string" ? game.path.trim() : "",
      tags: Array.isArray(game.tags) ? game.tags.filter(tag => typeof tag === "string") : []
    };
  }

  async function loadGames() {
    const response = await fetch("games.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`games.json: ${response.status}`);

    const games = await response.json();
    if (!Array.isArray(games)) throw new Error("games.json must be an array");

    return games.map(normalizeGame);
  }

  function createPlayLink(game) {
    const link = document.createElement("a");
    link.className = "btn";
    link.textContent = "あそぶ";

    if (game.path) {
      link.href = game.path;
      link.setAttribute("aria-label", `${game.title}で遊ぶ`);
    } else {
      link.href = "#";
      link.setAttribute("aria-disabled", "true");
      link.title = "リンク先が未設定です";
    }

    return link;
  }

  function renderGames(games) {
    list.textContent = "";

    games.forEach(game => {
      const card = document.createElement("section");
      card.className = "card";

      const title = document.createElement("p");
      title.className = "title";
      title.textContent = game.title;

      const desc = document.createElement("p");
      desc.className = "desc";
      desc.textContent = game.desc;

      const row = document.createElement("div");
      row.className = "row";

      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = game.tags.map(value => `#${value}`).join(" ");

      row.append(tag, createPlayLink(game));
      card.append(title, desc, row);
      list.appendChild(card);
    });
  }

  function renderError(error) {
    list.textContent = "";
    const message = document.createElement("p");
    message.className = "error";
    message.textContent = `ゲーム一覧を読み込めませんでした: ${error.message}`;
    list.appendChild(message);
  }

  loadGames().then(renderGames).catch(renderError);
}());
