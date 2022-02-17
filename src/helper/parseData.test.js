import { parseProductArticles, updateProductArticles } from "./parseData";
import {products, articles} from '../__mocks__/pageState';

describe("paseData", () => {
    it("parse products", () => {
        let productsCopiedTest1 = products.map(product => {
            // eslint-disable-next-line no-unused-vars
            const {quantity, ...newProduct} = product;
            return newProduct;
        });
       
        const parsedProduct = parseProductArticles(productsCopiedTest1, articles);
        expect(parsedProduct).toMatchSnapshot([
            { name: 'test1', id: 1, articles: [  {id: 11, amountRequired: 2} ], quantity: 1 },
            { name: 'test2', id: 2, articles: [ {id: 11, amountRequired: 2} ], quantity: 1 }
        ]);
    });

    it("update products", () => {
        const updatesArticles = [
            { 
                name: "article1",
                id: 11,
                amountInStock: 1
              
            }
        ];
        const parsedProduct =updateProductArticles (products, articles, updatesArticles);
        expect(parsedProduct).toMatchSnapshot([
            { name: 'test1', id: 1, articles: [  {id: 11, amountRequired: 2} ], quantity: 0 },
            { name: 'test2', id: 2, articles: [ {id: 11, amountRequired: 2} ], quantity: 0 }
        ]);
    });


   
});