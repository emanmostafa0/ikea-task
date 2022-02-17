

describe("Visit the productPage, and it is successfully rendered", () => {
    beforeEach(() => {
        cy.fixture('products.json').as('products');
    });
      

    // ********************************
    // Fail loading page scenario
    // ********************************

    it("1. check if the productPage is rendered with fail calls and check retrail axios", function () {
        //fail calls
        cy.intercept('GET', 'http://localhost:7000/articles',  { "statusCode": 503, "body": {
            "message": "Not responding api"
        }}).as('articlesCalls');
    
        cy.intercept('GET', 'http://localhost:7000/products', this.products);


        cy.visit("/"); 
        cy.wait(1000);
        cy.get('[data-testid="header"]').should("be.visible");
        cy.get('[data-testid="footer"]').should("be.visible");
        cy.get('[data-testid="loader"]').should("be.visible");
        cy.wait(15000);
        cy.get('@articlesCalls.all').should('have.length', 4);

    });

    it("2. check fail calls and retry button", function () {
        //fail calls
        cy.intercept('GET', 'http://localhost:7000/articles',  { "statusCode": 503, "body": {
            "message": "Not responding api"
        }}).as('articlesCalls');
    
        cy.intercept('GET', 'http://localhost:7000/products', this.products);


        cy.visit("/"); 
        cy.wait(1000);
        cy.get('[data-testid="header"]').should("be.visible");
        cy.get('[data-testid="footer"]').should("be.visible");
        cy.get('[data-testid="loader"]').should("be.visible");
        cy.wait(15000);
        cy.get('@articlesCalls.all').should('have.length', 4);
        cy.get('[data-testid="loader"]').should('not.exist');

        cy.get('[data-testid="button"]').click();
        cy.get('[data-testid="loader"]').should("be.visible");
        cy.get('@articlesCalls.all').its('length').should('be.gt', 4);

    });

    it("2. check fail Articles and product and retry button", function () {
        //fail calls
        cy.intercept('GET', 'http://localhost:7000/articles',  { "statusCode": 503, "body": {
            "message": "Not responding api"
        }}).as('articlesCalls');
    
        cy.intercept('GET', 'http://localhost:7000/products', { "statusCode": 503, "body": {
            "message": "Not responding api"
        }}).as("productsCalls");


        cy.visit("/"); 
        cy.wait(1000);
        cy.get('[data-testid="header"]').should("be.visible");
        cy.get('[data-testid="footer"]').should("be.visible");
        cy.get('[data-testid="loader"]').should("be.visible");
        cy.wait(15000);
        cy.get('@articlesCalls.all').should('have.length', 4);
        cy.get('@productsCalls.all').should('have.length', 4);
        cy.get('[data-testid="loader"]').should('not.exist');

        cy.get('[data-testid="button"]').click();
        cy.get('[data-testid="loader"]').should("be.visible");
        cy.get('@articlesCalls.all').its('length').should('be.gt', 4);
        cy.get('@productsCalls.all').its('length').should('be.gt', 4);

    });

   
});