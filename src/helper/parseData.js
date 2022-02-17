export const parseProductArticles = (products, articles) => {
    products?.length && products?.forEach(product => {
        let minQuantity = product?.articles?.length? Number.MAX_VALUE : 0;
        product.articles = product?.articles?.map(article => {
            const selectedArticle = articles?.find(aricleItem => aricleItem.id === article.id);
            
            const quantity = selectedArticle?.amountInStock ? 
                Math.floor(selectedArticle?.amountInStock/article.amountRequired): 0;
            minQuantity= Math.min(quantity, minQuantity);
            return {...article, name: selectedArticle?.name};
        });
        product.quantity = minQuantity;
    });
    return products;
};

export const updateArticles = (articles, updatedArticles) => {
    return articles?.length && articles?.map(article => {
        const selectedArticle = updatedArticles?.length &&
             updatedArticles?.find(updatedArticle => updatedArticle.id === article.id);
        if(selectedArticle)
            return {...article, amountInStock: selectedArticle?.amountInStock};
        else return article;
    }) || {};
}; 

export const updateProductArticles = (products, articles, updatedArticles) => {
    const newArticles = updateArticles(articles, updatedArticles);
    return products?.length && products?.map(product => {
        let minQuantity = product?.articles?.length? Number.MAX_VALUE : 0;
        product.articles?.forEach(article => {
            const selectedArticle = newArticles?.length && 
                newArticles?.find(aricleItem => aricleItem.id === article.id);
            const quantity = Math.floor(selectedArticle?.amountInStock/article.amountRequired);
            minQuantity= Math.min(quantity, minQuantity);
        });
        return {...product, quantity: minQuantity};
    }) || {};
    
};

