import React from 'react';

function FormGroup(props){
    return(
        <div className="form-group">
            <label class="col-sm-6 col-form-label" htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}
        </div>
    )
}

export default FormGroup