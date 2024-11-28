describe("Tech Quiz E2E", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should start the quiz and display the first question", () => {
    cy.get("button").contains("Start Quiz").click();
    cy.get(".card").should("be.visible");
    cy.get("h2").should("not.be.empty");
  });

  it("should answer all questions and show the final score", () => {
    cy.get("button").contains("Start Quiz").click();
    for (let i = 1; i <= 10; i++) {
      cy.get(`.question-${i}`).should("be.visible");
      cy.get(`.answer-${i}`).first().click();
    }

    cy.get(".score-alert").should("be.visible");
    cy.get(".score-alert").should("contain", "Your score");
  });

  it("should restart the quiz after completion", () => {
    cy.get("button").contains("Start Quiz").click();
    for (let i = 1; i <= 10; i++) {
      cy.get(`.question-${i}`).should("be.visible");
      cy.get(`.answer-${i}`).first().click();
    }

    cy.get("button").contains("Restart Quiz").click();
    cy.get("button").contains("Start Quiz").should("be.visible");
    cy.get(".question-1").should("not.be.empty");
  });
});
