describe("Index page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Does not do much!", () => {
    expect(true).to.equal(true);
  });
});
