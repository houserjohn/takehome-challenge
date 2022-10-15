// Home page where you can see the different uses of Dropdown
import React from "react";
import Dropdown from "./components/Dropdown";

function Home() {
    return (
        <div>
            <Dropdown
                width="20em"
                options={[
                    "Oliver Hansen",
                    "Van Henry",
                    "Ralph Hubbard",
                    "Frederick Douglas",
                    "Albert Einstein",
                    "Oliver Hansen",
                    "Van Henry",
                    "Ralph Hubbard",
                    "Frederick Douglas",
                    "Albert Einstein",
                    "Oliver Hansen",
                    "Van Henry",
                    "Ralph Hubbard",
                    "Frederick Douglas",
                    "Albert Einstein",
                ]}
                multiselect={true}
                tag={"Tag"}
            />
            <Dropdown
                width="fit"
                options={[
                    "None",
                    "Twenty",
                    "Twenty one",
                    "Twenty one and a half"
                ]}
                multiselect={false}
                tag={"Age"}
            />
        </div>
    )
}

export default Home;