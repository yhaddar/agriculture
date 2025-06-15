<?php

namespace App\Http\Controllers;

use App\Enums\ServiceEnum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class StatistiqueController extends Controller
{
    public function getCountes(){
        try{

            $blogs = DB::table("services")->where("service_type", "=", ServiceEnum::BLOGS)->count();
            $courses = DB::table("courses")->count();
            $fermer = DB::table("authentications")
                ->where("role", "=", "agricultor")
                ->whereNotNull("email_verified_at")
                ->count();

            $innovations = DB::table("innovations")->count();

            return response()->json([
                "data" => array("blogs" => $blogs, "courses" => $courses, "fermer" => $fermer, "innovations" => $innovations),
            ], Response::HTTP_OK);

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
