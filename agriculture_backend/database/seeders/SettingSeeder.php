<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("our_apps")->insert([
            "id" => Str::uuid(),
            "description" => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "image" => "https://agricultureyhaddar.s3.us-east-2.amazonaws.com/ourApps/e8b45faecbb0aa92b3fb1343ab294398+1.png",
            "link" => "#",
            "services" => "<ul>
    <li>Real-time notifications and updates</li>
    <li>Easy login with fingerprint or face recognition</li>
    <li>Quick access to saved data and settings</li>
    <li>Offline functionality for key features</li>
    <li>24/7 customer support via live chat</li>
  </ul>

  <h2>Steps to Use Our App</h2>
  <ol>
    <li>Download the app from the App Store or Google Play</li>
    <li>Create your account or log in</li>
    <li>Set your preferences and enable notifications</li>
    <li>Explore the dashboard and access tools</li>
    <li>Contact support if you need help</li>
  </ol>"
        ]);

        DB::table("our_apps")->insert([
            "id" => Str::uuid(),
            "description" => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "image" => "https://agricultureyhaddar.s3.us-east-2.amazonaws.com/ourApps/Agricultural+Dashboard+-+UI+Design+1.png",
            "link" => "#",
            "services" => "<ul>
    <li>Full-featured dashboard for advanced tasks</li>
    <li>Multi-window support for increased productivity</li>
    <li>Access to detailed analytics and reports</li>
    <li>Cloud synchronization with your mobile app</li>
    <li>Advanced settings and customization options</li>
  </ul>

  <h2>Steps to Use Our Desktop Version</h2>
  <ol>
    <li>Visit our official website</li>
    <li>Sign in with your registered email and password</li>
    <li>Navigate to the services tab from the menu</li>
    <li>Use the tools available based on your subscription</li>
    <li>Download reports or sync with your app account</li>
  </ol>"
        ]);

//        DB::table("privacy_policy")->insert([
//            "id" => Str::uuid(),
//            "title" => "Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.",
//            "description" => "<ul>
//    <li>We collect only the necessary data needed to provide our services.</li>
//    <li>All personal information is stored securely and encrypted.</li>
//    <li>We do not sell or share your information with third parties without your consent.</li>
//    <li>Users can update or delete their account information at any time.</li>
//    <li>Cookies are used only to improve user experience and track preferences.</li>
//  </ul>"
//        ]);

//        DB::table("privacy_policy")->insert([
//            "id" => Str::uuid(),
//            "title" => "Below are the key steps we take to protect your privacy:",
//            "description" => "<ol>
//    <li>Encrypt all sensitive data using industry-standard protocols.</li>
//    <li>Regularly update our systems to fix vulnerabilities.</li>
//    <li>Offer account management tools to control your information.</li>
//    <li>Allow you to opt-out of certain data tracking features.</li>
//    <li>Respond promptly to any user concerns or data requests.</li>
//  </ol>"
//        ]);
//
//        DB::table("faq")->insert([
//            "id" => Str::uuid(),
//            "title" => "We understand that you may have questions about how our platform works. Below are answers to some of the most common questions from our users.",
//            "description" => "<ul>
//    <li><strong>Q: How do I reset my password?</strong><br>A: You can reset your password by clicking \"Forgot Password\" on the login page and following the instructions.</li>
//    <li><strong>Q: Is my data synced between the app and desktop?</strong><br>A: Yes, your data is automatically synced in real-time when you’re logged into both platforms.</li>
//    <li><strong>Q: How do I contact customer support?</strong><br>A: You can use the live chat feature in the app or send us an email through the Contact Us page.</li>
//    <li><strong>Q: Can I delete my account?</strong><br>A: Yes, you can request account deletion in your profile settings under \"Privacy Options.\"</li>
//    <li><strong>Q: Are there any hidden fees?</strong><br>A: No, we are fully transparent. All charges are shown before you subscribe or purchase any plan.</li>
//  </ul>"
//        ]);


    }
}
