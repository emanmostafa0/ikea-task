import { array } from "prop-types";
import React, {memo} from "react";
import ResultItemContainer  from "../ResultItemContainer.js";
import { useStore } from '../../../store/stores/StoreProductProvider';
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {StyledListContainer} from './style';



const ResultList = ()=> {
    const [ globalState ] = useStore();
    const products = globalState.products;
    
    return(
        <StyledListContainer data-testid="list">
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        className="List"
                        height={height}
                        width={width}
                        itemCount={products.length}
                        itemSize={150}
                        itemData={products}
                    >
                        {ResultItemContainer}
                    </List>
                )}
            </AutoSizer>
        </StyledListContainer>
      
    );
};


ResultList.propTypes = {
    result: array
};
export default memo(ResultList);
