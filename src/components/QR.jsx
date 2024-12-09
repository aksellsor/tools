import React, { useState, useEffect, useCallback } from 'react';
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { HexColorPicker } from "react-colorful";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoMdCopy } from "react-icons/io";
import { IoDownloadOutline } from "react-icons/io5";
import { toast, Toaster } from "react-hot-toast";
import Toggle from 'react-toggle';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import "@picocss/pico/css/pico.min.css";
import "react-toggle/style.css";

const ColorPickerRow = ({ label, color, setState, stateKey }) => {
    return (
        <div className='color-picker-row'>{label}<HexColorPicker color={color} onChange={val => setState(stateKey, val)} /><input style={{ borderRight: `10px solid ${color}` }} type="text" name="" id="" value={color} onChange={e => setState(stateKey, e.target.value)} /></div>
    );
};
const defaults = {
    bg: "#FFFFFF",
    color: '#000000'
};
function QR() {
    const [val, setVal] = useState("");
    const [filename, setFilename] = useState("");
    const downloadSVG = useCallback(
        (svg, filename) => {
            svg = svg?.innerHTML;
            const blob = new Blob([svg.toString()]);
            const element = document.createElement("a");
            element.download = `${filename}.svg`;
            element.href = window.URL.createObjectURL(blob);
            element.click();
            element.remove();

            toast(`Downloading ${filename}.svg`,
                {
                    duration: 1500,
                    icon: '👏',
                    // style: {
                    //   borderRadius: '10px',
                    //   background: '#333',
                    //   color: '#fff',
                    // },
                });
        },
        [],
    );


    const [config, setConfig] = useState({ ...defaults });

    const updateConfig = useCallback(
        (key, val) => {
            setConfig(c => {
                return {
                    ...c, [key]: val
                };
            });

        },
        [setConfig],
    );
    const [contrast, setContrast] = useState("");

    const getContrast = useCallback(
        (val1, val2) => {
            // function from https://stackoverflow.com/a/5624139/3695983
            function hexToRgb(hex) {
                var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                    return r + r + g + g + b + b;
                });

                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
            }

            // function from https://stackoverflow.com/a/9733420/3695983                     
            function luminance(r, g, b) {
                var a = [r, g, b].map(function (v) {
                    v /= 255;
                    return v <= 0.03928
                        ? v / 12.92
                        : Math.pow((v + 0.055) / 1.055, 2.4);
                });
                return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
            }

            function calculateRatio() {

                // read the colors and transform them into rgb format
                const color1 = val1;
                const color2 = val2;
                const color1rgb = hexToRgb(color1);
                const color2rgb = hexToRgb(color2);

                // calculate the relative luminance
                const color1luminance = luminance(color1rgb.r, color1rgb.g, color1rgb.b);
                const color2luminance = luminance(color2rgb.r, color2rgb.g, color2rgb.b);

                // calculate the color contrast ratio
                const ratio = color1luminance > color2luminance
                    ? ((color2luminance + 0.05) / (color1luminance + 0.05))
                    : ((color1luminance + 0.05) / (color2luminance + 0.05));

                return ratio;
            }
            let calculatedContrastRatio = (1 - calculateRatio(val1, val2))?.toFixed(2);
            setContrast(calculatedContrastRatio);
            return calculatedContrastRatio;
        },
        [],
    );

    useEffect(() => {
        var color1 = config.color;
        var color2 = config.bg;
        getContrast(color1, color2);

    }, [config]);
    const getContrastModifier = useCallback(
        (contrast) => {
            if (contrast > 0.45 && contrast <= 0.7) {
                return "contrast--ok";
            }
            if (contrast <= 0.45) {
                return "contrast--bad";
            }
            if (contrast > 0.7) {
                return "contrast--good";
            }
        },
        [],
    );

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

    const canDownload = filename?.length > 0 && val?.length > 0;
    const canCopy = val?.length > 0;
    useEffect(() => {
        document.querySelector(".validize")?.focus();
    }, []);

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
                <div className='colorpickers'>
                    <ColorPickerRow
                        // label="Bakgrunnsfarge"
                        color={config?.bg} setState={updateConfig} stateKey="bg" />
                    <ColorPickerRow
                        // label="Bakgrunnsfarge"
                        color={config?.color} setState={updateConfig} stateKey="color" />
                    <pre className='contrast-row'>
                        Contrast: <span className={`contrast ${getContrastModifier(contrast)}`}>{contrast}</span>
                    </pre>
                </div>
                <div className='qr'>
                    <QRCode
                        size={300}
                        value={val}
                        bgColor={config.bg}
                        fgColor={config.color}
                    // size?: number; // defaults to 128
                    // bgColor?: string; // defaults to '#FFFFFF'
                    // fgColor?: string; // defaults to '#000000'
                    // level?: string; // defaults to 'L' , Can be one of 'L,M,H,Q'
                    />
                </div>
                <fieldset>
                    {/* <legend>QR-kode</legend> */}
                    <label>
                        <input placeholder="QR-code value" className="validize" type="text" name="qr-value" id="" onChange={e => setVal(e.target.value)} defaultValue={val} required />
                    </label>
                    <label className="filename">
                        <div className='input-wrapper'><input className="validize" placeholder="Filename" type="text" name="qr-filename" id="" onChange={e => setFilename(e.target.value)} defaultValue={filename} required /></div>
                    </label>
                    <div className='ui-row'>
                        <div className={`dl ${(canCopy) ? "" : "dl--disabled"}`} onClick={() => {

                            if (!canCopy) {
                                document.querySelector(`[name="qr-value"]`)?.focus();
                            }
                        }}>
                            <CopyToClipboard
                                text={document.querySelector(".qr")?.innerHTML}
                                onCopy={() => {
                                    toast("SVG has been copied",
                                        {
                                            duration: 1500,
                                            icon: '👏',
                                        });
                                }}
                            >
                                <motion.button whileTap={{ scale: 0.9 }}>Copy SVG <IoMdCopy size="1.25em" /></motion.button>
                            </CopyToClipboard>
                        </div>
                        <div className={`dl ${(canDownload) ? "" : "dl--disabled"}`} onClick={() => {
                            if (!canDownload) {
                                [...document.querySelectorAll("input.validize")]?.find(item => !item.value?.length > 0)?.focus();
                            }
                        }}>
                            <motion.button whileTap={{ scale: 0.9 }} onClick={() => {
                                downloadSVG(document.querySelector(".qr"), filename);
                            }}>Download SVG <IoDownloadOutline size="1.25em" />
                            </motion.button>
                        </div>
                    </div>
                </fieldset>
            </div>
        </>
    );
}

export default QR;