<?php

namespace App\Http\Controllers;

use App\Http\Requests\CoursesRequest;
use App\Models\Courses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CoursesController extends Controller
{
    public function category(string $category_id)
    {
        try {

            $courses = DB::table("categories_courses")
                ->select("cover as image", "title", "description")->where("id", $category_id)->first();

            return response()->json([
                "data" => $courses,
            ], Response::HTTP_OK);

        } catch (\Exception $e) {
            return response()->json([
                "error" => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function coursesByCategory(string $category_id)
    {
        $courses = DB::table("courses as cs")
            ->leftJoin("comments as comment", function ($join) {
                $join->on("comment.courses_id", "=", "cs.id")
                    ->where("comment.type", "COURSES");
            })
            ->join("categories_courses as cc", "cc.id", "=", "cs.category_id")
            ->select(
                "cc.title as category_title",
                "cs.id",
                "cs.title as courses_title",
                "cs.description",
                "cs.cover",
                "cs.type_payment",
                DB::raw("ROUND(AVG(comment.rate), 2) as avg_rate"),
                DB::raw("COUNT(comment.id) as total_person_rate")
            )
            ->where("cs.category_id", $category_id)
            ->groupBy(
                "cs.id",
                "cs.title",
                "cs.description",
                "cs.cover",
                "cs.type_payment",
                "cc.title"
            )
            ->orderBy("cs.created_at", "desc")
            ->get();


        return response()->json([
            "data" => $courses->isEmpty() ? "Lessons will be added to this category soon..." : $courses,
        ], Response::HTTP_OK);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $categories = DB::table("categories_courses")->get();

        $courses = $categories->map(function ($category) {

            $courses = DB::table("courses as cs")
                ->leftJoin("comments as comment", function ($join) {
                    $join->on("comment.courses_id", "=", "cs.id")
                        ->where("comment.type", "COURSES");
                })
                ->join("categories_courses as cc", "cc.id", "=", "cs.category_id")
                ->select(
                    "cc.title as category_title",
                    "cs.id",
                    "cs.title as courses_title",
                    "cs.description",
                    "cs.cover",
                    "cs.type_payment",
                    DB::raw("ROUND(AVG(comment.rate), 2) as avg_rate"),
                    DB::raw("COUNT(comment.id) as total_person_rate")
                )
                ->where("cs.category_id", $category->id)
                ->groupBy(
                    "cs.id", "cs.title", "cs.description", "cs.cover", "cs.type_payment", "cc.title"
                )
                ->orderBy("cs.created_at", "desc")
                ->limit(3)
                ->get();


            return [
                "category_title" => $category->title,
                "category_id" => $category->id,
                "courses" => $courses->isEmpty() ? "Lessons will be added to this category soon..." : $courses,
            ];
        });


        return response()->json([
            "data" => $courses->isEmpty() ? "Lessons will be added soon..." : $courses,
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
     * function for create courses
     */
    public function store(CoursesRequest $request)
    {
        try {

            $user = Auth::user();


            $courses = new Courses();
            $courses["title"] = $request["title"];
            $courses["description"] = $request["description"];
            $courses["keys_learning"] = $request["keys_learning"];
            $courses["modules_and_topics"] = $request["modules_and_topics"];
            $courses["total_hours"] = $request["total_hours"];
            $courses["price"] = $request["price"];
            $courses["user_id"] = $user["id"];
            $courses["langues"] = $request->input("langues");
            $courses["id"] = Str::uuid();
            $courses["type_video"] = $request["type_video"];
            $courses["type_payment"] = $request["type_payment"];

            $cover = $request->file("cover")->store("courses", "s3");
            Storage::disk("s3")->setVisibility($cover, "public");
            $courses["cover"] = Storage::disk('s3')->url($cover);

            $courses["category_id"] = $request["category_id"];
            $courses["old_price"] = $request["old_price"] ?? 0;

            $trailer = $request->file("trailer")->store("trailer", "s3");
            Storage::disk("s3")->setVisibility($trailer, "public");

            $courses["trailer"] = Storage::disk('s3')->url($trailer);

            if ($courses->save()) {
                return response()->json([
                    "data" => "the course has been created",
                ], Response::HTTP_OK);
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
        $courses = DB::table("courses as cs")
            ->join("categories_courses as cc", "cc.id", "=", "cs.category_id")
            ->leftJoin("likes as like", function ($join) {
                $join->on("like.courses_id", "=", "cs.id")
                    ->where("like.type", "COURSES");
            })
            ->leftJoin("comments as comment", function ($join) {
                $join->on("comment.courses_id", "=", "cs.id")
                    ->where("comment.type", "COURSES");
            })
            ->leftJoin("video_courses as vc", "vc.course_id", "=", "cs.id")
            ->select(
                "cc.title as category_title",
                "cs.*",
                DB::raw("COUNT(DISTINCT vc.id) as videos_count"),
                DB::raw("ROUND(AVG(comment.rate), 2) as avg_rate"),
                DB::raw("COUNT(DISTINCT comment.id) as total_person_rate"),
                DB::raw("COUNT(DISTINCT like.id) as likes_count")
            )
            ->where("cs.id", $id)
            ->groupBy(
                "cs.id",
                "cc.title",
                "cs.title",
                "cs.description",
                "cs.cover",
                "cs.category_id",
                "cs.created_at",
                "cs.updated_at"
            )
            ->first();




        return response()->json([
            "data" => $courses,
        ], Response::HTTP_OK);
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

    public function filterCoursesByRating(Request $request)
    {
        $size = (int)$request->query("size");

        $courses = DB::table("courses as cs")
            ->join("categories_courses as cc", "cc.id", "=", "cs.category_id")
            ->leftJoin("comments as comment", function ($join) {
                $join->on("comment.courses_id", "=", "cs.id")
                    ->where("comment.type", "COURSES");
            })
            ->select(
                "cs.title as courses_title",
                "cs.description",
                "cs.id",
                "cs.type_payment",
                "cs.cover",
                DB::raw("ROUND(AVG(comment.rate), 2) as avg_rate"),
                DB::raw("COUNT(comment.id) as total_person_rate"),
                "cc.title as category_title"
            )
            ->groupBy(
                "cs.id", "cs.title", "cs.description", "cs.type_payment",
                "cs.cover", "cc.title"
            )
            ->orderBy(DB::raw("MAX(comment.rate)"), "desc")
            ->paginate($size);


        return response()->json([
            "data" => $courses,
        ], Response::HTTP_OK);
    }
}
