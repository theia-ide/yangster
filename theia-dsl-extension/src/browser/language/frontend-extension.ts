/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ContainerModule } from "inversify"
import { LanguageClientContribution } from "theia-core/lib/languages/browser"
import { YangLanguageClientContribution } from "./language-client-contribution"

export default new ContainerModule(bind => {
    monaco.languages.register({
        id: 'yang',
        aliases: ['Yang', 'yang'],
        extensions: ['.yang'],
        mimetypes: ['text/yang']
    })
    monaco.languages.setLanguageConfiguration('yang', {
        comments: {
            lineComment: "//",
            blockComment: ['/*', '*/']
        },
        brackets: [['{', '}']],
        autoClosingPairs: [
            {
                open: '{',
                close: '}'
            }]
    })
    monaco.languages.setMonarchTokensProvider('yang', <any>{
        // Set defaultToken to invalid to see what you do not tokenize yet
        // defaultToken: 'invalid',

        keywords: [
            'action', 'anydata', 'anyxml', 'argument', 'augment',
            'base', 'belongs-to', 'bit',
            'case', 'choice', 'config', 'contact', 'container',
            'default', 'description', 'deviate', 'deviation',
            'enum', 'error-app-tag', 'error-message', 'extension',
            'feature', 'fraction-digits',
            'grouping',
            'identity', 'if-feature', 'import', 'include', 'input',
            'key',
            'leaf', 'leaf-list', 'length', 'list',
            'mandatory', 'max-elements', 'min-elements', 'module', 'must',
            'namespace', 'notification',
            'ordered-by', 'organization', 'output',
            'path', 'pattern', 'prefix', 'presence',
            'range', 'reference', 'refine', 'require-instance', 'revision', 'revision-date', 'rpc',
            'status', 'submodule',
            'type', 'typedef',
            'units', 'unique', 'uses',
            'when',
            'yang-version', 'yin-element'
        ],

        // we include these common regular expressions
        symbols: /[=><!~?:&|+\-*\/\^%]+/,
        escapes: /\\(?:[nt\\"])/,

        // The main tokenizer for our languages
        tokenizer: {
            root: [
                // identifiers and keywords
                [/[a-z][\w\-]*/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@default': 'identifier'
                    }
                }],  // to show class names nicely

                // whitespace
                {include: '@whitespace'},

                // delimiters and operators
                [/[{}]/, '@brackets'],
                [/@symbols/, {
                    cases: {
                        '@default': ''
                    }
                }],

                // strings: recover on non-terminated strings
                [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
                [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
                [/"/, 'string', '@string."'],
                [/'/, 'string', '@string.\'']
            ],

            whitespace: [
                [/[ \t\r\n]+/, 'white'],
                [/\/\*/, 'comment', '@comment'],
                [/\/\/.*$/, 'comment'],
            ],

            comment: [
                [/[^\/*]+/, 'comment'],
                [/\/\*/, 'comment.invalid'],
                ["\\*/", 'comment', '@pop'],
                [/[\/*]/, 'comment']
            ],

            string: [
                [/[^\\"]+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/"/, 'string', '@pop']
            ],
        },
    })
    bind(LanguageClientContribution).to(YangLanguageClientContribution).inSingletonScope()
})