import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WeatherThunk } from "../../../../Middleware/WeatherThunk.js";
import moment from "moment";
import {dateFormat} from "../../../../utils/dateFormat.js";

export const Weather = () => {
    const dispatch = useDispatch();
    const { list, loading } = useSelector((state) => state.weatherReducer);

    useEffect(() => {
        dispatch(WeatherThunk());
    }, [dispatch]);

    if (loading || !list) {
        return <div className="text-white text-center p-4">Loading...</div>;
    }

    const city = list.weather?.name || "Unknown City";
    const country = list.weather?.sys?.country || "";
    const forecast = list.forecast?.list || [];

    const grouped = forecast.reduce((acc, entry) => {
        const date = moment(entry.dt_txt).format("YYYY-MM-DD");
        if (!acc[date]) acc[date] = [];
        acc[date].push(entry);
        return acc;
    }, {});

    const today = moment().format("YYYY-MM-DD");
    const tomorrow = moment().add(1, 'day').format("YYYY-MM-DD");
    const dayAfter = moment().add(2, 'day').format("YYYY-MM-DD");

    const getDailySummary = (entries) => {
        if (!entries || entries.length === 0) return null;
        const entry = entries[Math.floor(entries.length / 2)];
        const temp = Math.round(entry.main.temp - 273.15);
        const desc = entry.weather[0].main;
        const icon = `https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`;
        return { temp, desc, icon };
    };

    const summaries = [
        { date: today, ...getDailySummary(grouped[today]) },
        { date: tomorrow, ...getDailySummary(grouped[tomorrow]) },
        { date: dayAfter, ...getDailySummary(grouped[dayAfter]) },
    ];

    return (
        <div className={"container mx-auto"}>
            <div className="flex justify-center">
                <div className="w-full max-w-6xl text-white rounded-xl p-8">
                    <div className="flex flex-col sm:flex-row gap-8 items-center justify-between">

                        <div
                            className="flex items-center gap-6 border-b-2 sm:border-b-0 sm:border-r pb-6 sm:pb-0 sm:pr-8 flex-1">
                            <div className="w-[190px] h-[150px]">
                                <img src={summaries[0].icon} alt={summaries[0].desc}
                                     className="w-full h-full object-cover"/>
                            </div>
                            <div className="flex flex-col">
                                <p className=" font-bold text-[30px]">{city}, {country}</p>
                                <p className="text-[20px] text-gray-300">{dateFormat(today)}</p>
                                <p className="capitalize text-[20px]">{summaries[0].desc}</p>
                            </div>
                            <p className="text-3xl font-extrabold ml-auto">{summaries[0].temp}°C</p>
                        </div>

                        <div className="flex flex-col gap-4 flex-1 w-[60%]">
                            {summaries.slice(1).map((item, idx) => (
                                <div key={idx} className="flex items-center gap-6">
                                    <div className={"w-[100px] h-[100px]"}>
                                        <img src={item.icon} alt={item.desc} className="w-full h-full object-contain"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[20px] font-semibold">{dateFormat(item.date)}</p>
                                        <p className=" font-bold text-[18px]">{city}, {country}</p>
                                        <p className="text-[18px] text-gray-300">{item.desc}</p>
                                    </div>
                                    <p className="text-2xl font-bold ml-auto">{item.temp}°C</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
