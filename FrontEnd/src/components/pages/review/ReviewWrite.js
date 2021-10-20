import EditorComponent from "./EditorComponent";
import React, { Fragment, useEffect, useState } from "react";

const ReviewWrite = () => {
    const [desc, setDesc] = useState('');
    function onEditorChange(value) {
        setDesc(value)
    }

    return (
        <div>
            <EditorComponent value={desc} onChange={onEditorChange} />
        </div>
    )
};

export default ReviewWrite;