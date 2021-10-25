import React from 'react';
import styled from 'styled-components';

function GradeView(props) {
    // styled-components 라이브러리를 활용해서 css가 적용된 컴포넌트 생성
    const RadioButton = styled.input`
        &[type=radio]{
            width: 500px;
            height: 0;
            position: absolute;
            left: -9999px;
        }
        
        &[type=radio] + label{
            margin: 0;
            width: 8rem;
            height: 7rem;
            padding: 3em 2.5em;
            box-sizing: border-box;
            position: relative;
            display: inline-block;
            border: solid 1px #DDD;
            background-color: #249220;
            opacity: 0.6;
            line-height: 140%;
            text-align: center;
            box-shadow: 0 0 0 rgba(255, 255, 255, 0);
            transition: border-color .15s ease-out,  color .25s ease-out,  background-color .15s ease-out, box-shadow .15s ease-out;
            cursor: pointer;
            border-radius: 1.6rem;
        }
        
        &[type=radio]:checked + label{
            background-color: #249220;
            opacity: 1;
            color: #FFF;
            box-shadow: 0 0 10px rgba(69, 192, 89, 0.5);
            border-color: #4B9DEA;
            z-index: 1;
        }
    `

    const gradeChangeHandler = () => {
        props.setChkedGrade(props.gradeData.subGradeId);
        props.setChkedGradeData(props.gradeData);
    }

    return (
        <>
            <th scope="col">
                <RadioButton type="radio" id={props.gradeData.enName} name="grade" value={props.gradeData.subGradeId} 
                            onChange={gradeChangeHandler} checked={props.chkedGrade === props.gradeData.subGradeId ? true : false}
                />
                <label htmlFor={props.gradeData.enName}>{props.gradeData.name}</label>
            </th>
        </>
    );
}

export default GradeView;