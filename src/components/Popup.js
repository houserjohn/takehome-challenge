// A popup menu that has various options to choose from

import React from "react"

// Item component that represents items that can have multiple selections
// MultiSelectableItem Props (normally I would use typescript but this is the replacement)
// name: string
// selected: boolean
function MultiSelectableItem(props) {
    return (
        <div
            style={{
                cursor: "pointer",
                backgroundColor: (props.selected ? "#eef4fa" : "white"),
                padding: "10px 15px 10px 10px",
            }}

        >
            <input 
                type="checkbox" 
                checked={props.selected} 
                readOnly
                style={{
                    cursor: "pointer",
                    width: "15px",
                    height: "15px",
                    display: "inline-block",
                }}
            />
            <div
                style={{
                    display: "inline-block",
                    paddingLeft: "10px",
                    fontFamily: "Arial, Helvetica, sans-serif",
                }}
            >
                {props.name}
            </div>
        </div>
    );
} 

// Item component that represents items that can have only one selection
// SingleSelectableItem Props (normally I would use typescript but this is the replacement)
// name: string
// selected: boolean
function SingleSelectableItem(props) {
    return (
        <div
            style={{
                cursor: "pointer",
                backgroundColor: (props.selected ? "#eef4fa" : "white"),
                padding: "10px 15px 10px 10px",
            }}
        >
            <div
                style={{
                    display: "inline-block",
                    paddingLeft: "10px",
                    fontFamily: "Arial, Helvetica, sans-serif",
                }}
            >
                {props.name}
            </div>
        </div>
    );
} 

// This function generates the multiselect list (where multiple items can be selected)
function mutliselectList(props) {
     // When an option is clicked
     const onOptionClickedHandler = (index) => {
        // index as a string for the hashmap key
        const index_str = index.toString();

        props.setSelectedOptionsIndex(prevSelectedOptionsIndex => {
            // we need to check if this index was already selected
            let search_idx = prevSelectedOptionsIndex.findIndex(element => element === index);

            if (search_idx !== -1) {
                // index already existed, so let's remove it
                props.setIsSelectedOption(prevIsSelectedOption => {
                    let newIsSelectedOption =  {...prevIsSelectedOption}
                    newIsSelectedOption[index_str] = false
                    return newIsSelectedOption 
                })
                return prevSelectedOptionsIndex.slice(0,search_idx).concat(prevSelectedOptionsIndex.slice(search_idx+1))
            }
            // index doesn't exist, let's add it
            props.setIsSelectedOption(prevIsSelectedOption => {
                let newIsSelectedOption =  {...prevIsSelectedOption}
                newIsSelectedOption[index_str] = true
                return newIsSelectedOption 
            })
            return prevSelectedOptionsIndex.concat([index])
        })
    }

    // When the select all or deselect all button is pressed
    const onSelectAllHandler = () => {
        props.setSelectedOptionsIndex(prevSelectedOptionsIndex => {
            const OPTIONS_LEN = props.options.length;
            let unselected_idx = -1; // index of the first unselected option index
            for (let i = 0; i < OPTIONS_LEN; i++) {
                let index_str = i.toString();
                if (index_str in props.isSelectedOption) {
                    if (!(props.isSelectedOption[index_str])) {
                        unselected_idx = i;
                        break;
                    }

                } else {
                    unselected_idx = i;
                    break;
                }
            }

            if (unselected_idx !== -1) {
                // there is a non selected item

                let newSelectedOptionsIndex = [...Array(OPTIONS_LEN).keys()] // list of numbers from 0 to OPTIONS_LEN

                // Update hashmap so that all options indexs are selected
                props.setIsSelectedOption(prevIsSelectedOption => {
                    let newIsSelectedOption =  {};
                    newSelectedOptionsIndex.forEach((idx) => newIsSelectedOption[idx] = true);
                    return newIsSelectedOption;
                })
                return newSelectedOptionsIndex
            }
            // there is no non selected items, so we need to deselect all
            props.setIsSelectedOption(prevIsSelectedOption => {
                return {};
            });

            return []
        })
    }

    return (
        <div>
            { 
                // we use an array with one element in it so that we can write code
                // that can calculate whether all items are selected or not in the mapping function
                [""].map(() => {
                    const OPTIONS_LEN = props.options.length;
                    let allSelected = false;
                    let unselected_idx = -1; // index of the unselected option
                    for (let i = 0; i < OPTIONS_LEN; i++) {
                        let index_str = i.toString();
                        if (index_str in props.isSelectedOption) {
                            if (!(props.isSelectedOption[index_str])) {
                                unselected_idx = i;
                                break;
                            }

                        } else {
                            unselected_idx = i;
                            break;
                        }
                    }
                    if (unselected_idx === -1) allSelected = true; // if there is no unselected option, then everything is selected
                    return (
                        <div key="-1" onClick={() => onSelectAllHandler()}>
                                
                            { 
                                <MultiSelectableItem 
                                    
                                    name={allSelected ? "Deselect all" : "Select all"} 
                                    selected={allSelected}
                                    
                                />
                            }
                        </div>
                    );
                })
                
            
                
            }
            {props.options.map((option, index) =>
                {
                    // Determine if this option is currently selected
                    let isSelected = false;
                    const index_str = index.toString();
                    if (index_str in props.isSelectedOption) isSelected = props.isSelectedOption[index_str]
                

                    return (
                        <div key={index} onClick={() => onOptionClickedHandler(index)}>
                        
                        { 
                            <MultiSelectableItem 
                                
                                name={option} 
                                selected={isSelected}
                                
                            />
                        }
                        </div>
                    );
                }
            )}
        </div>
    );
}

