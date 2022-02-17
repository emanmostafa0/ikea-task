# React Assignment solution:
* I have implemented the application with one page called Products.

* you need first to run : ``` npm install ``` .

* you can start running the application with this command: ``` npm run start ``` .

* you need to install an HTTP server to be able to run the react application in production mode : ``` npm install serve -g ``` .

* to run the React application in production mode run : ``` npm run build ``` then  ``` serve -s build ``` .

* I have used Jest for unit testing the components, you can try it out by this command: ``` npm run test ```.
* You can run the unit test coverage by this command: ``` npm run test:coverage ```.

* I have used Cypress for E2E testing : you can try it out by this command: ``` npm run cypress:open ``` , If that command doesn't work , maybe this command is better :  ``` yarn start & yarn cypess open ``` .

* for code organization and having the same syntax, I have used Eslint. I have some eslint rules setted up in .eslintrc.js .

* I have downloaded eslint plugin in VScode, so that the editor can easily detect if there is an eslint error.

* I have used 'lint-staged' in package.json , so that if there is an error for eslint can be easily detected before committing my changes to github.

* I have used 'react-modal' library for the popup dialog, it is more flexible library and can be edited easily.

## Assumtions I made:
### Availabilty assumptions: 
* I have assumed that the same article can be used in different products, and the user can collect the product based on the articles, so for example if I have an article called "leg" and the amountInStock=4 , product1 needs " 4 legs " and product2 needs "4 legs", that means we have 1 product1 available and 1 product2.
* if the user ordered 1 item of product1 , the availabity of article "leg" will be 0, so we don't have product1 and product2 available anymore.
* I have asssumed also that the availabilities of the product is based on the least sets of articles in the stock that needed for this product. for example product1 needs "2 legs" and "8 seats" , and we have an article called {"leg" , amountInStock= 4} and {"seat", amountInStock=8}, that means we can collect (2 available sets of legs, and 1 available set of seat) so that the avaiability of product1 will be 1.

### Shop cart assumption: 
* I have assumed that the user will order the items directly after clicking on submit, but maybe shop cart is a good feature for the user experience.
* this shop cart feature needs to be discussed,  as we don't have an api availlable for this part and the other solution is to implement this shop cart with localStorage, this is something for future work section.


### Sale assumptions: 
* I have assumed that the amountInStock for specific article couldn't be changed until I am sure that the sale added successfully to the database.

## API outage solutions in the FE:
* As I see that the api outage happens a lot , and the Frondend implementation should be stable as much as I can, so that I have used axios-retry to recall the spesific api that has ``` 503 statusCode ```, I have added a max number of trails to be 3 times only because if I have so many trails , that may prevent the api from recovering from its overloaded state, and it will continue to block or refuse requests. and consequently its ability to recover is further reduced.
* if all the retails failed , message will be displayed to the user that there is something wrong with the api and user can click on retry button to retry to call the api again.
* I have used ``` promise.all ``` when the page is loaded to get all  ``` products and articles ``` , to make the loading faster and then map every product's articles with the whole articles to get the name of the article.
* I have used ``` synchronous calls ``` for registration a sale so that If the user registered a sale, and the sale is failed to be added to the database, the api for updating bulk of articled will not be called. so in my design I need to wait for a successful adding a sale in the database , then I will update the articles amountInStock.


  ### pros and cons of using promise.all for loading the page in my design: 
     #### pros:
      * If the articles and products have success response, loading the page will be more faster , as no call is waiting for the other call as they are independant calls.
     #### cons:
      * if getting the articles failed and used all the trails and still failed, that means the response of this promise.all will be failing message and I can't render the page with list of products without articles to be ready.
      * if the two calls (products, articles) failed, the promise.all will wait for 3 trails for for each api call to be done.


  ### pros and cons of synchronous calls: 
     #### pros:
      * The articles will not be called and can't be updated in the database if adding a sale is failed.
      * if the api has an outage, only sale api will be called and has some trails, but the articles will not be called (less api calls).
     #### cons:
      * the response of registration a sale will be slower as I need to wait for adding sale to be done , then call patch articles and after the two calls are done synchronously, I will show to the user that registration sale is done successfully.
      * if the sale is successfully added , but updating articles is failing, that means the sale is added to the database but the articles are not upated and this is sale is not completed , so we have many sales in the database are not completely done.


## Frontend performance:

* I have used ``` react-window ``` and ``` react-virtualized-auto-sizer ``` , as I am assuming that the listing products will be huge list in the production and the browser couldn't handle this huge list, so this libraries is to render only the items that are showed in the screen for the user, so that rendering the list should be more faster and flexible.

* I have used ``` React.memo ``` to memoize the items that are not changed and I am assuming that the quantity of the item is the important information to know if this item should render again or not.

