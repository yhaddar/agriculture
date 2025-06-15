<?php

namespace App\Http\Controllers;

use App\Http\Requests\LikeRequest;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LikeRequest $request, string $type)
    {
        try {

            $user = Auth::user();

            $like = new Like();
            $like["user_id"] = $user["id"];
            $like["service_id"] = $type === "news" || $type === "blogs" ? $request["service_id"] : null;
            $like["courses_id"] = $type === "courses" ? $request["courses_id"] : null;
            $like["type"] = Str::upper($type);
            $like["id"] = Str::uuid();

            if($like->save()) {
                return response()->json([
                    "data" => true
                ], Response::HTTP_CREATED);
            }

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
