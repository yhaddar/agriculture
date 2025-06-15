<?php

namespace App\Http\Controllers;

use App\Models\MyLearning;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class MyLearningController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $my_learning = DB::table('my_learning as l')
            ->where("l.user_id", $user["id"])
            ->join("courses as c", "c.id", "=", "l.courses_id")
            ->leftJoin("comments as comment", function ($join) {
                $join->on("comment.courses_id", "=", "c.id")
                    ->where("comment.type", "COURSES");
            })
            ->join("categories_courses as cc", "cc.id", "=", "c.category_id")
            ->select("l.id as learningId", "c.id as coursesId", "l.isPaid", "c.title as courses_title", "cc.title as category_title", "l.isFree", "c.cover", "c.price", DB::raw("COUNT(DISTINCT comment.id) as total_person_rate"), DB::raw("ROUND(AVG(comment.rate), 2) as avg_rate"))
            ->groupBy("l.id")
            ->get();

        $count = DB::table('my_learning as l')
            ->where("l.isFree", false)
            ->where("user_id", $user["id"])
            ->count();

        return response()->json([
            "data" => [
                "learning_list" => $my_learning->isEmpty() ? "no courses yet" : $my_learning,
                "countIsPaid" => $count
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
    public function store(Request $request)
    {
        try {

            $user = Auth::user();

            $exist = DB::table("my_learning")->where("user_id", $user["id"])->where("courses_id", $request["courses_id"])->get();

            if(!$exist->isEmpty()){

                throw new \Exception("this courses already exist");

            }else {
                $myLearning = new MyLearning();
                $myLearning["id"] = Str::uuid();
                $myLearning["courses_id"] = $request["courses_id"];

                $coursesType = DB::table("courses")->where("id", $request["courses_id"])->select("type_payment")->first();

                $myLearning["isFree"] = $coursesType->type_payment === "free";
                $myLearning["user_id"] = $user["id"];
                $myLearning["isPaid"] = $coursesType->type_payment === "free";

                if($myLearning->save()){
                    return response()->json([

                        "data" => "your courses was added to my learning",

                    ], Response::HTTP_CREATED);
                }else {
                    throw new \Exception("failed to added this courses to your learning");
                }
            }

        }catch(\Exception $e) {
            return response()->json([
                "message" => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(MyLearning $myLearning)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MyLearning $myLearning)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MyLearning $myLearning)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $learning = MyLearning::destroy($id);
        if($learning){
            return response()->json([
                "data" => "your courses was deleted from my learning",
            ], Response::HTTP_OK);
        }
    }
}
