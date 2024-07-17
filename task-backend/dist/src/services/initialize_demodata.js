"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Banner_1 = __importDefault(require("../models/Banner"));
const Faq_1 = __importDefault(require("../models/Faq"));
const initializeDemoData = async () => {
    try {
        const banners = [
            {
                title: "Banner 1",
                description: "This is a Demo Banner with title 1",
                order: 1,
                redirect_url: "https://example.com",
                image_url: "/public/uploads/1721195173971-valley-landscape-aesthetic-mountains-gradient-background-1920x1080-4589.jpg"
            },
            {
                title: "Banner 2",
                description: "This is a Demo Banner with title 2",
                order: 2,
                redirect_url: "https://example.com",
                image_url: "/public/uploads/1721195156111-aesthetic-landscape-forest-silhouette-8ztdf3nzn4ptvwi1.jpg"
            },
            {
                title: "Banner 3",
                description: "This is a Demo Banner with title 3",
                order: 3,
                redirect_url: "https://example.com",
                image_url: "/public/uploads/1721195101066-pngtree-landscape-with-trees-and-a-pink-moon-picture-image_2625687.jpg"
            }
        ];
        const faqs = [
            {
                question: "What is a DNS?",
                answer: "The Domain Name System (DNS) is the phonebook of the Internet. When users type domain names such as 'google.com' or 'nytimes.com' into web browsers, DNS is responsible for finding the correct IP address for those sites.",
                order: 1
            },
            {
                question: "What is Mongoose used for?",
                answer: " Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.",
                order: 2
            },
            {
                question: "How are records stored in MongoDB?",
                answer: "MongoDB stores data records as documents (specifically BSON documents) which are gathered together in collections",
                order: 3
            }
        ];
        //insert all banners
        await Banner_1.default.insertMany(banners).then(() => {
            console.log("Banners Inserted");
        });
        //insert all faqs
        await Faq_1.default.insertMany(faqs).then(() => { console.log("Faaqs Inserted"); });
        console.log("Images uploaded successfully!");
    }
    catch (error) {
        console.error('Error uploading images:', error.message);
    }
};
// Execute the function if this file is run directly
if (require.main === module) {
    initializeDemoData();
}
exports.default = initializeDemoData;
