export default function Header({ $app, initialState, handleSearch }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "header";

  this.handleSearch = handleSearch;
  $app.appendChild(this.$target);

  this.template = () => {
    const { searchWord, currentPage } = this.state;

    let temp = `
      <div class="header-container">
        <a href="/" class="header-logo">Poké Docs</a>`;
    if (!currentPage.includes("/detail/")) {
      temp += `
        <div class="header-searchbox">
          <input type="text" class="header-searchbox-input" placeholder="Search" value="${
            searchWord ? searchWord : ""
          }"/>
          <button class="header-searchbox-btn">🔍</button>
        </div>`;
    }
    temp += `</div>`;

    return temp;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();

    if (!this.state.currentPage.includes("/detail/")) {
      const $searchInput = this.$target.querySelector(
        ".header-searchbox-input"
      );
      const $searchBtn = this.$target.querySelector(".header-searchbox-btn");

      $searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.handleSearch(e.target.value);
        }
      });
      $searchBtn.addEventListener("click", () => {
        this.handleSearch($searchInput.value);
      });
    }
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}
