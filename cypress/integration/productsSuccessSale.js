 
describe("Visit the productPage, and it is successfully rendered", () => {
    beforeEach(() => {
        cy.fixture('articles.json').as('articles');
        cy.fixture('products.json').as('products');
        cy.fixture('sale.json').as('sale');
        cy.fixture('bulkArticles.json').as('bulkArticles');
    });
      
    // ********************************
    // success sale scenario
    // *******************************

    it("1. check succes sale and patch articles", function () {
        //success calls
        cy.intercept('GET', 'http://localhost:7000/articles', this.articles );
        cy.intercept('GET', 'http://localhost:7000/products', this.products);
        cy.intercept('POST', 'http://localhost:7000/sales', this.sale );
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

        cy.get('[data-testid="success-title"]').should("be.visible");
        cy.get('[data-testid="button"]').click();
        //success sale
        cy.get('[data-testid="item-available"]').should("be.visible");
        cy.get('[data-testid="item-available"]').its('length').should("to.be", 2);
        cy.get('[data-testid="item-available"]').each(($elem,index ) => {
            const text = $elem.text();
            const numberAvailability = textAvailabilities[index].split(" ")[1];
            expect(text).to.equal(`Available: ${numberAvailability -1}`);
        });
       
    });


});
 
 
 