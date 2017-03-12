import React, { PropTypes } from 'react';

const CheckboxInput = ({name, value, onChange}) => {
    const capitializeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }
    const capitlizedName = capitializeFirstLetter(name)
    return (
        <div class="checkbox">
            <label>
                <input name={name} type="checkbox" value={value} onChange={onChange} checked={value}/>
                {capitlizedName}
            </label>
        </div>   
    );
};

CheckboxInput.propTypes = {
   name: PropTypes.string.isRequired,
   value: PropTypes.bool.isRequired,
   onChange: PropTypes.func.isRequired     
};

export default CheckboxInput;