 
describe("Visit the productPage, and it is successfully rendered", () => {
    beforeEach(() => {
        cy.fixture('articles.json').as('articles');
        cy.fixture('products.json').as('products');
        cy.fixture('sale.json').as('sale');
        cy.fixture('bulkArticles.json').as('bulkArticles');
    });
      
    // ********************************
    // fail sale scenario
    // *******************************

    it("1. check fail sale and success patch articles", function () {
        //success calls
        cy.intercept('GET', 'http://localhost:7000/articles', this.articles );
        cy.intercept('GET', 'http://localhost:7000/products', this.products);
        cy.intercept('POST', 'http://localhost:7000/sales', { "statusCode": 503, "body": {
            "message": "Not responding api"
        }}).as('sale');
        cy.intercept('PATCH', 'http://localhost:7000/articles', this.bulkArticles );

        cy.visit("/"); 
        cy.wait(1000);
        cy.get('[data-testid="header"]').should("be.visible");
        cy.get('[data-testid="footer"]').should("be.visible");
        cy.get('[data-testid="item-available"]').should("be.visible");
        cy.get('[data-testid="item-available"]').its('length').should("to.be", 2);
        const textAvailabilities = [];
        cy.get('[data-testid="item-available"]').each(($elem) => {
            const text = $elem.text();
            textAvailabilities.push(text);
            expect(text).to.not.match(/Available: 0/);
        });
        cy.get('[data-testid="item-content"]').eq(0).click();
        cy.get('[data-testid="form-title"]').should("be.visible");
        cy.get('[data-testid="button"]').click();
        cy.wait(15000);
        cy.get('@sale.all').should('have.length', 4);

        cy.get('[data-testid="errorSubmit"]').should("be.visible");
        cy.contains('Api is not responding').should("be.visible");
        
        //fail sale: no change on quantities 
        cy.get('[data-testid="item-available"]').should("be.visible");
        cy.get('[data-testid="item-available"]').its('length').should("to.be", 2);
        cy.get('[data-testid="item-available"]').each(($elem,index ) => {
            const text = $elem.text();
         
            expect(text).to.equal(textAvailabilities[index]);
        });
       
    });

    it("2. check success sale and fail patch articles", function () {
        //success calls
        cy.intercept('GET', 'http://localhost:7000/articles', this.articles );
        cy.intercept('GET', 'http://localhost:7000/products', this.products);
        cy.intercept('POST', 'http://localhost:7000/sales',this.sale).as('sale');
        cy.intercept('PATCH', 'http://localhost:7000/articles', { "statusCode": 503, "body": {
            "message": "Not responding api"
        }} ).as('bulkArticles');

        cy.visit("/"); 
        cy.wait(1000);
        cy.get('[data-testid="header"]').should("be.visible");
        cy.get('[data-testid="footer"]').should("be.visible");
        cy.get('[data-testid="item-available"]').should("be.visible");
        cy.get('[data-testid="item-available"]').its('length').should("to.be", 2);
        const textAvailabilities = [];
        cy.get('[data-testid="item-available"]').each(($elem) => {
            const text = $elem.text();
            textAvailabilities.push(text);
            expect(text).to.not.match(/Available: 0/);
        });
        cy.get('[data-testid="item-content"]').eq(0).click();
        cy.get('[data-testid="form-title"]').should("be.visible");
        cy.get('[data-testid="button"]').click();
        cy.wait(15000);
        cy.get('@bulkArticles.all').should('have.length', 4);

        cy.get('[data-testid="errorSubmit"]').should("be.visible");
        cy.contains('Api is not responding').should("be.visible");
        
        //fail sale: no change on quantities 
        cy.get('[data-testid="item-available"]').should("be.visible");
        cy.get('[data-testid="item-available"]').its('length').should("to.be", 2);
        cy.get('[data-testid="item-available"]').each(($elem,index ) => {
            const text = $elem.text();
            expect(text).to.equal(textAvailabilities[index]);
        });
       
    });

    it("3. check fail sale and fail patch articles", function () {
        //success calls
        cy.intercept('GET', 'http://localhost:7000/articles', this.articles );
        cy.intercept('GET', 'http://localhost:7000/products', this.products);
        cy.intercept('POST', 'http://localhost:7000/sales',{ "statusCode": 503, "body": {
            "message": "Not responding api"
        }}).as('sale');
        cy.intercept('PATCH', 'http://localhost:7000/articles', { "statusCode": 503, "body": {
            "message": "Not responding api"
        }} ).as('bulkArticles');

        cy.visit("/"); 
        cy.wait(1000);
        cy.get('[data-testid="header"]').should("be.visible");
        cy.get('[data-testid="footer"]').should("be.visible");
        cy.get('[data-testid="item-available"]').should("be.visible");
        cy.get('[data-testid="item-available"]').its('length').should("to.be", 2);
        const textAvailabilities = [];
        cy.get('[data-testid="item-available"]').each(($elem) => {
            const text = $elem.text();
            textAvailabilities.push(text);
            expect(text).to.not.match(/Available: 0/);
        });
        cy.get('[data-testid="item-content"]').eq(0).click();
        cy.get('[data-testid="form-title"]').should("be.visible");
        cy.get('[data-testid="button"]').click();
        cy.wait(15000);
        cy.get('@bulkArticles.all').should('have.length', 0);
        cy.get('@sale.all').should('have.length', 4);


        cy.get('[data-testid="errorSubmit"]').should("be.visible");
        cy.contains('Api is not responding').should("be.visible");
        
        //fail sale: no change on quantities 
        cy.get('[data-testid="item-available"]').should("be.visible");
        cy.get('[data-testid="item-available"]').its('length').should("to.be", 2);
        cy.get('[data-testid="item-available"]').each(($elem,index ) => {
            const text = $elem.text();
            expect(text).to.equal(textAvailabilities[index]);
        });
       
    });


});
 
 
 