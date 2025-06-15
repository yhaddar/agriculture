<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $size = $request->query("size");
        $reviews = DB::table('review as r')
            ->join("authentications as auth", "auth.id", "=", "r.user_id")
            ->select("r.*", "auth.full_name", "auth.email", "auth.profile", "r.rating", "r.review")
            ->paginate($size);

        return response()->json([
            "data" => $reviews->isEmpty() ? "no reviews" : $reviews,
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
    public function store(ReviewRequest $request)
    {
        try {

            $user = Auth::user();

            $reviewExist = DB::table("review")->where("user_id", $user["id"])->first();

            if(!$reviewExist){
                $review = new Review();
                $review["user_id"] = $user["id"];
                $review["review"] = $request["review"];
                $review["rating"] = $request["rating"];
                $review["id"] = Str::uuid();

                if($review->save()){
                    return response()->json([
                        "data" => "your review was added",
                    ], Response::HTTP_CREATED);
                }else {
                    throw new \Exception("failed to create your review, try again later");
                }
            }else {
                throw new \Exception("you already reviewed");
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