## State Management:
* I have used react hooks ``` useContext ``` and ``` useReducer ``` for state management, to store the states and share the states between components. also to not have Prop drilling issue.
* I didn't use ``` redux ``` in this assignment.

  ### pros and cons of this approach: 
    #### pros:
    * Not having to keep up with any updates to Redux 
    * Not using an external library will result in fewer bugs and problems 
    * Smaller code.
    #### cons:
     * useReducer is dispatching the action only for the reducer that is specified for this useReducer.
     * dispatch only the actions with objects, so dispatching async actions is not provided with useReducer. 
     * using useContext with 1 store , makes unnecessary renders happens for some components that don't need to be rendered, because of unrelated states are changed in this store. so that I had to create multiple stores for unrelated states (dialog state, products state) , then the components subscribed to the specific store , so that the component will render only if the states in this store are changed. and if the other store changed ,this component will not be rendered. 
    (long story short: react hooks is not suitable for complicated application because of creating multiple stores make design more diffecult for debugging).
     
## Mocking Api in testing:
* I have mocked the api functions in the unit test using ``` Jest.mock and jest.fn  ``` with the specific scenarios (success scenario and failed scenario)
* I have mocked the api calls using in the cypress test using ``` cypress.intercept ``` , to test every user flow individually ( success loading page, failed Loading page, retrail api calls, success registration sale and failed registration sale).

## Future work:
* As I am using synchronous calls for registration a sale, we should have a good solution for non complete sale, (adding a sale to database successfully and updating articles are failing to be updated in the database).maybe solving it in the backend side by adding a sale only if updating articles are done successfully, or solving it in the frontend by deleting the previous sale , but the frontend solution has an issue that we will call the api that already has an outage. so I am thinking of backend solution should be better in this case.
* I am using retrail approach with only 3 trails to not have so many calls to the api, but maybe that trail approach should be discussed with the backend developers a better number of trails and exponential delays between retails api calls.
* shopping cart is a good feature for user experience so the users can easily add the items they wanted in their cart and then check this items before ordering, but this part should be discussed if we need to implement an api for it , or use localStorage in the frontend.

## Component Design:
* I have used Atomic component design for structuring the components: 
https://atomicdesign.bradfrost.com/chapter-2/

the component sturcture:

```
.
├── README.md
├── public
│   └── ikea-logo.png
│   └── loader.png
│   └── index.html
│   └── favicon.ico
│   └── manifest.json
│   └── facebook.png
│   └── twitter.png
│   │
├── cypress
│   └── fixtures
│   │   └── articles.json
│   │   └── bulkArticles.js
│   │   └── products.js
│   │   └── sale.js
│   └── integeration
│   │   └── productFailSale.js
│   │   └── productFailPage.js
│   │   └── productSuccessSale.js
│   │   └── productSuccessPage.js
│   └── plugins
│   └── support
│   │
├── src
│   ├── __mocks__
│   │   ├── pageState.js

│   ├── components
│   │   ├── atoms
│   │   │   ├── Button
│   │   │   │    └── index.js
│   │   │   │    └── style.css
│   │   │   │    └── Button.test.js
│   │   │   │
│   │   │   ├── Dialog
│   │   │   │    └── index.js
│   │   │   │    └── style.css
│   │   │   │    └── Dialog.test.js
│   │   │   │
│   │   │   ├── NumberPick
│   │   │   │    └── index.js
│   │   │   │    └── style.css
│   │   │   │    └── NumberPick.test.js
│   │   │   │
│   │   ├── molecules
│   │   │   ├── ErrorPage
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   │   └── ErrorPage.test.js
│   │   │   │
│   │   │   ├── Footer
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   │   └── Footer.test.js
│   │   │   │
│   │   │   └── Header
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   │   └── Header.test.js
│   │   │   │
│   │   │   └── saleForm
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   │   └── saleForm.test.js
│   │   │   │
│   │   │   └── RequestSale
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   │   └── RequestSale.test.js
│   │   │   │
│   │   │   └── RequestSuccess
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   │   └── RequestSuccess.test.js
│   │   │   │
│   │   │   └── ResultItem
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   │   └── ResultItem.test.js
│   │   │   │
│   │   ├── organisms
│   │   │   ├── ResultItemContainer
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   │   └── ResultItemContainer.test.js
│   │   │   │
│   │   │   ├── ResultList
│   │   │   │   ├── index.js
│   │   │   │   └── style.css
│   │   │   │   └── ResultList.test.js
│   │   │   │
│   │   └── templates
│   │   │   ├── Layout
│   │   │   │   ├── index.js
│   │   │   │   ├── style.js
│   │   │   │   └── Layout.test.js
│   │   │   │
│   ├── helper
│   │   ├── parseData.js
│   │   ├── parseData.test.js
│   │   │
│   └── pages
│   │    └──Home
│   │    │  └──index.js
│   │    │  └──style.css
│   │    │  └──Home.test.js
│   └── store
│   │    └──actionsType.js
│   │    └──reducers.js
│   │    │   └──dialogReducer
│   │    │   └──pageReducer
│   │    │   │
│   │    └──stores
│   │    │   └──StoreDialogProvider
│   │    │   └──StoreProductProvider
│   │    │   │ 
│   └── service
│   │    └──api.js
│   │    │  
│   │    │  
├── └── index.css
├── └── index.test.js
├── └── index.js
├── └── setupTests.js
├── └── style.js
│   │ 
│   │
├── cypress.json
├── node_modules
│   └── [...]
├── .eslintrc.js
├── .prettierrc
└── package-lock.json
└── package.json
```
