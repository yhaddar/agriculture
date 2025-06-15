import React from "react";

export const KeyLearning = ({ keyLearning }) => {

    const lists = document.querySelectorAll(".key ul");
    lists.forEach((item) => {
        item.classList.add("list-disc", "ml-[38px]");
    });

    const lists2 = document.querySelectorAll(".key ol");
    lists2.forEach((item) => {
        item.classList.add("list-decimal", "ml-[38px]");
    })


    return (
        <>
            <h1 className={"text-2xl capitalize"}>key learning objectives :</h1>
            <div className={"text-white text-[20px] mb-[15px] key leading-[40px] my-3 setting fist-letter:capitalize"} dangerouslySetInnerHTML={{ __html: keyLearning }} />
        </>
    )
}