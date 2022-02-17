 
 

describe("Visit the productPage, and it is successfully rendered", () => {
    beforeEach(() => {
        cy.fixture('articles.json').as('articles');
        cy.fixture('products.json').as('products');
    });
      
    // ********************************
    // success loading page scenario
    // ********************************
    it("1. check if the productPage is rendered with success calls", function () {
        //success calls
        cy.intercept('GET', 'http://localhost:7000/articles', this.articles );
        cy.intercept('GET', 'http://localhost:7000/products', this.products);


        cy.visit("/"); 
        cy.wait(1000);
        cy.get('[data-testid="header"]').should("be.visible");
        cy.get('[data-testid="footer"]').should("be.visible");
        cy.get('[data-testid="list"]').should("be.visible");
    });

    it("2. check success calls and click on item to show dialog", function () {
        //success calls
        cy.intercept('GET', 'http://localhost:7000/articles', this.articles );
        cy.intercept('GET', 'http://localhost:7000/products', this.products);


        cy.visit("/"); 
        cy.wait(1000);
        cy.get('[data-testid="header"]').should("be.visible");
        cy.get('[data-testid="footer"]').should("be.visible");
        cy.get('[data-testid="item-available"]').should("be.visible");
        cy.get('[data-testid="item-available"]').its('length').should("to.be", 2);
        cy.get('[data-testid="item-available"]').each(($elem) => {
            const text = $elem.text();
            expect(text).to.not.match(/Available: 0/);
        });
        cy.get('[data-testid="item-content"]').eq(0).click();
        cy.get('[data-testid="form-title"]').should("be.visible");
       
    });


});
 
 
 