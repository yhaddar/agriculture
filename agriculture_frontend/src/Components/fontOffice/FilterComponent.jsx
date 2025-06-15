import React, {useEffect, useMemo, useRef} from "react";
import {MdSearch} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {CategoryBlogsThunk} from "../../Middleware/BlogsThunk.js";

export const FilterComponent = ({detail = false, page, size, FctThunk, setPage, service}) => {

    const search = useRef();
    const filterCategory = useRef();

    const { list } = useSelector(state => state.categoryBlogs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CategoryBlogsThunk({ service_type: service }));
    }, [])

    const AllCategories = useMemo(() => {
        return list;
    }, [list]);

    const handleChange = () => {
        const type = `search?q=${search?.current?.value}`;
        dispatch(FctThunk({service, type, size, page}));
    }

    const handleChangeCategory = () => {
        if (!(filterCategory.current?.value === "-")) {
            const type = `filter?category=${filterCategory?.current?.value}`;
            dispatch(FctThunk({service, type, size, page}));
            setPage(1);
        } else {
            dispatch(FctThunk({service, size, page}));
        }
    }

    return (
        <>
            <section className={"my-10 relative"}>
                <div className={"container mx-auto"}>
                    <div className={"w-[90%] mx-auto"}>
                        <div className={`${`h-[65px] flex justify-${detail ? "center" : "between"} items-center`}`}>
                            {
                                !detail ? <div className={"w-1/2"}>
                                    <select
                                        onChange={handleChangeCategory}
                                        ref={filterCategory}
                                        className={"w-[419px] h-[60px] outline-0 border-2 rounded-md category text-[18px] cursor-pointer px-1"}>
                                        <option selected={true} value={"-"}>All {service}</option>
                                        {
                                            Array.isArray(AllCategories) ?
                                                AllCategories?.length > 0 ?
                                                    AllCategories?.map((category, index) => (

                                                        <option
                                                            value={category.id}
                                                            key={index}
                                                        >
                                                            {category.title}
                                                        </option>

                                                    ))
                                                    : []
                                                : <option>{AllCategories.toString()}</option>
                                        }
                                    </select>
                                </div> : null
                            }
                            <div className={"w-1/2 flex justify-end"}>
                                <div className={"w-[727px] flex relative items-center"}>
                                    <input type={"text"}
                                           ref={search}
                                           onChange={handleChange}
                                           className={"h-[60px] border-2 rounded-md w-full px-2 capitalize text-lg outline-0 search"}
                                           placeholder={"search..."}/>
                                    <MdSearch className={"text-3xl absolute right-2 text-white"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}