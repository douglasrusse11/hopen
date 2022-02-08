import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
            home: {
                signin: 'Sign In',
                signout: 'Sign Out',
                homeHeader: 'Welcome to HopeN',
                homeText: "Thank you for visiting us! If you're looking for information on topics like asylum procedures, work permissions, registering children for school, or finding a doctor, you're in the right place. Our project aims to help refugees in Greece access services and exercise their rights.",
                resources: "Resources",
                db: "Seed DB"
            },
            contact: {
                intro: "Get in touch",
                name: "Name",
                email: "Email",
                message: "Message",
                send: "Send a message",
                search: "Search",
                noresults: "No results"
            },
            nav: {
                accommodation: "Accommodation",
                food: "Food",
                clothing: "Clothing",
                health: "Health Services",
                sports: "Sport Activities",
                legal: "Legal Services",
                education: "Education"
              },
            form: {
                add: "+ Add new",
                close: "Close",
                noresource: "No resources to display for ",
                submit: "Submit",
                name: "Name",
                address: "Address",
                description: "Description",
                phone: "Phone Number",
                email: "Email Address",
                hours: "Opening Hours"
            }
        }
      },
      ar: {
          translation: {
              home: {
                signin: 'تسجيل الدخول',
                signout: 'خروج',
                homeHeader: 'مرحبًا بكم في HopeN',
                homeText: "شكرا لزيارتك دليل اللاجئ! إذا كنت تبحث عن معلومات حول مواضيع مثل إجراءات اللجوء ، أو أذونات العمل ، أو تسجيل الأطفال في المدرسة ، أو العثور على طبيب ، فأنت في المكان الصحيح. يهدف مشروعنا إلى مساعدة اللاجئين في اليونان على الوصول إلى الخدمات وممارسة حقوقهم.",
                resources: "مصادر",
                db: "ديسيبل البذور"
              },
              contact: {
                intro: "ابقى على تواصل",
                name: "اسم",
                email: "بريد الالكتروني",
                message: "رسالة",
                send: "ارسل رسالة",
                search: "بحث",
                noresults: "لا نتائج"
              },
              nav: {
                accommodation: "إقامة",
                food: "طعام",
                clothing: "ملابس",
                health: "خدمات صحية",
                sports: "نشاطات رياضية",
                legal: "خدمات قانونية",
                education: "تعليم"
              },
            form: {
                add: "+ اضافة جديد",
                close: "غلق",
                noresource: "لا توجد موارد لعرضها ",
                submit: "إرسال",
                name: "اسم",
                address: "تبوك",
                description: "وصف",
                phone: "رقم التليفون",
                email: "عنوان البريد الالكترونى",
                hours: "ساعات العمل"
            }
          }
      }
    }
  });

export default i18n;