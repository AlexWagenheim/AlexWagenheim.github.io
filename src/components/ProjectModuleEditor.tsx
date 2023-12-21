import React, {FC} from 'react';
import {ProjectModule} from "../entity/project/ProjectModule";
import '../styles/ProjectModuleEditor.css';
import LoaderTextarea from './LoaderTextarea';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import CodeMirror from '@uiw/react-codemirror';

interface i_ProjectModuleProperties {
    name: string;
    body: string;
    upDateModule: (module: ProjectModule) => void;
    isLoadingSave: boolean;
    isLoadingCompile: boolean;
    isLoadingExecute: boolean;
}

const myTheme = createTheme({
    theme: 'light',
    settings: {
        background: '#ffffff',
        //Знаки препинания или весь текст
        foreground: '#333333',
        //Черта курсора
        caret: '#FCA903',
        //Выделение при двойном клике
        selection: '#FFE3B7',
        //Выделение при двойном клике похожих
        selectionMatch: '#FFE3B7',
        //Выделение строки
        lineHighlight: 'rgba(255, 170, 0, 0.1)',
        //Колонка нумерации
        gutterBackground: '#FCA903',
        //Нумерация
        gutterForeground: '#333333',
    },
    styles: [
        { tag: t.comment, color: '#5c6166' },
        { tag: t.variableName, color: '#5c6166' },
        //Строки в кавычках
        { tag: [t.string, t.special(t.brace)], color: '#FCA903' },
        { tag: t.number, color: '#FCA903' },
        { tag: t.bool, color: '#5c6166' },
        { tag: t.null, color: '#5c6166' },
        { tag: t.keyword, color: '#5c6166' },
        { tag: t.operator, color: '#5c6166' },
        { tag: t.className, color: '#5c6166' },
        { tag: t.definition(t.typeName), color: '#5c6166' },
        { tag: t.typeName, color: '#5c6166' },
        { tag: t.angleBracket, color: '#5c6166' },
        { tag: t.tagName, color: '#5c6166' },
        { tag: t.attributeName, color: '#5c6166' },
    ],
});

const ProjectModuleEditor: FC <i_ProjectModuleProperties> = ({name,
                                                            body,
                                                            upDateModule,
                                                            isLoadingSave,
                                                            isLoadingCompile,
                                                            isLoadingExecute}) => {
    return (
        <div>
            <CodeMirror
                value={body}
                height="51vh"
                theme={myTheme}
                onChange={(event) => {upDateModule({name: name, body: event})}}
                style={{
                    border: "1px solid #000000", outline: "none"
                }}
                readOnly={isLoadingSave || isLoadingCompile || isLoadingExecute}
            />
            {isLoadingSave || isLoadingCompile || isLoadingExecute ? <div>
                <LoaderTextarea/>
            </div> : null
            }

        </div>
    );
};

export default ProjectModuleEditor;