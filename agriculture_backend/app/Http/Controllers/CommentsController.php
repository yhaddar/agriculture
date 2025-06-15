<?php

namespace App\Http\Controllers;

use App\Enums\TypeCommentsEnum;
use App\Http\Requests\CommentsRequest;
use App\Models\Comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $type, string $type_id)
    {
        $typeEnum = $type === "courses" ? TypeCommentsEnum::COURSES : TypeCommentsEnum::INNOVATION;

        $commentQuery = DB::table("comments as comment")
            ->join("authentications as auth", "auth.id", "=", "comment.user_id")
            ->select("comment.comment", "auth.full_name", "auth.email", "comment.rate", "comment.created_at", "auth.profile")
            ->where("comment.type", $typeEnum)
            ->orderBy("comment.created_at", "desc");

        if ($type == "courses") {
            $commentQuery->where("comment.courses_id", "=", $type_id);
        } else {
            $commentQuery->where("comment.innovation_id", "=", $type_id);
        }

        $comments = $commentQuery->get();

        return response()->json([
            "data" => $comments->isEmpty() ? "no comment yet" : $comments
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
    public function store(CommentsRequest $request, string $type)
    {
        try {

            $user = Auth::user();

            $comments = new Comments();
            $comments["id"] = Str::uuid();
            $comments["user_id"] = $user["id"];
            $comments["type"] = $type === "courses" ? TypeCommentsEnum::COURSES : TypeCommentsEnum::INNOVATION;
            $comments["courses_id"] = $type === "courses" ? $request["courses_id"] : null;
            $comments["innovation_id"] = $type === "innovation" ? $request["innovation_id"] : null;
            $comments["rate"] = $request["rate"] ?? 0;
            $comments["comment"] = $request["comment"];

            if ($comments->save()) {
                return response()->json([
                    "data" => "your comment was added",
                ], Response::HTTP_CREATED);
            }

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
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
