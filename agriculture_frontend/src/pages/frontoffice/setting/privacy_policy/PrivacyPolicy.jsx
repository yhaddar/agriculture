import React from "react";
import {HeroComponent} from "../../../../Components/fontOffice/HeroComponent.jsx";
import {SettingComponent} from "../../../../Components/fontOffice/SettingComponent.jsx";

export const PrivacyPolicy = () => {

    return (
        <>
            <HeroComponent service={"privacyPolicy"} />
            <SettingComponent setting={"privacy_policy"} />
        </>
    );
}