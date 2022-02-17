import axios from "axios";
import axiosRetry from 'axios-retry';


class Api {

    // ********************************
    // Page
    // ********************************
    static async fetchPage () {
        try {  
            const res = await Promise.all([
                this.client.get('articles'),
                this.client.get('products')
            ]);
            console.error(res);
            return this.handleResponses(res);
        } catch(err) {
            return this.handleError(err);
        }
    }


    // ********************************
    // Sales
    // ********************************
    static async registerSale (product, amount, articles) {
        const saleBody = {
            productId: product.id,
            amountSold: amount
        };

        const bulkArticles = product.articles.map(productArticle => {
            const selectedArticle = articles.find( article=> productArticle.id === article.id);
            const remainingStocks = selectedArticle.amountInStock - (amount* productArticle.amountRequired);
            return {...productArticle, amountInStock: remainingStocks };
        });
        try {
            const sale = await this.client.post( 'sales', saleBody);
            const saleData = this.handleResponse(sale);
            if(saleData) { 
                const articles = await this.client.patch( 'articles', bulkArticles);
                return this.handleResponse(articles);
            }
        } catch(err) {
            return this.handleError(err);
        }
    }



    // ********************************
    // Utils
    // ********************************
    static handleResponse(response) {
        return response.data;
    }

    static handleResponses(responses) {
        const res = responses.map(res => {
            return { [res.config.url]: res.data };
        });

        return res.reduce(function(result, item) {
            var key = Object.keys(item)[0];
            result[key] = item[key];
            return result;
        }, {});

    }


    static handleError(err) {  
        console.error(err?.response);
        return {
            error: err?.response?.status,
            error_message: err?.response?.data?.message
        };
    }
}


Api.client = axios.create({
    baseURL: 'http://localhost:7000/'
});

axiosRetry(Api.client, {
    retries: 3,
    retryDelay: (retryCount) => {
        console.warn(`retry attempt: ${retryCount}`);
        return retryCount * 2000; 
    },
    retryCondition: (error) => {
        return error?.response?.status === 503;
    }});

export default Api;