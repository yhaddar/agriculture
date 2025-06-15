import React from "react";
import {HeroComponent} from "../../../../Components/fontOffice/HeroComponent.jsx";
import {SettingComponent} from "../../../../Components/fontOffice/SettingComponent.jsx";

export const FAQ = () => {

    return (
        <>
            <HeroComponent service={"faq"} />
            <SettingComponent setting={"faq"} />
        </>
    );
}