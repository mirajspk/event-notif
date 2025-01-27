
const EventDetail = () => {
  const textstyle = "font-bold text-[rgb(90,90,90)] ";
  const sectionstyle = "flex sm:flex-row gap-4 align-middle items-center";
  return (
    <main className="mx-auto bg-pink-50 md:w-3/4 overflow-y-auto flex-grow">
      {/* <Homepage /> */}
      <div className="mx-4 md:mx-10 my-4">
        <section className="mt-2 grid gap-8 md:grid-cols-2 md:items-start md:text-left bg-pink-50 ">
          <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="" className="w-full rounded-lg object-fill max-w-[100%] h-auto flex grow-2" />
          <div className="flex flex-col flex-1 flex-grow-1 justify-between h-full gap-4 md:gap-2">
            <h1 className="text-4xl font-medium mb-2">HeadLine</h1>
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
              <div className="flex items-center space-x-4 ml-2">
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
        <description className="border-b-2">
          <h2 className="text-lg font-semibold my-6 md:my-10">Description</h2>
          <p className="text-justify">Excepteur efficient emerging, minChina,[i] officially the People's Republic of China (PRC),[j] is a country in East Asia. With a population exceeding 1.4 billion, it is the second-most populous country after India, representing 17.4% of the world population. China spans the equivalent of five time zones and borders fourteen countries by land[k] across an area of nearly 9.6 million square kilometers (3,700,000 sq mi), making it the third-largest country by total land area.[l] The country is divided into 33 province-level divisions: 22 provinces,[m] five autonomous regions, four municipalities, and two semi-autonomous special administrative regions. Beijing is the country's capital, while Shanghai is its most populous city by urban area and largest financial center.

            China is considered one of the cradles of civilization: the first human inhabitants in the region arrived during the Paleolithic. By the late 2nd millennium BCE, the earliest dynastic states had emerged in the Yellow River basin. The 8th–3rd centuries BCE saw a breakdown in the authority of the Zhou dynasty, accompanied by the emergence of administrative and military techniques, literature, philosophy, and historiography. In 221 BCE, China was unified under an emperor, ushering in more than two millennia of imperial dynasties including the Qin, Han, Tang, Yuan, Ming, and Qing. With the invention of gunpowder and paper, the establishment of the Silk Road, and the building of the Great Wall, Chinese culture flourished and has heavily influenced both its neighbors and lands further afield. However, China began to cede parts of im veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui  international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.</p>
        </description>
      </div>
    </main >
  )
}

export default EventDetail
