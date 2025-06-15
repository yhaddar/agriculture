<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\InnovationController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MyLearningController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\StatistiqueController;
use App\Http\Controllers\VideoCoursesController;
use App\Http\Middleware\AccessToCoursesVideoMiddleware;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\HeroComponentController;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\CoursesController;

/*
 * @description = api for controller AuthenticationController
 * @controller = AuthenticationController
 * @headers = null
 */
Route::controller(AuthenticationController::class)->group(function () {

    /*
     * prefix auth for api login and register and reset password and active the account
     */
    Route::prefix("auth")->group(function () {
        /*
         * @description = user can create his account
         * @function = register
         * @method = POST
         * @params = null
         * @request = email, full_name, password, is_accept_privacy_policy
         */
        Route::post("/register", "register");
        /*
         * @description = after user create his account the system send the email for the verification
         * @function = validateEmail
         * @method = PUT
         * @params = email
         * @request = email
         */
        Route::put("/activate/account", "validateEmail");
        /*
         * @description = the user can be login with the account after created and activated
         * @function = login
         * @method = POST
         * @params = null
         * @request = email, password
         */
        Route::post("/login", "login");
        /*
         * @description = redirection for the reset password
         * @function = redirectToResetPassword
         * @method = POST
         * @params = reset-type : email | phone
         * @request = null
         */
        Route::post("/redirect", "redirectToResetPassword");
        /*
         * @description = user can reset his password if forget it
         * @function = resetPassword
         * @method = PUT
         * @params = email
         * @request = newPassword, confirmPassword
         */
        Route::put("/reset-password", "resetPassword");

        /*
        * @description = api middleware for access to this api after the login
        * @middleware = sanctum
        * @params = null
        * @request = null
        * @headers = Authorization Bearer token
        */
        Route::middleware("auth:sanctum")->group(function () {

            /*
             * @description = user can show his information after login
             * @function = user
             * @method = get
             * @params = null
             * @request = null
             */
            Route::get("user", "user");
            /*
             *  @description = user can be logout after login
              * @function = user
              * @method = post
              * @params = null
              * @request = null
             */
            Route::post("logout", "logout");
            /*
             *  @description = delete my account
              * @function = deleteAccount
              * @method = delete
              * @params = null
              * @request = null
             */
            Route::delete("delete", "deleteAccount");

        });

        /*
        * prefix oauth2 for login and register with Google and Facebook and Twitter
        */
        Route::prefix("{social}")->group(function () {
            /*
             * @description = api for redirect to log in social page
             * @function = loginWithOauth
             * @method = GET
             * @params = social
             * @request = null
             */
            Route::get("/", "loginWithOauth");
            /*
            * @description = api for call the oauth
            * @function = handleSocialCallback
            * @method = GET
            * @params = social
            * @request = null
             */
            Route::post("/callback", "handleSocialCallback");
        });

    });

});


/*
 * @description = api for controller CategoriesController with articles of category in blogs and news
 * @controller =  CategoryController
 * @header = null
 */
Route::controller(CategoriesController::class)->group(function () {
    /*
     * prefix for all api categories
     */
    Route::prefix("category")->group(function () {
        /*
         * @description = show all categories with the service specific : blogs or news
         * @function = index
         * @method = GET
         * @params = null
         * @request = null
         */
        Route::get("/{service}/all", "index");
        /*
         * @description = show the specific category with the specific service
         * @function = show
         * @method = GET
         * @params = id
         * @request = null
         */
        Route::get("/{service}", "show");

        /*
         * @description = middleware for controller POST and DELETE and UPDATE after login and check if it admin or super admin
         */
        Route::middleware("auth:sanctum")->group(function () {
            /*
             * @description = admin or super admin can add the new category in any service
             * @function = store
             * @method = POST
             * @params = type of service: blogs or news
             * @request = title, description, cover
             */
            Route::post("/{service}/add", "store");
            /*
             * @description = admin or super admin can remove the specific category in any service
             * @function = destroy
             * @method = DELETE
             * @params = id
             * @request = null
             */
            Route::delete("/{service}/delete", "destroy");
            /*
             * @description = admin or super admin can update the specific category in any service
             * @function = update
             * @method = PUT
             * @params = id
             * @request = title, description, cover
             */
            Route::put("{service}/edit", "update");
        });
    });
});

/*
 * @description = api for controller ServicesController with articles of blogs and news
 * @controller =  ServicesController
 * @header = null
 */

