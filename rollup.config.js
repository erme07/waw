import postcss from 'rollup-plugin-postcss';
import url from 'postcss-url';
import terser from '@rollup/plugin-terser';
import copy from "rollup-plugin-copy";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
    {
        input: 'src/js/waw.js',
        output: {
            file: 'dist/waw.js',
            format: 'esm',
        },
        plugins: [
            copy({
                targets: [
                    { src: "src/assets/icons/**/*.{svg,cur}", dest: "dist/assets/icons" },
                    { src: "src/assets/fonts/**/*.{woff,woff2,ttf,otf}", dest: "dist/assets/fonts" }
                ]
            }),
            postcss({
                extract: 'style.css', 
                minimize: false,
                plugins: [
                    url({
                        url: (asset) => {
                            const file = asset.url.split('/').pop();
                            if (asset.url.includes('/fonts/')) {
                                return `assets/fonts/${file}`;
                            }
                            if (asset.url.includes('/icons/')) {
                                return `assets/icons/${file}`;
                            }
                            return asset.url;
                        }
                    })
                ]
            }),
            resolve(),
            commonjs()
        ],
    },
    {
        input: 'src/js/waw.js',
        output: {
            file: 'dist/waw.min.js',
            format: 'esm',
        },
        plugins: [
            postcss({
                extract: 'style.min.css', 
                minimize: true,
                plugins: [
                    url({
                        url: (asset) => {
                            const file = asset.url.split('/').pop();
                            if (asset.url.includes('/fonts/')) {
                                return `assets/fonts/${file}`;
                            }
                            if (asset.url.includes('/icons/')) {
                                return `assets/icons/${file}`;
                            }
                            return asset.url;
                        }
                    })
                ]
            }),
            terser(),
            resolve(),
            commonjs()
        ],
    },
];