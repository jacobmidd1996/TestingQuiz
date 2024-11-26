import { mount } from "cypress/react"; // Cypress' React-specific mount function
import Quiz from "../../client/src/components/Quiz";
import questions from "../fixtures/questions.json"; // Mock data

describe("Quiz Component", () => {
  it("renders correctly", () => {
    mount(<Quiz questions={questions} />);
    cy.get(".quiz-question").should("have.length", questions.length); // Ensure questions render
  });

  it("allows user to select answers", () => {
    mount(<Quiz questions={questions} />);
    cy.get(".answer-option").first().click(); // Simulate clicking an answer
    cy.get(".answer-option").first().should("have.class", "selected"); // Verify selection
  });

  it("submits the quiz and shows the score", () => {
    mount(<Quiz questions={questions} />);
    questions.forEach((_, index) => {
      cy.get(`.answer-option-${index}`).first().click();
    });
    cy.get(".submit-button").click();
    cy.get(".quiz-score").should("exist"); // Verify the score is displayed
  });
});