Route::controller(ServicesController::class)->group(function () {
    /*
     * prefix for all api blogs and news
     */
    Route::prefix("services")->group(function () {
        Route::prefix("{service}")->group(function () {
            /*
             * @description = fetch all data about blogs and news with pagination
             * @function = index
             * @method = GET
             * @params = page
             * @request = null
             */
            Route::get("/all", "index");
            /*
             * @description = show detail of blog or news
             * @function = show
             * @method = GET
             * @params = service, id
             * @request = null
             */
            Route::get("/", "show");

            /*
            * @description = this api can be used after the login and get the token
            */
            Route::middleware("auth:sanctum")->group(function () {
                /*
                 * @description = admin or super admin can add the services blogs or news
                 * @function = store
                 * @method = POST
                 * @params = service : blogs | news
                 * @request = title, category, description, image, and if the service is news add the location and source
                 */
                Route::post("/add", "store");
                /*
                * @description = admin or super admin can update the services blogs or news
                * @function = update
                * @method = PUT
                * @params = service : blogs | news
                * @request = title, category, description, image, and if the service is news add the location and source
                */
                Route::put("/edit", "update");
                /*
                * @description = admin or super admin can delete the services blogs or news
                * @function = destroy
                * @method = DELETE
                * @params = service : blogs | news, id
                * @request = null
                */
                Route::delete("/", "destroy");
            });
            /*
            * @description = search for blogs or news
            * @function = search
            * @method = GET
            * @params = service : blogs | news, q, pagination : size, page
            * @request = null
            */
            Route::get("/search", "search");
            /*
            * @description = filter using category for blogs or news
            * @function = filterByCategory
            * @method = GET
            * @params = service : blogs | news, category
            * @request = null
            */
            Route::get("/filter", "filterByCategory");
            /*
             * @description = show the last 6 blogs for page home with pagination
             * @function = lastServiceForPageHome
             * @method = GET
             * @params = service : blogs | news
             * @request = null
            */
            Route::get("/latest", "lastServiceForPageHome");
        });

    });
});

/*
 * @description = api for controller HeroComponentController for the information about each service with articles
 * @controller =  HeroComponentController
 * @header = null
 */

Route::controller(HeroComponentController::class)->group(function () {
    /*
     * prefix for all api hero component
     */
    Route::prefix("hero_component")->group(function () {
        /*
        * @description = show each service detail
        * @function = index
        * @method = GET
        * @params = service: blogs | news | innovation | courses
        * @request = null
        */
        Route::get("{service}/", "index");
    });
});


/*
 * @description = api for controller CoursesController for the service courses with articles
 * @controller =  CoursesController
 * @header = null
 */
Route::controller(CoursesController::class)->group(function () {
    /*
     * prefix for all api courses
     */
    Route::prefix("courses")->group(function () {
        /*
         * @description = fetch all data about courses with pagination
         * @function = index
         * @method = GET
         * @params = page & size & category
         * @request = null
        */
        Route::get("/all", "index");
        /*
         * @description = function for all courses by category specifique
         * @function = coursesByCategory
         * @method = GET
         * @params = category_id
         * @request = null
        */
        Route::get("/category/{category_id}", "coursesByCategory");
        /*
         * @description = function for return the detail category with courses
         * @function = show
         * @method = GET
         * @params = id
         * @request = null
        */
        Route::get("/detail/{id}", "show");
        /*
         * @description = function for return the detail category with courses
         * @function = show
         * @method = GET
         * @params = id
         * @request = null
        */
        Route::get("bestRate", "filterCoursesByRating");
        Route::middleware("auth:sanctum")->group(function () {

            Route::middleware(AdminMiddleware::class)->group(function () {
                /*
                * @description = add new courses
                * @function = store
                * @method = POST
                * @params = null
                * @request = title, description, keys_learning, modules_and_topics, total_hours, type_video, type_payment, price, cover, vedio_link, langues
                */
                Route::post("/add", "store");
            });

        });
    });
    /*
     * @description = function for detail category and her courses
     * @function = category
     * @method = GET
     * @params = category_id
     * @request = null
    */
    Route::get("hero_component/courses/category/{category_id}", "category");
});

