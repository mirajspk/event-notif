import { useState } from "react";
import { Button } from "./button";

const Header= () => {

    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <div className="absolute w-full h-full bg-emerald-300">
            <header className="px-10 py-5 flex justify-between items-center bg-white">
            <span className="text-2xl cursor-default font-semibold">KUevents</span>
            <nav className="hidden md:flex gap-6">
                <ul className="flex gap-6">
                    <li> <a href="#">Home</a></li>
                    <li> <a href="#">Events</a></li>
                    <li> <a href="#">Clubs</a></li>
                    <li> <a href="#">Contact</a></li>
                    <li> <a href="#">About</a></li>
                </ul>
            </nav>

                <div className="flex gap-4">
                <div className="">
                {/* <Button variant="ghost">LOGIN</Button> */}
                <Button>SIGN IN</Button>
            </div> 

            
                <i className="md:hidden bx bx-menu text-3xl block"
                onClick={()=>setMenuOpen(!isMenuOpen)}></i> 
                </div>

            

                <div className={`absolute top-20 left-0 w-full bg-red-300 md:hidden
                    ${isMenuOpen?"opacity-100":"opacity-0"}`}>
                    <ul className="flex flex-col gap-4 items-center">
                        <li> <a href="#">Home</a></li>
                        <li> <a href="#">Events</a></li>
                        <li> <a href="#">Clubs</a></li>
                        <li> <a href="#">Contact</a></li>
                        <li> <a href="#">About</a></li>
                    </ul>     
                </div>
            

        </header>
    </div>
    )

}

export { Header };
