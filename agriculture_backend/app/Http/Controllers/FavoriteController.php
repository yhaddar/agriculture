<?php

namespace App\Http\Controllers;

use App\Enums\TypeFavorite;
use App\Http\Requests\FavoriteRequest;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $favorite = DB::table("favorites as f")
            ->join("services as s", "s.id", "f.blog_id")
            ->join("categories as c", "c.id", "=", "s.category_id")
            ->select("s.*", "c.title as category_title")
            ->where("f.user_id", $user["id"])
            ->where("f.type", "BLOGS")->get();

        $courses = DB::table("favorites as f")
            ->join("courses as c", "c.id", "=", "f.course_id")
            ->join("categories_courses as cc", "cc.id", "=", "c.category_id")
            ->leftJoin("comments as comment", function ($join) {
                $join->on("comment.courses_id", "=", "c.id")
                    ->where("comment.type", "COURSES");
            })
            ->select("c.*", "f.id as favoriteId", "cc.title as category_title", "c.title as courses_title", DB::raw("COUNT(DISTINCT comment.id) as total_person_rate"), DB::raw("ROUND(AVG(comment.rate), 2) as avg_rate"))
            ->where("f.user_id", $user["id"])
            ->where("f.type", "COURSES")
            ->groupBy(
                "c.id",
                "cc.title",
                "c.title",
                "c.description",
                "c.cover",
                "c.category_id",
                "c.created_at",
                "c.updated_at",
                "f.id"
            )->get();

        return response()->json([
            "data" => [
                "blogs" => $favorite->isEmpty() ? [] : $favorite,
                "courses" => $courses->isEmpty() ? [] : $courses,
            ]
        ], Response::HTTP_OK);
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
    public function store(FavoriteRequest $request, string $type)
    {
        try {

            $user = Auth::user();

            $favorite = new Favorite();
            $favorite["id"] = Str::uuid();
            $favorite["user_id"] = $user["id"];
            $favorite["type"] = $type === "courses" ? TypeFavorite::COURSES : TypeFavorite::BLOGS;
            $favorite["course_id"] = $type === "courses" ? $request["course_id"] : null;
            $favorite["blog_id"] = $type === "blogs" ? $request["blog_id"] : null;

            if ($favorite->save()) {
                return response()->json([
                    "data" => true,
                ], Response::HTTP_CREATED);
            } else {
                throw new \Exception("failed to added to your favorite");
            }

        } catch (\Exception $e) {
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
        $favorite = Favorite::destroy($id);
        if ($favorite) {
            return response()->json([
                "data" => false,
            ], Response::HTTP_OK);
        }
    }
}
