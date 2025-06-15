import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AdminThunk} from "../../../../Middleware/AdminThunk.js";
import {TitleComponent} from "../../../../Components/fontOffice/TitleComponent.jsx";

export const OurTeams = () => {

    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.adminReducer);

    useEffect(() => {
        dispatch(AdminThunk({ key1: "admin", key2: "all" }));
    }, []);

    const adminFromMemo = useMemo(() => {
        return list || null;
    }, [list || null])

    return (
      <div className={"container mx-auto mt-[150px] mb-[100px]"}>
          <TitleComponent title={"our teams"} />
          <div className={"flex justify-between mt-10"}>
              {
                  adminFromMemo?.data?.map((admin, index) => {
                      return (
                          <div key={index} className={"card py-3 flex rounded-md items-center justify-center gap-4 w-[33%]"}>
                              <div className={""}>
                                  <div className={"w-[120px] h-[120px] rounded-full"}>
                                      <img className={"w-full h-full rounded-full"} alt={`${admin.full_name}`} src={`${admin.profile}`} />
                                  </div>
                              </div>
                              <div className={"w-[60%]"}>
                                  <h1 className={"text-[22px]"}>{admin.full_name}</h1>
                                  <h2 className={"text-[20px] capitalize"}>domain : {admin.domain}</h2>
                                  <h3 className={"text-[19px] capitalize"}>experience : {admin.experience}</h3>
                                  <h4 className={"text-[19px] text-opacity-2"}>{admin.email}</h4>
                                  <h5 className={"text-[19px] text-opacity-2"}>{admin.phone}</h5>
                              </div>
                          </div>
                      )
                  })
              }
          </div>
      </div>
    )
}