/*
* @description = api for controller InnovationController for the service innovation with articles
* @controller = InnovationController
* @header = null
*/
Route::controller(InnovationController::class)->group(function () {
    /*
    * prefix for all api innovations
    */
    Route::prefix("innovation")->group(function () {
        /*
        * @description = fetch all data about innovation with pagination
        * @function = index
        * @method = GET
        * @params = page & size
        * @request = null
        */
        Route::get("/all", "index");
        /*
        * @description = show detail of innovation
        * @function = show
        * @method = GET
        * @params = id
        * @request = null
         */
        Route::get("detail", "show");

        Route::middleware("auth:sanctum")->group(function () {
            Route::middleware(AdminMiddleware::class)->group(function () {
                /*
                 * @description = add new innovation
                 * @function = store
                 * @method = POST
                 * @params = null
                 * @request = innovation, inventor, image, date_creation, description
                */
                Route::post("/add", "store");
                /*
                 * @description = admin or super admin can delete the services innovation
                 * @function = destroy
                 * @method = DELETE
                 * @params = id
                 * @request = null
                 */
                Route::delete("/", "destroy");
                /*
                 * @description = admin or super admin can update the services innovation
                 * @function = update
                 * @method = PUT
                 * @params = id
                 * @request = innovation, inventor, image, description, date_creation, impact
                 */
                Route::put("/edit", "update");
            });
        });
    });
});

/*
* @description = api for controller ContactController for send message in email to admin
* @controller = ContactController
* @header = null
*/
Route::controller(ContactController::class)->group(function () {
    /*
     * @description = api  for send message in email
     * @controller = ContactController
     * @params = null
     * @request = email, subject, message
    */
    Route::post("/contact", "store");
});

/*
* @description = api for controller SettingController for the parametrage about the website
* @controller = SettingController
* @header = null
*/
Route::controller(SettingController::class)->group(function () {

    Route::prefix("/setting")->group(function () {
        Route::middleware("auth:sanctum")->group(function () {
            Route::middleware(AdminMiddleware::class)->group(function () {
                /*
                 * prefix for all api add setting
                */
                Route::prefix("add")->group(function () {
                    /*
                     * @description = api for add a new privacy policy or faq
                     * @function = addPrivacyPolicy
                     * @method = POST
                     * @params = null
                     * @request = title, description
                    */
                    Route::post("/{setting}", "addSetting");
                    /*
                     * @description = api for add a new apps
                     * @function = addOurApps
                     * @method = POST
                     * @params = null
                     * @request = description, link, image, services
                    */
                    Route::post("/apps/our_apps", "addOurApps");
                    /*
                     * @description = api for add a new apps
                     * @function = addOurApps
                     * @method = POST
                     * @params = null
                     * @request = description, link, image, services
                    */
                    Route::post("/other/our_services", "addOurServices");
                });
            });
        });
        /*
         * prefix for all api add setting
        */
        Route::prefix("all")->group(function () {
            /*
             * @description = api for afficher all privacy policy
             * @function = getPrivacyPolicy
             * @method = GET
             * @params = null
             * @request = null
            */
            Route::get("/{setting}", "getSetting");
        });

        /*
         * @description = api for afficher all privacy policy
         * @function = getPrivacyPolicy
         * @method = GET
         * @params = null
         * @request = null
        */
        Route::get("/weather", "weather");
    });

});

/*
* @description = api for controller StatistiqueController for the statistique of the website
* @controller = StatistiqueController
* @header = null
*/
Route::controller(StatistiqueController::class)->group(function () {

    Route::prefix("/statistic")->group(function () {
        Route::prefix("all")->group(function () {
            /*
             * @description = api for counts all data of services
             * @function = getCountes
             * @method = GET
             * @params = null
             * @request = null
            */
            Route::get("/counts", "getCountes");
        });
    });

});

/*
* @description = api for controller AdminController for the gestion d'admin
* @controller = AdminController
* @header = null
*/
Route::controller(AdminController::class)->group(function () {

    Route::prefix("/admin")->group(function () {
        /*
         * @description = api for return all data of admins
         * @function = allAdmin
         * @method = GET
         * @params = null
         * @request = null
        */
        Route::get("/all", "allAdmin");
    });

});


/*
* @description = api for controller VideoCoursesController for the gestion des video et des playlist
* @controller = VideoCoursesController
* @header = null
*/
Route::controller(VideoCoursesController::class)->group(function () {

    Route::prefix("/video")->group(function () {

        Route::middleware("auth:sanctum")->group(function () {
            /*
             * @description = api for show all courses
             * @function = index
             * @method = GET
             * @params = course_id
             * @request =null
            */
            Route::get("/all/{courses_id}", "index");
            Route::middleware(AdminMiddleware::class)->group(function () {
                /*
                * @description = api for add new video courses
                * @function = store
                * @method = POST
                * @params = null
                * @request = title, description, cover, video_link, courses_id, order
                */
                Route::post("/add", "store");
            });
        });
    });
});

