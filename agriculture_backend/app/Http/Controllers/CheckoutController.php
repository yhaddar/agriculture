<?php

namespace App\Http\Controllers;

use App\Models\Checkout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CheckoutController extends Controller
{
    public function checkout(){
        try {

            $stripe = new \Stripe\StripeClient(env("STRIPE_API_SECRET"));

            $user = Auth::user();

            $my_learning = DB::table("my_learning as m")->where("m.user_id", $user["id"])
                ->join("courses as c", "c.id", "=", "m.courses_id")
                ->select("c.title", "c.price", "c.cover", "m.courses_id")
                ->where("m.isPaid", false)
                ->where("isFree", 0)->get();

            if(!$my_learning->isEmpty()){
                $line_items = [];
                $total_price = 0;
                $courses_id = [];

                foreach ($my_learning as $item) {
                    $total_price += $item->price;
                    $line_items[] = [
                        'price_data' => [
                            'currency' => 'usd',
                            'product_data' => [
                                'name' => $item->title,
                                'images' => [$item->cover],
                            ],
                            'unit_amount' => $item->price * 100,
                        ],
                        'quantity' => 1,
                    ];

                    $courses_id[] = $item->courses_id;
                }

                $checkout_session = $stripe->checkout->sessions->create([
                    'line_items' => $line_items,
                    'mode' => 'payment',
                    'success_url' => env("APP_URL_FRONT"). "/success?session_id={CHECKOUT_SESSION_ID}",
                    'cancel_url' => env("APP_URL_FRONT"). '/cancel',
                    'customer_email' => (string) $user["email"]
                ]);

                $checkout = new Checkout();
                $checkout["id"] = Str::uuid();
                $checkout["status"] = "unpaid";
                $checkout["user_id"] = $user["id"];
                $checkout["session_id"] = $checkout_session["id"];
                $checkout["total_price"] = $total_price;
                $checkout["my_learning"] = $courses_id;
                $checkout->save();

                return response()->json([
                    "data" => [
                        "redirect" => $checkout_session->url,
                        "status" => Response::HTTP_CONTINUE,
                    ]
                ], Response::HTTP_OK);
            }else {
                return response()->json([
                    "data" => [
                        "redirect" => "you need to added the courses first",
                        "status" => Response::HTTP_FORBIDDEN
                    ]
                ], Response::HTTP_OK);
            }

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function success(Request $request){
        try {

            $stripe = new \Stripe\StripeClient(env("STRIPE_API_SECRET"));
            $sessionId = $request["session_id"];

            if(empty($sessionId)) throw new \Exception("Session id not found");

            $session = $stripe->checkout->sessions->retrieve($sessionId);

            if(!$session) throw new NotFoundHttpException;

            $checkout = Checkout::where("session_id", $session["id"])->where("status", "unpaid")->first();

            if($checkout) {
                $checkout->status = "paid";
                $checkout->save();

                $checkoutAll = Checkout::where("session_id", $session["id"])
                    ->where("status", "paid")
                    ->get();

                foreach ($checkoutAll as $checkout) {
                    $courseIds = $checkout->my_learning;

                    if (is_array($courseIds)) {
                        foreach ($courseIds as $courseId) {
                            DB::table("my_learning")
                                ->where("courses_id", $courseId)
                                ->where("user_id", $checkout->user_id)
                                ->update(["isPaid" => true]);
                        }
                    }
                }

                return response()->json([
                    "data" => "your payment was paid with success",
                ], Response::HTTP_OK);
            }else {
                return response()->json([
                    "data" => "this learning already paid"
                ], Response::HTTP_OK);
            }

        }catch(\Exception $e){
            return response()->json([
                "error" => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
