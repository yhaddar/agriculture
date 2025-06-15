<?php

namespace App\Http\Controllers;

use App\Http\Requests\OurAppsRequest;
use App\Http\Requests\OurServicesRequest;
use App\Http\Requests\PrivacyPolicyRequest;
use App\Models\faq;
use App\Models\OurApp;
use App\Models\OurServices;
use App\Models\PrivacyPolicy;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Stevebauman\Location\Facades\Location;
use Symfony\Component\HttpFoundation\Response;

class SettingController extends Controller
{
    /**
     * add the privacy policy of the website
     */
    public function addSetting(PrivacyPolicyRequest $request, string $setting) {
        try {

            $settingData = $setting == "privacy-policy" ? new PrivacyPolicy() : new FAQ();
            $settingData["id"] = Str::uuid();
            $settingData["title"] = $request["title"];
            $settingData["description"] = $request["description"];

            if($settingData->save()){
                return response()->json([
                    "data" => "the $setting has been added"
                ], Response::HTTP_CREATED);
            }

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function getSetting(string $setting) {
        try {

            $params = DB::table("$setting")->get();

            $resultSetting = match($setting) {
                'our_apps' => 'apps',
                'privacy_policy' => 'privacy policy',
                default => $setting,
            };

            return response()->json([
               "data" => $params->isEmpty() ? "no $resultSetting found" : $params,
            ], RESPONSE::HTTP_OK);

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function addOurApps(OurAppsRequest $request) {
        try {


            if($request->hasFile("image")){
                $file_name = time() . "_" . $request["image"]->getClientOriginalName();
            }else {
                $file_name = null;
            }

            $ourApps = new OurApp();
            $ourApps["id"] = Str::uuid();
            $ourApps["description"] = $request["description"];
            $ourApps["link"] = $request["link"];
            $ourApps["services"] = $request["services"];

            $cover = $request->file("image")->store("ourApps", "s3");
            Storage::disk("s3")->setVisibility($cover, "public");
            $ourApps["image"]  = Storage::disk('s3')->url($cover);


            if($ourApps->save()) {
                return response()->json([
                    "data" => "the our apps has been added"
                ]);
            }

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function addOurServices(OurServicesRequest $request) {
        try {

            $ourService = new OurServices();
            $ourService["id"] = Str::uuid();
            $ourService["title"] = $request["title"];
            $ourService["description"] = $request["description"];

            if($request->hasFile("image")){
                $file_name = time() . "_" . $request["image"]->getClientOriginalName();
            }else {
                $file_name = null;
            }

            $cover = $request->file("image")->store("ourService", "s3");
            Storage::disk("s3")->setVisibility($cover, "public");
            $ourService["image"] = Storage::disk('s3')->url($cover);

            if($ourService->save()) {
                return response()->json([
                    "data" => "the our services has been added"
                ]);
            }

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function weather(){
        try {

//            $ip = request()->ip() === '127.0.0.1' ? '8.8.8.8' : request()->ip();

            // Get the location

            $ip = "196.200.128.0";
            $location = Location::get($ip);
            $api_key = env("API_KEY_WEATHER");

            $weather = Http::get("https://api.openweathermap.org/data/2.5/weather?q=$location->cityName,ma&appid=$api_key")->json();
            $forecast = Http::get("https://api.openweathermap.org/data/2.5/forecast?q=$location->cityName&appid=$api_key")->json();

            return response()->json([
                'weather' => $weather,
                "forecast" => $forecast
            ], Response::HTTP_OK);

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

}
