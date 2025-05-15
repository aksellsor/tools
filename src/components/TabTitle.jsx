import React, { useState, useEffect, useCallback } from 'react';
import { motion } from "framer-motion";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoMdCopy } from "react-icons/io";
import { toast, Toaster } from "react-hot-toast";
import Toggle from 'react-toggle';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import "@picocss/pico/css/pico.min.css";
import "react-toggle/style.css";

function TabTitle() {
    const [val, setVal] = useState("");
    function useStickyState(defaultValue, key) {
        const [value, setValue] = React.useState(() => {
            const stickyValue = window.localStorage.getItem(key);
            return stickyValue !== null
                ? JSON.parse(stickyValue)
                : defaultValue;
        });
        React.useEffect(() => {
            window.localStorage.setItem(key, JSON.stringify(value));
        }, [key, value]);
        return [value, setValue];
    }
    const [theme, setTheme] = useStickyState(null, "theme");
    const updateTheme = useCallback(
        () => {

            const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
            if (prefersDarkTheme.matches) {
                setTheme('dark');
                return;
            }

            const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)');
            if (prefersLightTheme.matches) {
                setTheme('light');
                return;
            }

            setTheme('dark');
        },
        [],
    );

    useEffect(() => {
        if (!theme) {
            updateTheme();
        }
    }, [theme]);

    useEffect(() => {
        const detectThemeChange = (event) => {
            // const newColorScheme = event.matches ? "dark" : "light";

            updateTheme();
        };
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectThemeChange);

        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', detectThemeChange);
        };
    }, []);



    useEffect(() => {
        var root = document.getElementsByTagName('html')[0]; // '0' to assign the first (and only `HTML` tag)
        root.setAttribute('data-theme', theme);
    }, [theme]);

    const canCopy = val?.length > 0;
    useEffect(() => {
        document.querySelector(".validize")?.focus();
    }, []);

    useEffect(() => {
      document.title = val || "aksell.dev - tabtitle"
    }, [val])
    

    return (
        <>
            <Toaster />
            <label className='theme-changer'>
                <Toggle
                    checked={theme === "dark" ? true : false}
                    icons={{
                        unchecked: <MdDarkMode />,
                        checked: <MdLightMode />,
                    }}
                    onChange={() => {
                        setTheme(t => theme === "dark" ? "light" : "dark");
                    }} />
            </label>
            <div className='page'>
                <fieldset>
                    <label>
                        <input placeholder={document.title} className="validize" type="text" name="tabtitle-value" id="" onChange={e => setVal(e.target.value)} defaultValue={val} required />
                    </label>
                    <div className='ui-row'>
                        <div className={`dl ${(canCopy) ? "" : "dl--disabled"}`} onClick={() => {

                            if (!canCopy) {
                                document.querySelector(`[name="tabtitle-value"]`)?.focus();
                            }
                        }}>
                            <CopyToClipboard
                                text={document.querySelector(".tabtitle-valuer")?.value}
                                onCopy={() => {
                                    toast("Tab Title has been copied",
                                        {
                                            duration: 1500,
                                            icon: '👏',
                                        });
                                }}
                            >
                                <motion.button whileTap={{ scale: 0.9 }}>Copy Tab Title <IoMdCopy size="1.25em" /></motion.button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </fieldset>
            </div>
        </>
    );
}

export default TabTitle;