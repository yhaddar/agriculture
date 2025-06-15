<?php

namespace App\Http\Controllers;

use AllowDynamicProperties;
use App\Enums\RoleEnum;
use App\Enums\ServiceEnum;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

#[AllowDynamicProperties] class ServicesController extends Controller
{
    public function __construct()
    {
        $this->regex = [
            "/^[a-zA-Z0-9\s?.]+$/",
            "/^[a-zA-Z0-9\s?.!@#$%^&*()_+=,-;:'\"\\[\\]{}|<>\/]*$/"
        ];
    }

    /**
     * get all data about blogs and news
     */
    public function index(string $service): JsonResponse
    {
        try {

            $size = request()->query("size");
            $services =  Service::with("categories")
                ->where("service_type", Str::upper($service))
                ->orderBy("created_at", "desc")
                ->paginate(intval($size));

            return response()->json([
                "data" => $services->isEmpty() ? "no ". $service. " found" : $services,
            ], Response::HTTP_OK);

        } catch (\Exception $e) {
            return response()->json([
                "error" => $e->getMessage()
            ], 400);
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
     * Store the blog and the news where the user is admin or superadmin
     */
    public function store(Request $request, string $service): JsonResponse
    {
        try {
            $auth = Auth::authenticate();

            if ($auth["role"] == RoleEnum::ADMIN->value || $auth["role"] == RoleEnum::SUPERADMIN->value) {

                $service_type = request()->query("service");

                $request->validate([
                    "title" => "required|string|min:15|max:150",
                    "description" => "required|string|min:18|max:15000",
                    "image" => "required|image|mimes:jpg,jpeg",
                ]);

                if (!preg_match($this->regex[0], $request["title"])) throw new \Exception("title invalid");
                else if (!preg_match($this->regex[1], $request["description"])) throw new \Exception("description invalid");
                else {

                    $services = new Service();
                    $services["id"] = Str::uuid();
                    $services["title"] = $request["title"];
                    $services["description"] = $request["description"];
                    $services["category_id"] = $request["category_id"];
                    $services["user_id"] = Auth::id();
                    $services["service_type"] = $service == "blogs" ? ServiceEnum::BLOGS->value : ServiceEnum::NEWS->value;
                    $services["location"] = $services["service_type"] == ServiceEnum::NEWS->value ? $request["location"] : null;
                    $services["source"] = $services["service_type"] == ServiceEnum::NEWS->value ? $request["source"] : null;

                    $image = $request->file("image")->store("$service", "s3");
                    Storage::disk("s3")->setVisibility($image, "public");
                    $services["image"] = Storage::disk('s3')->url($image);


                    if ($services->save()) {

                        $request["image"]->move(public_path("/images/" . $service_type), $image);
                        return response()->json([
                            "data" => $service . " is added"
                        ], 200);

                    } else {
                        throw new \Exception("failed to add " . $service);
                    }

                }

            } else {

                throw new \Exception("you need to be admin or superadmin");

            }
        } catch (\Exception $e) {
            return response()->json([
                "error" => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Show detail of service
     */
    public function show(): JsonResponse
    {
        try {

            $query = request()->query("id");
            $service = Service::with("categories")->where("id", $query)->first();

            return response()->json([
                "data" => $service
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                "error" => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the service blog or news
     */
    public function update(Request $request, string $service): JsonResponse
    {
        try {

            $auth = Auth::authenticate();

            if ($auth["role"] == RoleEnum::SUPERADMIN->value || $auth["role"] == RoleEnum::ADMIN->value) {
                $query = request()->query("id");
                $serviceData = Service::with("categories")->where("id", $query)->first();

                if ($request->hasFile("image")) {

                    $image = $request->file("image")->store("$service", "s3");
                    Storage::disk("s3")->setVisibility($image, "public");

                    if(Storage::disk("s3")->exists("$service/".$serviceData["image"])){
                        Storage::disk('s3')->delete("$service/".$serviceData["image"]);
                    }

                }else{
                    $image = null;
                }

                $serviceData["title"] = $request["title"] == null ? $serviceData["title"] : $request["title"];
                $serviceData["description"] = $request["description"] == null ? $serviceData["description"] : $request["description"];
                $serviceData["image"] = $request["image"] == null ? $serviceData["image"] : Storage::disk('s3')->url($image);
                $serviceData["category_id"] = $request["category_id"] == null ? $serviceData["category_id"] : $request["category_id"];

                if ($service === "news") {
                    $serviceData["location"] = $request["location"] == null ? $serviceData["location"] : $request["location"];
                    $serviceData["source"] = $request["source"] == null ? $serviceData["source"] : $request["source"];
                } else {
                    $serviceData["location"] = null;
                    $serviceData["source"] = null;
                }

                if ($serviceData->update()) {

                    return response()->json([
                        "data" => $service . " is updated"
                    ]);
                } else {
                    throw new \Exception("failed to update " . $service);
                }


            } else {

                throw new \Exception("you need to be admin or superadmin");

            }


        } catch (\Exception $e) {
            return response()->json([
                "data" => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $service): JsonResponse
    {
        try {
            $auth = Auth::authenticate();

            if ($auth["role"] == RoleEnum::ADMIN->value || $auth["role"] == RoleEnum::SUPERADMIN->value) {

                $query = request()->query("id");
                $serviceData = DB::table("services")->where("id", $query)->first();

                if ($serviceData) {

                    $serviceData->destroy($query);

                    if ($serviceData) {
                        if (Storage::disk('s3')->exists("$service/".$serviceData["image"])) {
                            Storage::disk('s3')->delete("$service/".$serviceData["image"]);
                        }

                        return response()->json([
                            "data" => $service . " is deleted"
                        ], 200);

                    } else {
                        throw new \Exception("failed to delete " . $service);
                    }
                } else {

                    throw new \Exception("this " . $service . " doesn't exist");

                }

            } else {
                throw new \Exception("you need to be admin or superadmin");
            }

        } catch (\Exception $e) {
            return response()->json([
                "error" => $e->getMessage()
            ], 400);
        }
    }

    /*
     * Search for service | blogs or news
     */
    public function search(string $service): JsonResponse
    {
        try {

            $query = request()->query("q");

            $services = Service::with("categories")->where("title", "LIKE", "%" . $query . "%")->where("service_type", "=", Str::upper($service))->paginate(8);
            if ($services->count() > 0) {
                return response()->json([
                    "data" => $services,
                ], 200);
            } else {
                throw new \Exception("no result found");
            }

        } catch (\Exception $e) {
            return response()->json([
                "data" => $e->getMessage()
            ], 400);
        }
    }

    /*
    * filter the service by category
    */
    public function filterByCategory(string $service): JsonResponse
    {
        try {

            $query = request()->query("category");
            $size = request()->query("size");
            $services = Service::with("categories")
                ->where("category_id", "=", $query)
                ->where("service_type", "=", Str::upper($service))
                ->paginate($size);

            return response()->json([
                "data" => $services->isEmpty() ? [] : $services,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                "error" => $e->getMessage()
            ], 400);
        }
    }

    /*
     * filter the service by category
    */
    public function lastServiceForPageHome(string $service): JsonResponse
    {
        try {

            $size = request()->query("size");

            $services = Service::with("categories")
                ->where("service_type", "=", Str::upper($service))
                ->orderBy("created_at", "desc")
                ->limit(6)
                ->paginate($size);

            return response()->json([
                "data" => $services->isEmpty() ? [] : $services,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                "error" => $e->getMessage()
            ], 400);
        }
    }

}
