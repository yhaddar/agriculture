import React, {useMemo} from "react";
import {InnovationComponent} from "./InnovationComponent.jsx";
import {PaginationComponent} from "./PaginationComponent.jsx";
import {NotFound} from "../_not_found.jsx";

export const AllInnovationComponent = ({list, page, setPage}) => {

    const InnovationFromMemo = useMemo(() => {
        return list || null
    }, [list || null])


    return (<>

        <div className={"container mx-auto my-[50px]"}>
            {
                InnovationFromMemo?.data?.length > 0 ?
                    <div>
                        <div className={"w-full flex gap-3"}>

                            <div className={"w-1/2"}>

                                {InnovationFromMemo?.data[0] ? <div className={"h-[300px] w-full"}>

                                    <InnovationComponent
                                        innovation={InnovationFromMemo?.data[0]?.innovation}
                                        image={InnovationFromMemo?.data[0]?.image}
                                        inventor={InnovationFromMemo?.data[0]?.inventor}
                                        date_creation={InnovationFromMemo?.data[0]?.date_creation}
                                        description={InnovationFromMemo?.data[0]?.description}
                                        id={InnovationFromMemo?.data[0]?.id}
                                        rating={InnovationFromMemo?.data[0]?.avg_rate}
                                        index={1}
                                        total_person_rate={InnovationFromMemo?.data[0]?.total_person_rate}
                                    />

                                </div> : null}

                            </div>
                            <div className={"w-1/2"}>

                                {InnovationFromMemo?.data[1] ? <div className={"h-[300px] w-full"}>

                                    <InnovationComponent
                                        innovation={InnovationFromMemo?.data[1]?.innovation}
                                        image={InnovationFromMemo?.data[1]?.image}
                                        inventor={InnovationFromMemo?.data[1]?.inventor}
                                        date_creation={InnovationFromMemo?.data[1]?.date_creation}
                                        description={InnovationFromMemo?.data[1]?.description}
                                        id={InnovationFromMemo?.data[1]?.id}
                                        rating={InnovationFromMemo?.data[1]?.avg_rate}
                                        index={2}
                                        total_person_rate={InnovationFromMemo?.data[1]?.total_person_rate}
                                    />

                                </div> : null}

                            </div>

                        </div>
                        <div className={"my-[20px] w-full flex gap-3"}>

                            <div className={"w-1/2"}>

                                {InnovationFromMemo?.data[2] ? <div className={"h-[300px] w-full"}>

                                    <InnovationComponent
                                        innovation={InnovationFromMemo?.data[2]?.innovation}
                                        image={InnovationFromMemo?.data[2]?.image}
                                        inventor={InnovationFromMemo?.data[2]?.inventor}
                                        date_creation={InnovationFromMemo?.data[2]?.date_creation}
                                        description={InnovationFromMemo?.data[2]?.description}
                                        id={InnovationFromMemo?.data[2]?.id}
                                        rating={InnovationFromMemo?.data[2]?.avg_rate}
                                        index={3}
                                        total_person_rate={InnovationFromMemo?.data[2]?.total_person_rate}
                                    />

                                </div> : null}

                            </div>
                            <div className={"w-1/2"}>

                                {InnovationFromMemo?.data[3] ? <div className={"h-[300px] w-full"}>

                                    <InnovationComponent
                                        innovation={InnovationFromMemo?.data[3]?.innovation}
                                        image={InnovationFromMemo?.data[3]?.image}
                                        inventor={InnovationFromMemo?.data[3]?.inventor}
                                        date_creation={InnovationFromMemo?.data[3]?.date_creation}
                                        description={InnovationFromMemo?.data[3]?.description}
                                        id={InnovationFromMemo?.data[3]?.id}
                                        rating={InnovationFromMemo?.data[3]?.avg_rate}
                                        index={4}
                                        total_person_rate={InnovationFromMemo?.data[3]?.total_person_rate}
                                    />

                                </div> : null}

                            </div>

                        </div>
                    </div>
                    : <NotFound text={InnovationFromMemo}/>
            }
        </div>

        <PaginationComponent setPage={setPage} page={page} currentPage={list?.current_page || 4}
                             lastPage={list?.last_page}/>
    </>)
}