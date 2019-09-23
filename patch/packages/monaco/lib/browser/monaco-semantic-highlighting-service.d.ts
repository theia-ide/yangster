/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
/// <reference types="@typefox/monaco-editor-core/monaco" />
import URI from '@theia/core/lib/common/uri';
import { ILogger } from '@theia/core/lib/common/logger';
import { EditorManager } from '@theia/editor/lib/browser/editor-manager';
import { Disposable } from '@theia/core/lib/common/disposable';
import { EditorDecoration, EditorDecorationOptions } from '@theia/editor/lib/browser/decorations';
import { SemanticHighlightingService, SemanticHighlightingRange } from '@theia/editor/lib/browser/semantic-highlight/semantic-highlighting-service';
import { MonacoEditor } from './monaco-editor';
import { MonacoEditorService } from './monaco-editor-service';
/**
 * A helper class for grouping information about a decoration type that has
 * been registered with the editor service.
 */
declare class DecorationTypeInfo {
    key: string;
    options: monaco.editor.IModelDecorationOptions;
}
export declare class MonacoSemanticHighlightingService extends SemanticHighlightingService {
    protected readonly logger: ILogger;
    protected readonly editorManager: EditorManager;
    protected readonly monacoEditorService: MonacoEditorService;
    protected readonly decorations: Map<string, Set<string>>;
    protected readonly toDisposeOnEditorClose: Map<string, Disposable>;
    protected readonly toDisposeOnUnregister: Map<string, Disposable>;
    protected readonly decorationTypes: Map<string, Map<number, DecorationTypeInfo>>;
    private lastDecorationTypeId;
    private nextDecorationTypeKey;
    protected registerDecorationTypesForLanguage(languageId: string): void;
    protected removeDecorationTypesForLanguage(languageId: string): void;
    protected refreshDecorationTypesForLanguage(languageId: string): void;
    register(languageId: string, scopes: string[][] | undefined): Disposable;
    protected unregister(languageId: string): void;
    protected toDecorationType(scopes: string[], reuseKey?: string): DecorationTypeInfo | undefined;
    decorate(languageId: string, uri: URI, ranges: SemanticHighlightingRange[]): Promise<void>;
    dispose(): void;
    protected decorationIds(uri: string | URI): Set<string>;
    protected editor(uri: string | URI): Promise<MonacoEditor | undefined>;
    protected model(uri: string | URI): Promise<monaco.editor.ITextModel | undefined>;
    /**
     * Returns all the semantic highlighting decoration IDs that are affected by any of the range arguments.
     */
    protected oldDecorations(uri: string, editor: MonacoEditor, ranges: SemanticHighlightingRange[]): string[];
    protected deleteDecorations(uri: string, editor: MonacoEditor): void;
    protected toDecoration(languageId: string, range: SemanticHighlightingRange): EditorDecoration;
    protected toOptions(languageId: string, scope: number | undefined): EditorDecorationOptions;
    protected themeService(): monaco.services.IStandaloneThemeService;
    protected tokenTheme(): monaco.services.TokenTheme;
}
export {};
//# sourceMappingURL=monaco-semantic-highlighting-service.d.ts.map