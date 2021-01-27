import { render } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import NavBar from "../Components/NavBar/NavBar";
import { StateContext } from "../global.context/globalStore.reducer";

const dispatch = () => {};
const state = { isAuth: false };

describe("Navbar", () => {
  it("Correctly renders the Navbar without error", () => {
    const { container } = render(
      <StateContext.Provider value={{ state, dispatch }}>
        <NavBar />
      </StateContext.Provider>
    );

    expect(container.textContent).toContain("Codagora");
  });
});
