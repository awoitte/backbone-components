import html from 'rollup-plugin-html';

export default {
    input: './js/main.js',
    output:  {
        file: './js/bundle.js',
        format:'iife'
    },
    plugins: [
        html({
            include: '**/*.html'
        })
    ]
};
