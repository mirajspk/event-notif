import { Button } from "@/components/ui/button"
import { Icons } from "./components/icons"
import { ArrowRight } from "lucide-react"
import Footer from "./components/footer/Footer"
export default function Home() {
  const textstyle = "font-bold text-[rgb(90,90,90)] ";
  const sectionstyle = "flex sm:flex-row gap-4 align-middle items-center";

  return (
    <div className="flex flex-col min-h-screen mt-[60px]">
      <main className="flex-grow mx-auto overflow-y-scroll">
        {/* <Homepage /> */}
        <div>
          <section className="grid gap-8 md:grid-cols-2 md:items-start md:text-left bg-pink-50 mt-2 mx-4">
            <div>
              <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="" className="w-full rounded-lg" />
            </div>
            <div className="flex flex-col flex-1 flex-grow justify-between h-full gap-4">
              <h1 className="text-4xl font-medium mb-2">Headline</h1>
              <location className={sectionstyle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                <name className={textstyle}>Kathmandu University</name>
              </location>
              <timesection className={sectionstyle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-3"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16.5 12" /></svg>
                <time className={textstyle}>12:00</time>
              </timesection>
              <datesection className={sectionstyle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>
                <date className={textstyle}>12/12/2021</date>
              </datesection>
              <div className="border-t pt-6 mb-1">
                <h2 className="text-lg font-semibold mb-4">Host:</h2>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="font-medium">Kathmandu University Computer Club</p>
                    <div className="flex mt-2">
                      <input
                        type="email"
                        placeholder="Your email address..."
                        className="border px-3 py-1 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button className="bg-blue-500 text-white px-4 py-1 rounded-r-md hover:bg-blue-600">Follow</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main >
      <Footer />
    </div >

  )
}


