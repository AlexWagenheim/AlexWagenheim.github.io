import React, {FC} from 'react';
import '../styles/OutputTextarea.css'
import {CompilerMessage} from "../entity/compiling/dto/CompilerMessage";

interface i_OutputTextareaProperties {
    CM: CompilerMessage[];
 }

const OutputTextarea: FC <i_OutputTextareaProperties> = ({CM}) => {
    return (
        <div className={'output'}>
            <textarea readOnly value={
                (CM.length == 0)?
                    'Компиляция успешно выполнена!'
                    :
                    CM.map(message => 'Ошибка в модуле ' + message.moduleName + ', строка ' + message.line
                        + '\n' + message.message + '\n' + message.explanation + '\n' + '\n').join('\r\n')
            }/>
        </div>
    );
};

export default OutputTextarea;