/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable, inject } from 'inversify';
import { MessageConnection } from 'vscode-jsonrpc';
import {  ILanguageClient } from '@theia/languages/lib/browser'
import { SemanticHighlightingService } from '@theia/editor/lib/browser/semantic-highlight/semantic-highlighting-service';
import { DiagramLanguageClientContribution } from 'sprotty-theia/lib'

@injectable()
export class YangLanguageClientContribution extends DiagramLanguageClientContribution {

    readonly id = 'yang'
    readonly name = 'Yang'

    @inject(SemanticHighlightingService) protected readonly semanticHighlightingService: SemanticHighlightingService;

    createLanguageClient(connection: MessageConnection): ILanguageClient {
        const client: ILanguageClient & Readonly<{ languageId: string }> = Object.assign(super.createLanguageClient(connection), { languageId: this.id });
        client.registerFeature(SemanticHighlightingService.createNewFeature(this.semanticHighlightingService, client));
        return client;
    }

    protected get globPatterns() {
        return [
            '**/*.yang'
        ]
    }

    protected get documentSelector(): string[] {
        return [
            this.id
        ]
    }
}
