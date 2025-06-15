import React, {useMemo} from "react";
import {TitleComponent} from "../../../../Components/fontOffice/TitleComponent.jsx";
import {OurServiceComponent} from "../../../../Components/fontOffice/OurServiceComponent.jsx";

export const OurServices = ({services}) => {

    const ourServiceMemo = useMemo(() => {
        return services || null;
    }, [services || null]);


    return (
        <div className="container mx-auto my-5">
            <TitleComponent title={"our services"}/>
            <div className="mx-auto mt-10 overflow-hidden">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                >
                    {
                        Array.isArray(ourServiceMemo) && ourServiceMemo?.map((slide, key) => (
                            <OurServiceComponent
                                key={key}
                                title={slide.title}
                                image={slide.image}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
