<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class AdminController extends Controller
{
    public function allAdmin(){
        try {

            $admins = DB::table("authentications as a")
                ->leftJoin("users as u", "a.id", "=", "u.user_id")
                ->select("a.full_name", "a.email", "a.profile", "u.domain", "u.experience", "u.phone")
                ->where("a.role", "=", "admin")
                ->limit(3)
                ->get();

            return response()->json([
                "data" => $admins,
            ], Response::HTTP_OK);

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
