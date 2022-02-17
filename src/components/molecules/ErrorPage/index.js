import { useStore } from '../../../store/stores/StoreProductProvider';
import { Button } from '../../atoms/Button';
import {StyledError, StyledErrorMessage} from './style';
import { PAGERETRY } from '../../../store/actionTypes';



export function ErrorPage() {
    const [ globalState, dispatch ] = useStore();
  
    return (
        <StyledError data-testid="error-api" >
            <StyledErrorMessage>{globalState?.error}</StyledErrorMessage>
            <Button label="Retry" className="primary" 
                onClick={() =>  dispatch({ type: PAGERETRY, payload: true })}></Button>
              
        </StyledError>
    );
}
