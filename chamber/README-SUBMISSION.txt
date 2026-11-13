WDD 231 W03 CHAMBER HOME PAGE — ABUJA

WHAT WAS UPDATED
- Added chamber/index.html as the home page.
- Added a responsive hero image using an <img> element.
- Added a Join the Chamber call-to-action.
- Added Current Events, Weather, and Member Spotlights sections.
- Added chamber/styles/home.css for the home-page layout.
- Added chamber/scripts/home.js for navigation, OpenWeatherMap weather, and random member spotlights.
- Updated the directory brand link so the chamber logo returns to index.html.

IMPORTANT: OPENWEATHERMAP API KEY
The supplied OpenWeatherMap API key has been configured in chamber/scripts/home.js so the weather section can load live data for Abuja.

Note: because this is a client-side WDD 231 project hosted on GitHub Pages, the API key will be visible in the browser source. If your OpenWeatherMap account supports it, restrict the key to the appropriate website/API usage or rotate it after the course assignment if needed.

Run chamber/index.html with VS Code Live Server and confirm the current temperature, weather description, and 3-day forecast appear.

HOME PAGE REQUIREMENTS COVERED
- Consistent header/navigation/footer
- Home-page title and metadata
- Scalable hero image using img
- Join Chamber CTA
- Current events section
- Current weather section
- 3-day forecast
- Two or three randomly selected Silver/Gold member spotlights
- Spotlight data loaded from data/members.json using fetch and async/await
- Responsive mobile/large-screen layout
- Accessible skip link, headings, labels, alt text, focus styles, and live regions

TESTING
Open the page through VS Code Live Server rather than file:// so fetch() can load members.json.

Then check:
- Browser console for JavaScript errors
- Mobile and desktop responsive layouts
- Lighthouse: Accessibility, Best Practices, SEO
- CSS Overview for contrast
- W03 Chamber Home audit

GITHUB PAGES URL
https://iamfemimorin.github.io/wdd231/chamber/index.html
