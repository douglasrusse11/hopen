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
      GB: {
        translation: {
            home: {
                signin: 'Sign In',
                signout: 'Sign Out',
                homeHeader: 'Welcome to HopeN',
                homeText: "Thank you for visiting us! If you're looking for information on topics like asylum procedures, work permissions, registering children for school, or finding a doctor, you're in the right place. Our project aims to help refugees in Greece access services and exercise their rights.",
                resources: "Resources",
                db: "Seed DB",
                contact: "Contact Us",
                news: "News",
                spreadsheet: "Copy and paste the content of your spreadsheet here"
            },
            contact: {
                intro: "Get in touch",
                name: "Name",
                email: "Email",
                message: "Message",
                send: "Send a message",
                search: "Search",
                noresults: "No results",
                contact: "Contact Us",
                fillform: "Fill up the form and we will get back to you as soon as possible",
                submit: "Submit"
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
            },
            news: {
              search: "Search for news",
              noresults: "No results",
              readmore: "Read more"
            }
        }
      },
      SY: {
          translation: {
              home: {
                signin: '?????????? ????????????',
                signout: '????????',
                homeHeader: '???????????? ?????? ???? HopeN',
                homeText: "???????? ?????????????? ???????? ????????????! ?????? ?????? ???????? ???? ?????????????? ?????? ???????????? ?????? ?????????????? ???????????? ?? ???? ???????????? ?????????? ?? ???? ?????????? ?????????????? ???? ?????????????? ?? ???? ???????????? ?????? ???????? ?? ???????? ???? ???????????? ????????????. ???????? ?????????????? ?????? ???????????? ???????????????? ???? ?????????????? ?????? ???????????? ?????? ?????????????? ?????????????? ????????????.",
                resources: "??????????",
                db: "???????????? ????????????",
                contact: "???????? ??????",
                news: "??????",
                spreadsheet: "???????? ?????????? ?????????? ???????? ???????????????? ??????"
              },
              contact: {
                intro: "???????? ?????? ??????????",
                name: "??????",
                email: "???????? ????????????????????",
                message: "??????????",
                send: "???????? ??????????",
                search: "??????",
                noresults: "???? ??????????",
                contact: "???????? ??????",
                fillform: "???????? ?????????????? ?????????????? ?????????????? ???? ???? ???????? ?????? ????????",
                submit: "??????????"
              },
              nav: {
                accommodation: "??????????",
                food: "????????",
                clothing: "??????????",
                health: "?????????? ????????",
                sports: "???????????? ????????????",
                legal: "?????????? ??????????????",
                education: "??????????"
              },
            form: {
                add: "+ ?????????? ????????",
                close: "??????",
                noresource: "???? ???????? ?????????? ???????????? ",
                submit: "??????????",
                name: "??????",
                address: "????????",
                description: "??????",
                phone: "?????? ????????????????",
                email: "?????????? ???????????? ????????????????????",
                hours: "?????????? ??????????"
            },
            news: {
              search: "???????? ???? ??????????s",
              noresults: "???? ??????????",
              readmore: "???????? ????????"
            }
          }
      }
    }
  });

export default i18n;