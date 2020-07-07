import React from 'react';
import style from '../signin/signin.module.css';

const FormField = ({formdata,id,change})=>{
    const showerror = ()=>{
        let errorMsg = null;
        if(formdata.validation && !formdata.valid){
            errorMsg=(
                <div className={style.err}>
                    {formdata.validationMsg}
                </div>
            )
        }

        return errorMsg;
    }
    const renderTemplate= ()=>{
        let template = null;
        switch(formdata.element){
            case ('input'):
                template=(
                    <div>
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onChange={(event)=>change({event,id,blur:false})}
                            onBlur={(event)=>change({event,id,blur:true})}
                        />
                        {showerror()}
                    </div>
                )
                break; 
            case ('select'):
                template=(
                    <div className={style.select}>
                        <select
                        value={formdata.value}
                        name={formdata.config.name}
                        onChange={(event)=>change({event,id,blur:false})}
                        onBlur={(event)=>change({event,id,blur:true})}
                        >
                            {formdata.config.options.map((item,i)=>(
                                <option key={i} value={item.id} >{item.name}</option>
                            ))}
                        </select>
                    </div>
                )
            break;         
            default:template=null;    
        }
        return template;
    }
    return(
        <div>
           {renderTemplate()}
        </div>
    )
}


export default FormField;