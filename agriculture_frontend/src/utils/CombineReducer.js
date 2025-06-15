import {combineReducers} from "@reduxjs/toolkit";
import {heroBlogsReducer} from "../store/Blogs/HeroBlogsReducer.js";
import {NewsReducer} from "../store/News/NewsReducer.js";
import {ServiceReducer} from "../store/Blogs/ServiceReducer.js";
import {CategoryServiceReducer} from "../store/Blogs/CategoryServiceReducer.js";
import {DetailBlogReducer} from "../store/Blogs/DetailBlogReducer.js";
import {CategoryDetailReducer} from "../store/Blogs/CategoryDetailReducer.js";
import {AuthReducer} from "../store/Authentication/AuthReducer.js";
import {EmailReducer} from "../store/Authentication/EmailReducer.js";
import {UserReducer} from "../store/Authentication/UserReducer.js";
import {ValidateEmailReducer} from "../store/Authentication/ValidateEmailReducer.js";
import {ResetPasswordReducer} from "../store/Authentication/ResetPasswordReducer.js";
import {InnovationReducer} from "../store/Innovations/InnovationReducer.js";
import {ContactReducer} from "../store/Setting/ContactReducer.js";
import {SettingReducer} from "../store/Setting/SettingReducer.js";
import {StatistiqueReducer} from "../store/statistique/StatistiqueReducer.js";
import {AdminReducer} from "../store/Admin/AdminReducer.js";
import {CoursesReducer} from "../store/Courses/CoursesReducer.js";
import {CoursesCategoryReducer} from "../store/Courses/CoursesCategoryReducer.js";
import {CoursesDetailReducer} from "../store/Courses/CoursesDetailReducer.js";
import {VideoCoursesReducer} from "../store/Courses/VideoCoursesReducer.js";
import {AddCommentReducer} from "../store/Comments/AddCommentReducer.js";
import {AllCommentReducer} from "../store/Comments/AllCommentReducer.js";
import {LogoutReducer} from "../store/Authentication/LogoutReducer.js";
import {InnovationDetailReducer} from "../store/Innovations/InnovationDetailReducer.js";
import {BlogsHomeReducer} from "../store/Blogs/BlogsHomeReducer.js";
import {CoursesHomeReducer} from "../store/Courses/CoursesHomeReducer.js";
import {AllReviewReducer} from "../store/Reviews/AllReviewReducer.js";
import {AddToFavoriteReducer} from "../store/Favorite/AddFavoriteReducer.js";
import {RemoveFavoriteReducer} from "../store/Favorite/RemoveFavoriteReducer.js";
import {AddReviewReducer} from "../store/Reviews/AddReviewReducer.js";
import {WeatherReducer} from "../store/Setting/WeatherReducer.js";
import {AllFavoriteReducer} from "../store/Favorite/AllFavoriteReducer.js";
import {NewsHomeReducer} from "../store/News/NewsHomeReducer.js";
import {AddToMyLearning} from "../store/Courses/AddToMyLearningReducer.js";
import {AllMyLearning} from "../store/Courses/AllMyLearningReducer.js";
import {RemoveCoursesLearningReducer} from "../store/Courses/RemoveCoursesLearningReducer.js";
import {RedirectCheckoutReducer} from "../store/Checkout/RedirectCheckoutReducer.js";
import {SuccessReducer} from "../store/Checkout/SuccessReducer.js";
import {LoginWithSocialReducer} from "../store/Authentication/LoginWithSocialReducer.js";
import {DeleteAccountReducer} from "../store/Authentication/DeleteAccountReducer.js";

export const combineReducer = combineReducers({
    heroBlogs: heroBlogsReducer.reducer,
    news: NewsReducer.reducer,
    serviceReducer: ServiceReducer.reducer,
    categoryBlogs: CategoryDetailReducer.reducer,
    DetailBlog: DetailBlogReducer.reducer,
    categoryServices: CategoryServiceReducer.reducer,
    authReducer: AuthReducer.reducer,
    emailReducer: EmailReducer.reducer,
    userReducer: UserReducer.reducer,
    validateEmailReducer: ValidateEmailReducer.reducer,
    resetPasswordReducer: ResetPasswordReducer.reducer,
    innovationReducer: InnovationReducer.reducer,
    contactReducer: ContactReducer.reducer,
    settingReducer: SettingReducer.reducer,
    statistiqueReducer: StatistiqueReducer.reducer,
    adminReducer: AdminReducer.reducer,
    coursesReducer: CoursesReducer.reducer,
    coursesCategoryReducer: CoursesCategoryReducer.reducer,
    coursesDetailReducer: CoursesDetailReducer.reducer,
    videoCoursesReducer: VideoCoursesReducer.reducer,
    addCommentReducer: AddCommentReducer.reducer,
    allCommentReducer: AllCommentReducer.reducer,
    logoutReducer: LogoutReducer.reducer,
    innovationDetailReducer: InnovationDetailReducer.reducer,
    blogsHomeReducer: BlogsHomeReducer.reducer,
    newsHomeReducer: NewsHomeReducer.reducer,
    coursesHomeReducer: CoursesHomeReducer.reducer,
    allReviewReducer: AllReviewReducer.reducer,
    addReviewReducer: AddReviewReducer.reducer,
    addToFavoriteReducer: AddToFavoriteReducer.reducer,
    allToFavoriteReducer: AllFavoriteReducer.reducer,
    removeFavoriteReducer: RemoveFavoriteReducer.reducer,
    weatherReducer: WeatherReducer.reducer,
    addToMyLearning: AddToMyLearning.reducer,
    allMyLearning: AllMyLearning.reducer,
    removeCoursesLearningReducer: RemoveCoursesLearningReducer.reducer,
    redirectCheckoutReducer: RedirectCheckoutReducer.reducer,
    successReducer: SuccessReducer.reducer,
    deleteAccountReducer: DeleteAccountReducer.reducer,
    loginWithSocialReducer: LoginWithSocialReducer.reducer,
});