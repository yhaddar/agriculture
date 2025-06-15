<?php

namespace App\Http\Controllers;

use App\Http\Requests\VideoCoursesRequest;
use App\Models\VideoCourses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class VideoCoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $courses_id)
    {
        try {

            $user = Auth::user();

            $courses = DB::table("video_courses")->where("course_id", $courses_id)->orderBy("order", "asc")->get();

            $checkout = DB::table("checkouts as check")
                ->where("check.user_id", $user["id"])
                ->whereRaw("JSON_CONTAINS(check.my_learning, '\"{$courses_id}\"')")
                ->select("check.status")
                ->first();

            return response()->json([
                "data" => [
                    "courses" => $courses->isEmpty() ? "Videos will be added soon..." : $courses,
                    "checkout" => $checkout
                ]
            ], Response::HTTP_OK);


        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
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
    public function store(VideoCoursesRequest $request)
    {
        try {

            $user = Auth::user();

            $video = new VideoCourses();
            $video["id"] = Str::uuid();
            $video["user_id"] = $user["id"];
            $video["title"] = $request["title"];
            $video["description"] = $request["description"];
            $video["order"] = $request["order"];
            $video["course_id"] = $request["course_id"];

            if($request->has("cover") && $request->has("video_link")){

                $cover = $request->file("cover")->store("video_courses", "s3");
                Storage::disk("s3")->setVisibility($cover, "public");
                $video["cover"] = Storage::disk('s3')->url($cover);

                $video_courses = $request->file("video_link")->store("/videos/video_courses", "s3");
                Storage::disk("s3")->setVisibility($video_courses, "public");
                $video["video_link"] = Storage::disk('s3')->url($video_courses);
            }

            if($video->save()){
                return response()->json([
                    "data" => "the video has been created",
                ], Response::HTTP_CREATED);
            }else {
                throw new \Exception("failed to create the video");
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
