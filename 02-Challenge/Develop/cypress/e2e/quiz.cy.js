describe("Tech Quiz E2E", () => {
  beforeEach(() => {
    cy.visit("/quiz");
    cy.intercept("GET", "/api/questions", { fixture: "questions.json" });
    response;
  });

  it("loads the quiz questions", () => {
    cy.get(".quiz-question").should("have.length", 10);
  });

  it("completes the quiz flow", () => {
    cy.get(".answer-option").each(($option, index) => {
      if (index % 2 === 0) cy.wrap($option).click();
    });
    cy.get(".submit-button").click();
    cy.get(".quiz-score").should("contain.text", "Your score");
  });
});
