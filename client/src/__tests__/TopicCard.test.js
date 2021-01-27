import React from "react";
import ReactDOM from "react-dom";

import { getByTestId } from "@testing-library/react";

import { StateContext } from "../global.context/globalStore.reducer";

import { dummyTopic } from "./DummyData";

import TopicCard from "../Components/TopicCard/TopicCard";

//Context provider is expecting a value of state.isAuth and a function for dispatch
const dispatch = () => {};
const state = { isAuth: true };

//Topic Card Component
describe("Topics Component", () => {
  it("Renders a topic on the supplied info", () => {
    const container = document.createElement("div");
    const topic = dummyTopic;

    //Render component to container div
    ReactDOM.render(
      <StateContext.Provider value={{ state, dispatch }}>
        <TopicCard topic={topic} />
      </StateContext.Provider>,
      container
    );

    //Perform required tests
    const heading = getByTestId(container, "topic-title");
    expect(heading.textContent).toEqual(topic.title);
    const authorName = getByTestId(container, "topic-author");
    expect(authorName.textContent).toEqual(topic.author.name);
  });
});