/*
* @description = api for controller CommentsController for the gestion des comments
* @controller = CommentsController
* @header = Authorization Bearer | token
*/
Route::controller(CommentsController::class)->group(function () {

    Route::prefix("/comments/{type}")->group(function () {

        Route::middleware("auth:sanctum")->group(function () {
            /*
             * @description = api for add new comment and rate
             * @function = store
             * @method = POST
             * @params = null
             * @request = comment, rate, user_id, courses_id innovation_id, type
            */
            Route::post("/add", "store");
        });
        /*
         * @description = api for show all comment for courses or innovation specific
         * @function = index
         * @method = GET
         * @params = type, type_id
         * @request = null
        */
        Route::get("/all/{type_id}", "index");
    });

});

/*
* @description = api for controller ReviewController for the gestion des review
* @controller = ReviewController
* @header = Authorization Bearer | token
*/
Route::controller(ReviewController::class)->group(function () {
    Route::prefix("/review")->group(function () {

        Route::middleware("auth:sanctum")->group(function () {
            /*
             * @description = api for add new rate about the site
             * @function = store
             * @method = POST
             * @params = null
             * @request = review, rating, user_id
            */
            Route::post("/add", "store");
        });
        /*
         * @description = api for show all reviews with paginate
         * @function = index
         * @method = GET
         * @params = page, size
         * @request = null
        */
        Route::get("/all", "index");

    });
});

/*
* @description = api for controller FavoriteController for add blogs and courses to my favorite
* @controller = FavoriteController
* @header = Authorization Bearer | token
*/
Route::controller(FavoriteController::class)->group(function () {
    Route::prefix("/favorite")->group(function () {

       Route::prefix("/{type}")->group(function () {
           Route::middleware("auth:sanctum")->group(function () {
               /*
                * @description = api for add new favorite
                * @function = store
                * @method = POST
                * @params = null
                * @request = course_id, blog_id
               */
               Route::post("/add", "store");
               /*
                * @description = api for remove from favorite
                * @function = destroy
                * @method = DELETE
                * @params = null
                * @request = null
                */
               Route::delete("/delete/{id}", "destroy");
               /*
                * @description = api for show all favorite of user specific
                * @function = index
                * @method = GET
                * @params = page, size
                * @request = null
                */
               Route::get("/all", "index");
           });
       });

    });
});

/*
* @description = api for controller LikeController for add like to courses | blogs | news
* @controller = LikeController
* @header = null
*/
Route::controller(LikeController::class)->group(function () {
    Route::prefix("/like")->group(function () {

        Route::prefix("/{type}")->group(function () {
            Route::middleware("auth:sanctum")->group(function () {
                /*
                 * @description = api for add new like
                 * @function = store
                 * @method = POST
                 * @params = null
                 * @request = course_id, service_id,
                */
                Route::post("/add", "store");
                /*
                 * @description = api for remove from favorite
                 * @function = destroy
                 * @method = DELETE
                 * @params = null
                 * @request = null
                 */
                Route::delete("/delete/{id}", "destroy");
            });
            /*
             * @description = api for show all reviews with paginate
             * @function = index
             * @method = GET
             * @params = page, size
             * @request = null
            */
            Route::get("/all", "index");
        });

    });
});

/*
* @description = api for controller MyLearningController for my learning
* @controller = MyLearningController
* @header = null
*/
Route::controller(MyLearningController::class)->group(function () {
    Route::prefix("/my_learning")->group(function () {

        Route::middleware("auth:sanctum")->group(function () {
            /*
             * @description = api for add new courses to my learning
             * @function = store
             * @method = POST
             * @params = null
             * @request = course_id,
            */
            Route::post("/add", "store");
            /*
             * @description = api for remove from my learning
             * @function = destroy
             * @method = DELETE
             * @params = null
             * @request = null
             */
            Route::delete("/delete/{id}", "destroy");
            /*
             * @description = api for show all courses of my learning
             * @function = index
             * @method = GET
             * @params = page, size
             * @request = null
            */
            Route::get("/all", "index");
        });

    });
});


/*
* @description = api for controller CheckoutController for payment
* @controller = CheckoutController
* @header = null
*/
Route::controller(CheckoutController::class)->group(function () {
    Route::prefix("checkout")->group(function () {
       Route::middleware("auth:sanctum")->group(function () {
           /*
            * @description = api for show all courses of my learning
            * @function = index
            * @method = GET
            * @params = page, size
            * @request = null
           */
           Route::post("/", "checkout");
           /*
            * @description = api for show all courses of my learning
            * @function = index
            * @method = GET
            * @params = page, size
            * @request = null
            */
           Route::post("/success", "success");
       });
    });
});
