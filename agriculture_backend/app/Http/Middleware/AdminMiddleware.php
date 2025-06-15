<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $role = Auth::authenticate();
        if(!($role["role"] == "admin" || $role["role"] == "superadmin")){

            return response()->json([
                "error" => "you need to be an admin or super admin"
            ], Response::HTTP_UNAUTHORIZED);

        }
        return $next($request);
    }
}
