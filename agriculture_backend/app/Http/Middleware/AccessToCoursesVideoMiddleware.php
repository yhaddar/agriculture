<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AccessToCoursesVideoMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->headers;

//        if(!$user["Authorization"]){
//
//            return response()->json([
//                "error" => "you need to be logged in"
//            ], Response::HTTP_UNAUTHORIZED);
//        }

        return $next($request);
    }
}
