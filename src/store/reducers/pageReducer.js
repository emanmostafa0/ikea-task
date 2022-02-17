import { PAGELIST, PAGELOAD, PAGEERROR , PAGEUPDATE, PAGERETRY} from "../actionTypes";
import {parseProductArticles, updateProductArticles, updateArticles} from '../../helper/parseData';

export const initialStateProduct = {
    articles: {},
    products: {},
    error: '',
    loading: false,
    retry: true
    
};

export const pageReducer = (state = initialStateProduct, action = {}) => {
    const { type } = action;
    switch (type) {
    case PAGERETRY: {
        return {
            ...state,
            retry: action.payload
        };
    };
    case PAGELOAD: {
        return {
            ...state,
            loading: true
        };
    };
       
    case PAGELIST: {
        return {
            ...state,
            products: parseProductArticles(action.payload.products, action.payload.articles ),
            articles: action.payload.articles,
            error: '',
            loading: false
        };
    };

    case PAGEUPDATE: {
        return {
            ...state,
            products: updateProductArticles( state.products, state.articles, action.payload.updatedArticles ),
            articles: updateArticles(state.articles, action.payload.updatedArticles),
            error: ''
        };
    }
    
    case PAGEERROR: {
        return {
            ...state,
            products: {},
            articles: {},
            error: action.payload,
            loading: false
        };
    }
    default:
        return state;
    }
};
  