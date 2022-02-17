// import Select from "react-select";
import NumberPicker from "react-widgets/NumberPicker";
import { func } from "prop-types";
import {StyledSelect} from './style';


export const NumberPick = ({ max, onChangeHandle }) => (
    <StyledSelect>
        <NumberPicker 
            max={max}
            min={0}
            defaultValue={1}
            step={1}
            onChange={(value) => { onChangeHandle(value);}}
        />
    </StyledSelect>
);


NumberPick.propTypes = {
    max: Number,
    onChangeHandle: func
};