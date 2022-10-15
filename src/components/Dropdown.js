// Basic dropdown from the problem description

import React, { useState } from "react";
import Popup from "./Popup";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

// Dropdown Props (normally I would use typescript but this is the replacement)
// width: string (ex: "10px")
// options: Array<string>
// multiselect: boolean
// tag: string
function Dropdown(props) {
    // Whether the current dropdown is selected
    const [ isSelected, setIsSelected ] = useState(false);

    // If the multiselect option is turned off, the first option should be chosen by default
    let startingSelectOptionsIndex = []
    if (!(props.multiselect)) {
        if (props.options.length > 0) startingSelectOptionsIndex = [0]
    }

    // A list of the options that are selected by index 
    const [ selectedOptionsIndex, setSelectedOptionsIndex ] = useState(startingSelectOptionsIndex);

    // If the multiselect option is turned off, the first option should be chosen by default
    let startingIsSelectedOption = {}
    if (!(props.multiselect)) {
        if (props.options.length > 0) startingIsSelectedOption = {"0": true}
    }

    // A hashmap of the options that are selected by index (for O(1) access time) 
    const [ isSelectedOption, setIsSelectedOption ] = useState(startingIsSelectedOption);

    // Dropdown width
    const width = props.width;

    // Handles when the dropdown is clicked
    const onClickHandler = () => {
        setIsSelected(prevValue => !prevValue)
    }

    return (    
        <div // this div is required to get the popup properly work
            style={{
                padding: "0px",
                position: "static",
                display: "inline-block",
            }}
        >    
            <fieldset // this field set gives us the text in the top corner
                style={{
                    border: `1.5px solid ${isSelected ? "#3874cc" : "black"}`, 
                    borderRadius: "3px",
                    padding: "5px 3px 5px 3px",
                    display: "inline-block",
                    cursor: "pointer",
                    width: width,
                }}

                onClick={onClickHandler} // The dropdown was clicked
            >
                <legend // The text that appears in the top left corner
                    style={{
                        fontSize: "0.65em",
                        padding: "0px 2px 0px 2px",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        color: isSelected ? "#3874cc" : "black"
                    }}
                >
                    {props.tag}
                </legend>
                <div // The actual text inside the dropdown
                    style={{
                        backgroundColor: "white",
                        border: "0px",
                        cursor: "pointer",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        paddingLeft: "5px",
                        display: "inline-block",
                    }}
                    
                >
                    {selectedOptionsIndex.length !== 0 ? selectedOptionsIndex.map((index) => props.options[index]).join(', ') : "None"}
                </div>
                <div
                    style={{
                        display: "inline-block",
                        float: "right",
                    }}
                >
                {
                    isSelected ? 
                        <IoMdArrowDropup
                            style={{
                                
                            }}
                        />
                    :
                        <IoMdArrowDropdown
                            style={{
                                display: "inline-block",
                            }}
                        />
                }
                </div>
                
            </fieldset>     
            {
                // Show the popup when clicked
                isSelected ? 
                    <Popup 
                        width={width} 
                        options={props.options}
                        selectedOptionsIndex={selectedOptionsIndex}
                        setSelectedOptionsIndex={setSelectedOptionsIndex}
                        isSelectedOption={isSelectedOption}
                        setIsSelectedOption={setIsSelectedOption}
                        multiselect={props.multiselect}
                        setIsSelected={setIsSelected}
                    /> 
                : 
                    ""
            }
        </div>
          
    )
}

export default Dropdown;