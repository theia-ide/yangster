/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable, inject } from 'inversify';
import { MonacoEditor } from "@theia/monaco/lib/browser/monaco-editor";
import { MonacoEditorModel } from '@theia/monaco/lib/browser/monaco-editor-model';
import { MonacoEditorProvider } from "@theia/monaco/lib/browser/monaco-editor-provider";
import { MonacoEditorService } from "@theia/monaco/lib/browser/monaco-editor-service";
import { MonacoToProtocolConverter, ProtocolToMonacoConverter } from 'monaco-languageclient';
import { EditorPreferences } from "@theia/editor/lib/browser";
import { MonacoTextModelService } from "@theia/monaco/lib/browser/monaco-text-model-service";
import { MonacoContextMenuService } from "@theia/monaco/lib/browser/monaco-context-menu";
import { MonacoWorkspace } from "@theia/monaco/lib/browser/monaco-workspace";
import { MonacoCommandServiceFactory } from "@theia/monaco/lib/browser/monaco-command-service";
import { MonacoQuickOpenService } from '@theia/monaco/lib/browser/monaco-quick-open-service';
import { QuickOpenService } from '@theia/core/lib/browser/quick-open/quick-open-service';

@injectable()
export class YangMonacoEditorProvider extends MonacoEditorProvider {

    constructor(
        @inject(MonacoEditorService) protected readonly editorService: MonacoEditorService,
        @inject(MonacoTextModelService) protected readonly monacoModelResolver: MonacoTextModelService,
        @inject(MonacoContextMenuService) protected readonly contextMenuService: MonacoContextMenuService,
        @inject(MonacoToProtocolConverter) protected readonly m2p: MonacoToProtocolConverter,
        @inject(ProtocolToMonacoConverter) protected readonly p2m: ProtocolToMonacoConverter,
        @inject(MonacoWorkspace) protected readonly workspace: MonacoWorkspace,
        @inject(MonacoCommandServiceFactory) protected readonly commandServiceFactory: MonacoCommandServiceFactory,
        @inject(EditorPreferences) protected readonly editorPreferences: EditorPreferences,
        @inject(QuickOpenService) protected readonly quickOpenService: MonacoQuickOpenService
    ) {
        super(editorService, monacoModelResolver, contextMenuService, m2p, p2m, workspace, commandServiceFactory, editorPreferences, quickOpenService);
    }

    protected getEditorOptions(model: MonacoEditorModel): MonacoEditor.IOptions | undefined {
        const editorOptions = super.getEditorOptions(model);
        return {
            ...editorOptions,
            snippetSuggestions: 'inline'
        };
    }

}