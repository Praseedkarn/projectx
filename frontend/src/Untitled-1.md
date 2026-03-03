# File Tree: project X

**Generated:** 3/1/2026, 5:31:43 PM
**Root Path:** `d:\project X`

```
├── 📁 EXPEDITIO_Documentation
│   └── 📄 EXPEDITIO.docs.txt
├── 📁 backend
│   ├── 📁 admin
│   ├── 📁 config
│   │   ├── 📄 cityCoords.js
│   │   ├── 📄 cityCountry.js
│   │   ├── 📄 countryMeta.js
│   │   ├── 📄 db.js
│   │   ├── 📄 defaultAttractions.js
│   │   ├── 📄 env.js
│   │   └── 📄 passport.js
│   ├── 📁 controllers
│   │   ├── 📄 auth.controller.js
│   │   ├── 📄 feedback.controller.js
│   │   ├── 📄 itinerary.controller.js
│   │   ├── 📄 qrTrip.controller.js
│   │   └── 📄 quiz.controller.js
│   ├── 📁 middleware
│   │   └── 📄 auth.middleware.js
│   ├── 📁 models
│   │   ├── 📄 Blog.js
│   │   ├── 📄 GuestUsage.js
│   │   ├── 📄 QrTrip.js
│   │   ├── 📄 QuizQuestion.js
│   │   ├── 📄 SearchHistory.js
│   │   ├── 📄 TokenHistory.js
│   │   ├── 📄 User.js
│   │   ├── 📄 city.model.js
│   │   ├── 📄 feedback.model.js
│   │   ├── 📄 guide.model.js
│   │   └── 📄 itinerary.js
│   ├── 📁 routes
│   │   ├── 📄 admin.routes.js
│   │   ├── 📄 ai.routes.js
│   │   ├── 📄 auth.routes.js
│   │   ├── 📄 blog.routes.js
│   │   ├── 📄 city.routes.js
│   │   ├── 📄 cityMeta.routes.js
│   │   ├── 📄 climate.router.js
│   │   ├── 📄 feedback.routes.js
│   │   ├── 📄 guide.routes.js
│   │   ├── 📄 history.routes.js
│   │   ├── 📄 itinerary.routes.js
│   │   ├── 📄 osm.routes.js
│   │   ├── 📄 otm.details.routes.js
│   │   ├── 📄 otm.routes.js
│   │   ├── 📄 qrTrip.routes.js
│   │   ├── 📄 quiz.admin.js
│   │   ├── 📄 quiz.routes.js
│   │   ├── 📄 weather.router.js
│   │   └── 📄 wiki.routes.js
│   ├── 📁 services
│   │   ├── 📄 ai.service.js
│   │   └── 📄 aiCityFallback.js
│   ├── 📁 utils
│   │   ├── 📄 sendEmail.js
│   │   └── 📄 verifyRecaptcha.js
│   ├── ⚙️ .gitignore
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   └── 📄 server.js
├── 📁 frontend
│   ├── 📁 public
│   │   ├── 🖼️ 360-camera.png
│   │   ├── 🖼️ airplane.png
│   │   ├── 🖼️ destination (1).png
│   │   ├── 📄 favicon.ico
│   │   ├── 🖼️ h.png
│   │   ├── 🌐 index.html
│   │   ├── 🖼️ logo.png
│   │   ├── 🖼️ logo192.png
│   │   ├── 🖼️ logo4.png
│   │   ├── 🖼️ logo512.png
│   │   ├── ⚙️ manifest.json
│   │   ├── 🖼️ map-location.png
│   │   ├── 🖼️ map.png
│   │   ├── 🖼️ p.png
│   │   ├── 🖼️ passport.png
│   │   ├── 🖼️ png-transparent-sticker-flight-air-travel-wall-decal-travel-angle-text-monochrome.png
│   │   ├── 🖼️ point.png
│   │   ├── 📄 robots.txt
│   │   ├── ⚙️ sitemap.xml
│   │   ├── 🖼️ t.png
│   │   └── 🖼️ world_map_PNG34.png
│   ├── 📁 src
│   │   ├── 📁 admin
│   │   │   ├── 📄 AdminDashboard.jsx
│   │   │   ├── 📄 AdminLayout.jsx
│   │   │   └── 📄 admin.api.js
│   │   ├── 📁 assets
│   │   │   ├── 📁 illustrations
│   │   │   │   ├── 🖼️ undraw_adventure_9my9.svg
│   │   │   │   ├── 🖼️ undraw_day-dreaming_2mlz.svg
│   │   │   │   ├── 🖼️ undraw_everywhere-together_c4di.svg
│   │   │   │   ├── 🖼️ undraw_map_cuix.svg
│   │   │   │   ├── 🖼️ undraw_nature_yf30.svg
│   │   │   │   ├── 🖼️ undraw_photo-viewer_opso.svg
│   │   │   │   ├── 🖼️ undraw_selfie-fun_0qzh.svg
│   │   │   │   └── 🖼️ undraw_social-friends_mt6k.svg
│   │   │   └── 📄 idk
│   │   ├── 📁 components
│   │   │   ├── 📁 itinerary
│   │   │   │   ├── 📄 HoursItinerary.jsx
│   │   │   │   ├── 📄 MultiDayItinerary.jsx
│   │   │   │   └── 📄 OneDayItinerary.jsx
│   │   │   ├── 📄 AdminBlog.jsx
│   │   │   ├── 📄 AiFaliPage.jsx
│   │   │   ├── 📄 AifeedbackBanner.jsx
│   │   │   ├── 📄 BecomeGuide.jsx
│   │   │   ├── 📄 BlogDetail.jsx
│   │   │   ├── 📄 Blogs.jsx
│   │   │   ├── 📄 CityPage.jsx
│   │   │   ├── 📄 CitySlider.jsx
│   │   │   ├── 📄 DayMap.jsx
│   │   │   ├── 📄 DistanceCalculator.jsx
│   │   │   ├── 📄 ExploreCities.jsx
│   │   │   ├── 📄 FaqFooterSection.jsx
│   │   │   ├── 📄 FeatureCards.jsx
│   │   │   ├── 📄 FreeGenerationsPopup.js
│   │   │   ├── 📄 Header.jsx
│   │   │   ├── 📄 ItineraryDetail.jsx
│   │   │   ├── 📄 ItineraryPage.jsx
│   │   │   ├── 📄 ItinerarySlider.jsx
│   │   │   ├── 📄 LogoLoader.jsx
│   │   │   ├── 📄 PackingList.jsx
│   │   │   ├── 📄 ProfilePage.jsx
│   │   │   ├── 📄 QrTripPage.jsx
│   │   │   ├── 📄 SavedItineraries.jsx
│   │   │   ├── 📄 SignIn.jsx
│   │   │   ├── 📄 TokenHistoryPage.jsx
│   │   │   ├── 📄 TravelQuotes.jsx
│   │   │   ├── 📄 TripResults.jsx
│   │   │   └── 📄 Untitled-1.txt
│   │   ├── 📁 data
│   │   │   ├── 📁 itinerary
│   │   │   │   ├── 📄 Australian.js
│   │   │   │   ├── 📄 Rajasthan.js
│   │   │   │   ├── 📄 amritsar.js
│   │   │   │   ├── 📄 andaman.js
│   │   │   │   ├── 📄 annapurna.js
│   │   │   │   ├── 📄 bali.js
│   │   │   │   ├── 📄 california.js
│   │   │   │   ├── 📄 delhiHeritage.js
│   │   │   │   ├── 📄 dolomites.js
│   │   │   │   ├── 📄 europ.js
│   │   │   │   ├── 📄 everest.js
│   │   │   │   ├── 📄 goa.js
│   │   │   │   ├── 📄 goa2.js
│   │   │   │   ├── 📄 goldenTriangle.js
│   │   │   │   ├── 📄 himachal.js
│   │   │   │   ├── 📄 iceland.js
│   │   │   │   ├── 📄 index.js
│   │   │   │   ├── 📄 japan.js
│   │   │   │   ├── 📄 kashmir.js
│   │   │   │   ├── 📄 kerala.js
│   │   │   │   ├── 📄 kilimanjaro.js
│   │   │   │   ├── 📄 ladakh.js
│   │   │   │   ├── 📄 machuPichu.js
│   │   │   │   ├── 📄 mountFuji.js
│   │   │   │   ├── 📄 mountcook.js
│   │   │   │   ├── 📄 northeast.js
│   │   │   │   ├── 📄 pantagonia.js
│   │   │   │   ├── 📄 peru.js
│   │   │   │   ├── 📄 rishikesh.js
│   │   │   │   ├── 📄 rockeyMountains.js
│   │   │   │   ├── 📄 safari.js
│   │   │   │   ├── 📄 santorini.js
│   │   │   │   ├── 📄 sikkim.js
│   │   │   │   ├── 📄 swissAlps.js
│   │   │   │   ├── 📄 thai.js
│   │   │   │   ├── 📄 udaipur.js
│   │   │   │   └── 📄 varanasi.js
│   │   │   ├── 📁 koi to data hoga
│   │   │   ├── 📄 aiFailMessages.js
│   │   │   ├── 📄 blogs.js
│   │   │   ├── 📄 cities.js
│   │   │   └── 📄 demoItineraries.js
│   │   ├── 📁 layouts
│   │   │   └── 📄 MainLayout.jsx
│   │   ├── 📁 pages
│   │   │   ├── 📄 AuthSuccess.jsx
│   │   │   ├── 📄 HelpPage.jsx
│   │   │   ├── 📄 Privacy.jsx
│   │   │   ├── 📄 QuizPage.jsx
│   │   │   ├── 📄 Terms.jsx
│   │   │   └── 📄 TripPlanner.jsx
│   │   ├── 📁 services
│   │   │   ├── 📁 prompts
│   │   │   │   ├── 📄 buildHoursPrompt.js
│   │   │   │   ├── 📄 buildMultiDayPrompt.js
│   │   │   │   ├── 📄 buildOneDayPrompt.js
│   │   │   │   └── 📄 buildPrompt.js
│   │   │   ├── 📄 api.js
│   │   │   ├── 📄 apiClient.js
│   │   │   └── 📄 promptBuilder.js
│   │   ├── 📁 styles
│   │   │   ├── 🎨 Header.css
│   │   │   ├── 🎨 ItineraryDetail.css
│   │   │   ├── 🎨 ItineraryPage.css
│   │   │   ├── 🎨 PackingList.css
│   │   │   ├── 🎨 ProfilePage.css
│   │   │   ├── 🎨 SavedItineraries.css
│   │   │   ├── 🎨 SignIn.css
│   │   │   ├── 🎨 TripResults.css
│   │   │   └── 🎨 footer.css
│   │   ├── 📁 utils
│   │   │   ├── 📁 parsers
│   │   │   │   ├── 📄 parseHoursText.js
│   │   │   │   ├── 📄 parseMultiDayText.js
│   │   │   │   └── 📄 parseOneDayText.js
│   │   │   └── 📄 idk
│   │   ├── 🎨 App.css
│   │   ├── 📄 App.js
│   │   ├── 📄 App.test.js
│   │   ├── 📄 AppRouter.jsx
│   │   ├── 📄 analytics.js
│   │   ├── 🎨 index.css
│   │   ├── 📄 index.js
│   │   ├── 🖼️ logo.svg
│   │   ├── 📄 reportWebVitals.js
│   │   └── 📄 setupTests.js
│   ├── ⚙️ .gitignore
│   ├── 📝 README.md
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── 📄 postcss.config.js
│   └── 📄 tailwind.config.js
├── 📝 DEPLOYMENT_SOP.md
└── 📝 README.md
```

---
*Generated by FileTree Pro Extension*