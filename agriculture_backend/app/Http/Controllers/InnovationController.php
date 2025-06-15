<?php

namespace App\Http\Controllers;

use App\Http\Requests\InnovationRequest;
use App\Models\Innovation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class InnovationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        (int)$size = request()->query("size");
        $innovations = DB::table("innovations as i")
            ->leftJoin("comments as comment", function ($join) {
                $join->on("comment.innovation_id", "=", "i.id")
                    ->where("comment.type", "INNOVATION");
            })
            ->select(
                "i.*",
                DB::raw("ROUND(AVG(comment.rate), 2) as avg_rate"),
                DB::raw("COUNT(comment.innovation_id) as total_person_rate")
            )
            ->groupBy("i.id")
            ->orderBy("i.created_at", "desc")
            ->paginate($size);


        return response()->json([
            "data" => $innovations->isEmpty() ? "no innovations found" : $innovations,
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
    public function store(InnovationRequest $request): Response
    {
        try {

            $auth = Auth::user();

            $innovation = new Innovation();
            $innovation["innovation"] = $request["innovation"];
            $innovation["inventor"] = $request["inventor"];
            $innovation["date_creation"] = $request["date_creation"];
            $innovation["description"] = $request["description"];
            $innovation["impact"] = $request["impact"];
            $innovation["user_id"] = $auth["id"];
            $innovation["id"] = Str::uuid();

            $cover = $request->file("image")->store("innovation", "s3");
            Storage::disk("s3")->setVisibility($cover, "public");
            $innovation["image"] = Storage::disk('s3')->url($cover);

            if ($innovation->save()) {
                return response()->json([
                    "data" => "the innovation has been created"
                ], Response::HTTP_CREATED);

            } else throw new \Exception("failed to create the innovation");

        } catch (\Exception $e) {
            return response()->json([
                "error" => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request): Response
    {
        (string)$id = $request->query("id");
        $innovation = DB::table("innovations as i")
            ->where("i.id", $id)
            ->leftJoin("comments as comment", function ($join) {
                $join->on("comment.innovation_id", "=", "i.id")
                    ->where("comment.type", "INNOVATION");
            })
            ->select(
                "i.*",
                DB::raw("ROUND(AVG(comment.rate), 2) as avg_rate"),
                DB::raw("COUNT(comment.innovation_id) as total_person_rate")
            )
            ->groupBy("i.id")
            ->first();

        return response()->json([
            "data" => $innovation
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
    public function update(Request $request): Response
    {
        try {

            (string)$id = request()->query("id");
            $innovation = Innovation::where("id", $id)->first();

            if ($innovation) {

                $image = $request->file("image")->store("innovation", "s3");
                Storage::disk("s3")->setVisibility($image, "public");

                if ($request->has("image")) {
                    if(Storage::disk("s3")->exists("innovation/".$innovation["image"])){
                        Storage::disk('s3')->delete("innovation/".$innovation["image"]);
                    }
                }

                $innovation["innovation"] = $request["innovation"] == null ? $innovation["innovation"] : $request["innovation"];
                $innovation["description"] = $request["description"] == null ? $innovation["description"] : $request["description"];
                $innovation["inventor"] = $request["inventor"] == null ? $innovation["inventor"] : $request["inventor"];
                $innovation["impact"] = $request["impact"] == null ? $innovation["impact"] : $request["impact"];
                $innovation["date_creation"] = $request["date_creation"] == null ? $innovation["date_creation"] : $request["date_creation"];
                $innovation["image"] = $request["image"] == null ? $innovation["image"] : Storage::disk('s3')->url($image);

                if ($innovation->update()) {
                    return response()->json([
                        "data" => "the innovation has been updated"
                    ], Response::HTTP_OK);

                } else throw new \Exception("failed to update the innovation");


            } else throw new \Exception("the innovation does not exist");

        } catch (\Exception $e) {
            return response()->json([
                "error" => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(): Response
    {
        (string)$query = request()->query("id");
        $innovation = Innovation::where("id", $query)->first();
        if ($innovation) {

            $innovation->destroy($query);


            if (Storage::disk('s3')->exists("innovation/".$innovation->image)){
                Storage::disk('s3')->delete("innovation/".$innovation->image);
            }
        }

        return response()->json([
            "data" => "the innovation has been deleted"
        ], Response::HTTP_OK);
    }
}
