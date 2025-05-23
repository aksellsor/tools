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
    const [faviconURL, setFaviconURL] = useState("");

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

    const updateTheme = useCallback(() => {
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
    }, []);

    useEffect(() => {
        if (!theme) updateTheme();
    }, [theme]);

    useEffect(() => {
        const detectThemeChange = () => updateTheme();
        const matcher = window.matchMedia('(prefers-color-scheme: dark)');
        matcher.addEventListener('change', detectThemeChange);
        return () => matcher.removeEventListener('change', detectThemeChange);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const canCopy = val?.length > 0;

    useEffect(() => {
        document.querySelector(".validize")?.focus();
    }, []);

    useEffect(() => {
        document.title = val || "Your text here";
    }, [val]);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) applyFavicon(file);
};

const applyFavicon = (file) => {
  if (!file || !file.type.startsWith("image/")) {
    toast.error("Invalid image file");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const dataUrl = event.target.result;

    // Remove all existing icons
    document.querySelectorAll("link[rel~='icon']").forEach(el => el.remove());

    // Add new icon
    const newFavicon = document.createElement("link");
    newFavicon.rel = "icon";
    newFavicon.type = file.type;
    newFavicon.href = dataUrl;
    document.head.appendChild(newFavicon);

    toast.success("Favicon updated!");
  };
  reader.readAsDataURL(file);
};

useEffect(() => {
  const handlePaste = (e) => {
    const item = [...e.clipboardData.items].find(i => i.type.startsWith("image/"));
    if (item) {
      const file = item.getAsFile();
      if (file) {
        applyFavicon(file);
      }
    }
  };

  window.addEventListener("paste", handlePaste);
  return () => window.removeEventListener("paste", handlePaste);
}, []);


    return (
        <>
            <Toaster />
            <label className='theme-changer'>
                <Toggle
                    checked={theme === "dark"}
                    icons={{
                        unchecked: <MdDarkMode />,
                        checked: <MdLightMode />,
                    }}
                    onChange={() => {
                        setTheme(theme === "dark" ? "light" : "dark");
                    }}
                />
            </label>
            <div className='page'>
                <fieldset>
                    <label>
                        <input
                            placeholder={document.title}
                            className="validize tabtitle-valuer"
                            type="text"
                            name="tabtitle-value"
                            onChange={e => setVal(e.target.value)}
                            defaultValue={val}
                            required
                        />
                    </label>
                    <div className='ui-row'>
                        <div className={`dl ${(canCopy ? "" : "dl--disabled")}`} onClick={() => {
                            if (!canCopy) {
                                document.querySelector(`[name="tabtitle-value"]`)?.focus();
                            }
                        }}>
                            <CopyToClipboard
                                text={val}
                                onCopy={() => {
                                    toast("Tab Title has been copied", {
                                        duration: 1500,
                                        icon: '👏',
                                    });
                                }}
                            >
                                <motion.button whileTap={{ scale: 0.9 }}>Copy Tab Title <IoMdCopy size="1.25em" /></motion.button>
                            </CopyToClipboard>
                        </div>
                    </div>
                    <label>
                        Paste or upload Favicon:
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </label>
                </fieldset>
            </div>
        </>
    );
}

export default TabTitle;
