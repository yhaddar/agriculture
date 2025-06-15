<?php

namespace App\Http\Controllers;

use AllowDynamicProperties;
use App\Enums\RoleEnum;
use App\Mail\ResetPasswordEmail;
use App\Mail\ValidateCompteEmail;
use App\Models\Authentication;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Laravel\Socialite\Facades\Socialite;
use Mockery\Exception;
use Symfony\Component\HttpFoundation\Response;
use Google\Client as GoogleClient;


#[AllowDynamicProperties] class AuthenticationController extends Controller
{
    public function __construct()
    {
        /*
         * regex for security the input's
         */
        $this->regex = [
            "/^[a-zA-Z]+(\s[a-zA-Z]+)*$/", // regex full name
            "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/", // regex email
            "/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/" // regex password
        ];

        $this->dateTime = Carbon::now();
    }

    /*
     * method register for creer compte with email unique and password crypted
     */
    public function register(Request $request): JsonResponse
    {
        try {

            $request->validate([
                "full_name" => "string|required|max:255",
                "email" => "email|required|unique:authentications",
                "password" => "string|min:8",
                "role" => Rule::enum(RoleEnum::class)
            ]);

            $full_name = (string)$request["full_name"];
            $email = (string)$request["email"];
            $password = (string)$request["password"];
            $is_accept_privacy_policy = (boolean)$request["is_accept_privacy_policy"];

            if (!preg_match($this->regex[0], $full_name)) throw new \Exception("full name is invalide");
            else if (!preg_match($this->regex[1], $email)) throw new \Exception("email is invalide");
            else if (!preg_match($this->regex[2], $password)) throw new \Exception("password invalide");
            else {

                $authentication = new Authentication();
                $authentication["id"] = Str::uuid();
                $authentication["full_name"] = $full_name;
                $authentication["email"] = $email;
                $authentication["password"] = Hash::make($password);
                $authentication["is_accept_privacy_policy"] = $is_accept_privacy_policy;
                $authentication["type"] = "oauth";
                $authentication["role"] = $request["role"] === null ? "agricultor" : $request["role"];
                $authentication->save();

                Mail::to($email)
                    ->send(new ValidateCompteEmail($email, $full_name));

                return response()->json([
                    "data" => "check your email for activate your account"
                ], 200);
            }

        } catch (\Exception $e) {
            return response()->json([
                "error" => $e->getMessage(),
            ], 400);
        }
    }

    /*
     * method for activate the compte
     */
    public function validateEmail(Request $request){
        try{

            $query = $request->query("email");
            $email = $request["email"];


            if($email == $query){

                $user = Authentication::where("email", "=", $query)->first();

                if($user){

                      if($user["email_verified_at"] == null){

                          $user["email_verified_at"] = $this->dateTime;
                          $user->update();

                          return response()->json([
                              "data" => "your account was activate with success"
                          ], 200);

                      }else throw new \Exception("your account is already active");

                }else throw new \Exception("user not found");


            }else throw new \Exception("email not found");

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage(),
            ], 400);
        }
    }

    /*
     * methode for redirect to google and facebook and Twitter login
     */
    public function loginWithOauth(){
        try{

            return Socialite::driver("google")->stateless()->redirect();

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage(),
            ], 400);
        }
    }

    /*
     * method handleGoogleCallback for return the user data information and stock it in DB
     */
    public function handleSocialCallback(Request $request)
    {
        try{

            $token = $request->get("token");
            $client = new GoogleClient(['client_id' => env('GOOGLE_CLIENT_ID')]);
            $client->setAccessToken($token);
            $googleUserInfo = $client->verifyIdToken($token);


            $userExist = Authentication::where("email", "=", $googleUserInfo["email"])->first();

            if(!$userExist){

                $user = new Authentication();
                $user["id"] = Str::uuid();
                $user["email"] = $googleUserInfo["email"];
                $user["full_name"] = $googleUserInfo["name"];
                $user["profile"] = $googleUserInfo["picture"];
                $user["role"] = "agricultor";
                $user["is_accept_privacy_policy"] = true;
                $user["type"] = "google";
                $user["social_id"] = $googleUserInfo["sub"];
                $user["email_verified_at"] = $googleUserInfo["email_verified"];
                $user["password"] = random_bytes(30);
                $user->save();

                $token = $userExist->createToken("token", [], $this->dateTime->addDays(8))->plainTextToken;
                Cookie::queue("token", $token,  $this->dateTime->addDays(8)->timestamp, '/', null, true, true);

                return response()->json([
                    "data" => $token,
                ], Response::HTTP_ACCEPTED);
            }else {

                $token = $userExist->createToken("token", [], $this->dateTime->addDays(8))->plainTextToken;
                Cookie::queue("token", $token,  $this->dateTime->addDays(8)->timestamp, '/', null, true, true);

                return response()->json([
                    "data" => $token,
                ], Response::HTTP_ACCEPTED);
            }


        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage(),
            ], 400);
        }
    }

    /*
     * method for login with email and password
     */
    public function login(Request $request): JsonResponse{
        try{

            $request->validate([
                "email" => "email|required",
                "password" => "string|min:8"
            ]);

            $email = (string)$request["email"];
            $password = (string)$request["password"];

            if(!preg_match($this->regex[1], $email)) throw new \Exception("email is invalid");
            else if(!preg_match($this->regex[2], $password)) throw new \Exception("password is invalid");
            else {

                if(Auth::attempt(["email"=>$email, "password"=>$password])){

                    $user = Auth::user();

                    if($user["email_verified_at"] === null) throw new \Exception("you need to activate your account first");
                    else {

                        $token = $user->createToken("token", [], $this->dateTime->addDays(8))->plainTextToken;

                        Cookie::queue("token", $token,  $this->dateTime->addDays(8)->timestamp, '/', null, true, true);

                        if($token){

                            return response()->json([
                                "data" => $token
                            ], 200);
                        }else{
                            throw new \Exception("could not create token");
                        }
                    }

                }else{
                    throw new \Exception("email or password incorrect");
                }
            }

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage(),
            ], 400);
        }
    }

    /*
     * method user for return data of users;
     */
    public function user(): JsonResponse{
        try{

            $userId = Auth::user();

            $user = DB::table("users as user")->where("user_id", $userId["id"])->first();

            return response()->json([
                "data" => [
                    "user" => $userId,
                    "otherInfo" => $user
                ],
            ], 200);

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage(),
            ], 400);
        }
    }

    /*
     * method for logout
     */
    public function logout(): JsonResponse{
        try{

            $user = Auth::user();
            $user->tokens()->delete();
            Cookie::forget("token");

            return response()->json([
                "data" => "you are logged out",
                "isLogout" => true,
            ], Response::HTTP_OK);

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /*
     * method for choose type of reset using email or phone sms
     */
    public function redirectToResetPassword(Request $request){
        try{

            $query = $request->query("reset-type");

            if(preg_match($this->regex[1], $query)){
                $user = DB::table("authentications as a")
                    ->where("a.email", Str::trim($query))
                    ->select("a.*")
                    ->first();

                if($user){

                    Mail::to($query)
                        ->send(new ResetPasswordEmail($query));

                    return response()->json([
                        "data" => "check your email for reset your password"
                    ]);

                }else{
                    throw new \Exception("user not found with this email");
                }

            }else{

                $user = DB::table("users")->select("*")->where("phone", $query)->first();

                if($user){

                    return $user;

                }else{

                    throw new \Exception("user not phone with this number");
                }
            }

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage(),
            ], 400);
        }
    }

    /*
     * reset password
     */
    public function resetPassword(Request $request){
        try{

            $new_password = $request["password"];
            $confirm_password = $request["confirmPassword"];
            $query = $request->query("email");

            if($confirm_password === $new_password){


                $user = DB::table("authentications as a")->where("a.email", $query)->first();

                $update_user = Authentication::where("id", "=", $user->id)->first();
                $update_user["password"] = Hash::make($new_password);
                if($update_user->update()){
                    return response()->json([
                        "data" => "your password was updated"
                    ], 200);

                }else {
                    throw new \Exception("failed to reset your password");
                }

            }else{
                throw new \Exception("passwords do not match");
            }

        }catch(\Exception $e){
            return response()->json([
                "error"=> $e->getMessage()
            ], 400);
        }
    }

    public function deleteAccount(){
        try {

            $user = Auth::user();

            $delete = DB::table("authentications")->delete($user->id);

            if($delete){
                return response()->json([
                    "data" => "your account was deleted",
                    "status" => Response::HTTP_ACCEPTED
                ], Response::HTTP_ACCEPTED);
            }

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage()
            ]);
        }
    }
}
