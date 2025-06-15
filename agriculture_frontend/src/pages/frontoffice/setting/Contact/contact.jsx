import React from "react";
import {HeroComponent} from "../../../../Components/fontOffice/HeroComponent.jsx";
import {ContactForm} from "./contactForm/ContactForm.jsx";
import {ContactInfo} from "./contactInfo/ContactInfo.jsx";

export const Contact = () => {
    return (
        <>
            <HeroComponent service={"contact"} />
            <ContactForm />
            <ContactInfo />
        </>
    )
}