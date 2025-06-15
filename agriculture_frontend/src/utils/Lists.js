import {IoKeyOutline, IoMailOutline} from "react-icons/io5";
import {Regex} from "./regex.js";
import {LiaBirthdayCakeSolid, LiaUserEditSolid} from "react-icons/lia";
import {MdAgriculture, MdLabelImportantOutline, MdOutlineLocalOffer, MdOutlinePhone} from "react-icons/md";
import {ImWhatsapp} from "react-icons/im";
import {about} from "./images.js";
import {FaRegComment, FaRegUser} from "react-icons/fa";
import {PiCity} from "react-icons/pi";
import {CgWorkAlt} from "react-icons/cg";
import {TbGenderFemme} from "react-icons/tb";

const pages = ["home", "blogs", "news", "courses", "innovation"];
const otherPages = ["our apps", "privacy policy", "FAQ", "contact"]
const contacts = {
    email: "agricultureContact@agriculture.com",
    phone: "+212 661450238",
    fix: "+212 565412558",
    whatsapp: "+212 661450238"
}

const inputLogin = [
    {
        type: "email",
        iconInput: IoMailOutline,
        regex: Regex[0]
    },
    {
        type: "password",
        iconInput: IoKeyOutline,
        regex: Regex[1]
    }
]

const inputRegister = [
    {
        type: "full_name",
        iconInput: LiaUserEditSolid,
        placeholder: "full name",
        regex: Regex[2]
    },
    {
        type: "email",
        iconInput: IoMailOutline,
        regex: Regex[0]
    },
    {
        type: "password",
        iconInput: IoKeyOutline,
        regex: Regex[1]
    },
    {
        type: "confirmPassword",
        iconInput: IoKeyOutline,
        regex: Regex[1],
        placeholder: "confirm password",
    }
]

const inputContact = [
    {
        type: "email",
        iconInput: IoMailOutline,
        placeholder: "email",
        regex: Regex[0]
    },
    {
        type: "subject",
        iconInput: MdLabelImportantOutline,
        placeholder: "subject",
        regex: Regex[3]
    }
]

const contactInfo = [
    {
        key1: "Email",
        key2: null,
        title1: "agricultureContact@agriculture.com",
        title2: null,
        icon: IoMailOutline
    },
    {
        key1: "phone",
        key2: "fix",
        title1: "+212 661450238",
        title2: "+212 565412558",
        icon: MdOutlinePhone
    },
    {
        key1: "whatsapp",
        key2: null,
        title1: "+212 661450238",
        title2: null,
        icon: ImWhatsapp
    }
]

const AboutUs = {
    title: "agriculture.com",
    subtitle: "Empowering Farmers with Knowledge and Innovation",
    description: "Welcome to Agriculture.com, the ultimate online platform for farmers, agricultural professionals, and enthusiasts. Our mission is to provide essential tools, resources, and insights to enhance farming practices, stay informed, and drive innovation in agriculture.",
    image: about
}

const InputComment = [
    {
        type: "comment",
        iconInput: FaRegComment,
        placeholder: "add comment",
        regex: Regex[5]
    }
]


const InputPromo = [
    {
        type: "text",
        iconInput: MdOutlineLocalOffer,
        placeholder: "code promo",
        regex: Regex[6]
    }
]

const UserInputs = [
    {
        type: "full_name",
        name: "full_name",
        iconInput: FaRegUser,
        placeholder: "full_name",
        regex: Regex[2]
    },
    {
        type: "email",
        iconInput: IoMailOutline,
        placeholder: "email",
        regex: Regex[0]
    },
    {
        type: "city",
        iconInput: PiCity,
        placeholder: "city",
        regex: Regex[7]
    },
    {
        type: "date_birth",
        iconInput: LiaBirthdayCakeSolid,
        placeholder: "date birthday",
        regex: Regex[8]
    },
    {
        type: "experience",
        iconInput: CgWorkAlt,
        placeholder: "experience",
        regex: Regex[9]
    },
    {
        type: "phone",
        iconInput: MdOutlinePhone,
        placeholder: "phone",
        regex: Regex[10]
    },
    {
        type: "domain",
        iconInput: MdAgriculture,
        placeholder: "domain",
        regex: Regex[11]
    },
    {
        type: "genre",
        iconInput: TbGenderFemme,
        placeholder: null,
        regex: Regex[11]
    },
]

export {pages, otherPages, contacts, inputLogin, inputRegister, inputContact, contactInfo, AboutUs, InputComment, InputPromo, UserInputs}