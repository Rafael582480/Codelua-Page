"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { faBars, faX, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";

export function Header() {
    const currentPath = usePathname();
    const [menu, setMenu] = useState(Boolean);
    const [theme, setTheme] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTheme(isDark);

        const html = document.querySelector("html");
        if (html) {
            html.setAttribute("data-theme", isDark ? "dark" : "light");
        }
    }, []);

    function isActive() {
        setMenu(!menu);
    }

    function handleTheme() {
        const html = document.querySelector("html");
        if (html?.getAttribute("data-theme") === "dark") {
            html.setAttribute("data-theme", "light");
            setTheme(false);
            localStorage.setItem('theme', 'light');
        } else {
            html?.setAttribute("data-theme", "dark");
            setTheme(true);
            localStorage.setItem('theme', 'dark');
        }
    }

    return (
        <>
            <header className="flex fixed top-0 right-0 left-0 z-50 justify-around md:justify-evenly  items-center p-5 bg-[var(--components-color)]">
                <Link href="/"><h1 className="font-bold text-4xl text-[var(--text-primary)] rounded-lg">CODE<span className="text-[#00E002]">LUA</span></h1></Link>
                <div className="hidden md:block border-3 border-[#00E002] pl-10 p-3 rounded-3xl w-100">
                    <nav className="flex justify-between">
                        <ul className="flex gap-4 text-base">
                            <div className="data-[active=true]:shadow-[0px_2px_0px_#00E002]" data-active={currentPath === "/"}>
                                <Link href='/'><li className="text-[var(--text-primary)] cursor-pointer transition hover:text-[var(--text-secondary)]">Cursos</li></Link>
                            </div>
                            <div className="data-[active=true]:shadow-[0px_2px_0px_#00E002]" data-active={currentPath === "/challenges"}>
                                <Link href='/challenges'><li className="text-[var(--text-primary)] cursor-pointer transition hover:text-[var(--text-secondary)]">Desafios</li></Link>
                            </div>
                        </ul>
                        <div className="pr-5">
                            <FontAwesomeIcon onClick={() => handleTheme()} icon={theme === true ? faMoon : faSun} className="hover:text-[var(--color-primary)] transtion duration-500 text-[var(--text-primary)] text-lg cursor-pointer" />
                        </div>
                    </nav>
                </div>
                <div className="block md:hidden">
                    <FontAwesomeIcon onClick={() => isActive()} icon={faBars} className="text-[#00E002] text-xl" />
                </div>
            </header>
            {menu === true ? (
                <div className="flex">
                    <div className="w-2/3 h-screen top-0 z-9999 fixed bg-[var(--card-color)]">
                        <div className="p-5">
                            <Link href="/"><h1 className="font-bold text-4xl text-[var(--text-primary)] rounded-lg">CODE<span className="text-[#00E002]">LUA</span></h1></Link>
                        </div>
                        <nav className="block">
                            <ul className="flex flex-col p-5 gap-4 text-base">
                                <div className="data-[active=true]:shadow-[0px_1px_0px_#00E022]" data-active={currentPath === "/"}>
                                    <Link href='/'><li className="text-[var(--text-primary)] cursor-pointer transition hover:text-gray-400">Cursos</li></Link>
                                </div>
                                <div className="data-[active=true]:shadow-[0px_1px_0px_#00E022]" data-active={currentPath === "/challenges"}>
                                    <Link href='/challenges'><li className="text-[var(--text-primary)] cursor-pointer transition hover:text-gray-400">Desafios</li></Link>
                                </div>
                            </ul>
                            <div className="p-5">
                                <FontAwesomeIcon onClick={() => handleTheme()} icon={theme === true ? faMoon : faSun} className="hover:text-[var(--color-primary)] transtion duration-500 text-[var(--text-primary)] text-lg cursor-pointer" />
                            </div>
                        </nav>
                    </div>
                    <div className="h-screen fixed w-1/3 z-9999 right-0 backdrop-blur-sm bg-[var(--color-blue)]">
                        <div onClick={() => isActive()} className="fixed right-10 bg-[var(--components-color)] p-2 rounded-full top-6 w-10 text-center z-9999">
                            <FontAwesomeIcon icon={faX} className="text-[var(--text-primary)] text-xs" />
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}