// A list where you can only select a single item
function singleSelectList(props) {
     // When an option is clicked (the index of the option is passed)
     const onOptionClickedHandler = (index) => {
        // index as a string for the hashmap key
        const index_str = index.toString();

        props.setIsSelected(false); // close the popup menu once they have selected

        props.setSelectedOptionsIndex(prevSelectedOptionsIndex => {
            // only one item is selected at a time
            props.setIsSelectedOption(prevIsSelectedOption => {
                let newIsSelectedOption =  {}
                newIsSelectedOption[index_str] = true
                return newIsSelectedOption 
            })
            return [index]
        })
    }

    return (
        <div>
            {props.options.map((option, index) =>
                {
                    // Determine if this option is currently selected
                    let isSelected = false;
                    const index_str = index.toString();
                    if (index_str in props.isSelectedOption) isSelected = props.isSelectedOption[index_str]
                

                    return (
                        <div key={index} onClick={() => onOptionClickedHandler(index)}>
                        
                        { 
                            <SingleSelectableItem 
                                
                                name={option} 
                                selected={isSelected}
                                
                            />
                        }
                        </div>
                    );
                }
            )}
        </div>
    );
}

// Popup Props (normally I would use typescript but this is the replacement)
// width: string (ex: "10px")
// options: Array<string>
// selectedOptionsIndex: Array<number>
// setSelectedOptionsIndex: function
// isSelectedOption: Record<string, index>
// setIsSelectedOption: function
// multiselect: boolean
// setIsSelected: function
function Popup(props) {
    return (
        
            <div 
                style={{ // this is the popup wrapper
                    position: "absolute",
                    width: props.width,
                    zIndex: "10",
                    boxShadow: "0px 4px 5px 0px gray",
                    padding: "5px 0px 5px 0px",
                }}
            >
                <div
                    style={{ 
                        zIndex: "10",
                        padding: "5px 0px 5px 0px",
                        width: "fit",
                        overflowY: "auto",
                        overflowX: "hidden",
                        height: "10em",
                    }}
                >
                    { // We will generate different lists depending if this multiselect or single select
                        props.multiselect ?
                            mutliselectList(props)
                        :
                            singleSelectList(props)
                    }
                </div>
                
            </div>
        
    )
}

export default Popup;