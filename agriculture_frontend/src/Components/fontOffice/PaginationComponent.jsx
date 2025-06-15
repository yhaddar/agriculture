import React from "react";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";

export const PaginationComponent = ({setPage, page, currentPage, lastPage}) => {


    return (
        <>
            <section>
                <div className={"container mx-auto"}>
                    <div className={"flex justify-center py-10 gap-1"}>

                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={currentPage === 1}
                            className={"prev w-[40px] h-[40px] rounded-sm border-2 flex items-center justify-center active:scale-90"}>
                            <GrFormPrevious className={"text-white text-3xl"}/>
                        </button>

                        {
                            page <= lastPage && (
                                <button
                                    disabled={page === lastPage}
                                    onClick={() => setPage(page + 1)}
                                    className={"prev w-[40px] h-[40px] page-active rounded-sm border-2 flex items-center justify-center active:scale-90"}>
                                    <p>{page}</p>
                                </button>
                            )
                        }

                        {
                            page + 1 <= lastPage && (
                                <button
                                    onClick={() => setPage(page + 1)}
                                    className={"prev w-[40px] h-[40px] rounded-sm border-2 flex items-center justify-center active:scale-90"}>
                                    <p>{page + 1}</p>
                                </button>
                            )
                        }

                        {
                            page + 2 <= lastPage && (
                                <button
                                    onClick={() => setPage(page + 2)}
                                    className={"prev w-[40px] h-[40px] rounded-sm border-2 flex items-center justify-center active:scale-90"}>
                                    <p>{page + 2}</p>
                                </button>
                            )
                        }


                        <button
                            disabled={lastPage === page}
                            className={"prev w-[40px] h-[40px] rounded-sm border-2 flex items-center justify-center active:scale-90"}
                            onClick={() => setPage(page + 1)}>
                            <GrFormNext className={"text-white text-3xl"}/>
                        </button>

                    </div>
                </div>

            </section>
        </>
    )
}