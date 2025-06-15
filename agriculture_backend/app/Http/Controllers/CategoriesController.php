<?php

namespace App\Http\Controllers;

use AllowDynamicProperties;
use App\Enums\RoleEnum;
use App\Models\Category;
use App\Responses\ServiceResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

#[AllowDynamicProperties] class CategoriesController extends Controller
{
    public function __construct()
    {
        $this->regex = [
            "/^[a-zA-Z0-9\s?.]+$/",
            "/^[a-zA-Z0-9\s?.!@#$%^&*()_+=,-;:'\"\\[\\]{}|<>\/]*$/"
        ];
    }

    /**
     * show all categories from the blogs and the news
     */
    public function index(string $service): JsonResponse
    {
        try {

            $categories = DB::table("categories")->where("category_type", "=", $service)->get();

            return response()->json([
                "data" => $categories->isEmpty() ? "no category available" : $categories,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                "error" => $e->getMessage(),
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
     * add new category of all type of categories
     */
    public function store(Request $request, string $service): JsonResponse
    {
        try {

            $auth = Auth::authenticate();
            if ($auth["role"] === RoleEnum::ADMIN->value || $auth["role"] === RoleEnum::SUPERADMIN->value) {

                $request->validate([
                    "title" => "required|string|max:15",
                    "description" => "required|string|min:15",
                    "cover" => "required|mimes:jpeg,png,jpg"
                ]);


                if (!preg_match($this->regex[0], $request["title"])) throw new \Exception("the title is incorrect format");
                else if (!preg_match($this->regex[1], $request["description"])) throw new \Exception("the description is incorrect format");
                else {

                    $category = new Category();
                    $category["id"] = Str::uuid();
                    $category["title"] = $request["title"];
                    $category["description"] = $request["description"];
                    $category["user_id"] = $auth["id"];
                    $category["category_type"] = $service;

                    $cover = $request->file("cover")->store("categories", "s3");
                    Storage::disk("s3")->setVisibility($cover, "public");
                    $category["cover"] = Storage::disk('s3')->url($cover);

                    if ($category->save()) {
                        return response()->json([
                            "data" => $service . " category was added",
                        ]);
                    }

                }

            } else {

                throw new \Exception("you need to be admin or superadmin");
            }

        } catch (\Exception $e) {
            return response()->json([
                "error" => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * show the specific category with the specific blogs or news
     */
    public function show(string $service): JsonResponse
    {
        $id = request()->query("id");
        $size = request()->query("size");
        $categoryWithService = Category::where("category_type", $service)->where("id", $id)->first();
        $category = $categoryWithService->services()->with("categories")->paginate($size);

        $response = new ServiceResponse();
        $response->setData($category->items());
        $response->setCurrentPage($category->currentPage());
        $response->setTotal($category->total());
        $response->setLastPage($category->lastPage());
        $response->setCategory($categoryWithService);

        return response()->json([
            "data" => [
                "data" => $response->getData(),
                "current_page" => $response->getCurrentPage(),
                "last_page" => $response->getLastPage(),
                "categories" => $response->getCategory(),
                "total" => $response->getTotal(),
            ],
        ], 200);
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
    public function update(Request $request): JsonResponse
    {
        try {

            $id = request()->query("id");
            $auth = Auth::authenticate();

            if ($auth["role"] === RoleEnum::SUPERADMIN->value || $auth["role"] === RoleEnum::ADMIN->value) {

                $category = DB::table("categories")->where("id", "=", $id);


                if ($request->hasFile("cover")) {


                    if (Storage::disk("s3")->exists("categories/".$category["cover"])) {
                        $cover = $request->file("cover")->store("categories", "s3");
                        Storage::disk("s3")->setVisibility($cover, "public");
                    }



                } else $category_image = null;

                $category->title = $request["title"] == null ? $category["title"] : $request["title"];
                $category->description = $request["description"] == null ? $category["description"] : $request["description"];
                $category->cover = $request["cover"] == null ? $category["cover"] : Storage::disk('s3')->url($cover);

                if ($category->update()) {
                    $request["cover"]->move(public_path("/images/categories"), $category_image);
                    return response()->json([
                        "data" => "this category was updated"
                    ]);

                } else {
                    throw new \Exception("failed to update this category");
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
     * remove the specific category using id
     */
    public function destroy(): JsonResponse
    {
        try {
            $auth = Auth::authenticate();

            if ($auth["role"] === RoleEnum::ADMIN->value || $auth["role"] === RoleEnum::SUPERADMIN->value) {

                $id = request()->query("id");

                $categoryExist = DB::table("categories")->where("id", $id)->first();

                $category = Category::destroy($id);
                if ($category) {
                    if (Storage::disk("s3")->exists("categories/".$category->cover)) {
                        Storage::disk("s3")->delete("categories/".$category->cover);
                    }

                    return response()->json([
                        "data" => "this category was deleted"
                    ], 200);
                } else {
                    throw new \Exception("failed to remove this category, maybe is not exist or check the id if correct");
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
}
